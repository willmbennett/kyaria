import { Message, nanoid } from "ai";
import { AssistantStream } from "openai/lib/AssistantStream";
import { AssistantStreamEvent } from "openai/resources/beta/assistants";
import { Text } from "openai/resources/beta/threads/messages";
import { RequiredActionFunctionToolCall } from "openai/resources/beta/threads/runs/runs";
import { ToolCall } from "openai/resources/beta/threads/runs/steps";
import { useEffect, useRef, useState } from "react";
import { updateChatAction } from "../../app/eve/_action";
import { getInterviewQuestions, parseInterviewArgs } from "../../app/eve/function-helper";
import { addMockInterviewMessageAction, createMockInterviewAction } from "../../app/mockinterviews/recordings/[id]/_action";
import { usePathname } from "next/navigation";
import { format } from "date-fns";

interface UseAssistantProps {
    userId: string;
    chatId: string;
    threadId: string;
    messages: Message[];
    initialMessage: string;
    handleGenerateQuestions?: () => Promise<{
        questions: string[];
    } | undefined>;
    jobTitle?: string
}

export const useAssistant = ({ userId, chatId, threadId, messages, initialMessage, handleGenerateQuestions, jobTitle }: UseAssistantProps) => {
    const path = usePathname()
    const [chatMessages, setChatMessages] = useState(messages)
    const [textToSubmit, setTextToSubmit] = useState('')
    const [interviewing, setInterviewing] = useState(false)
    const [interviewName, setInterviewName] = useState('')
    const [creatingInterviewQuestions, setCreatingInterviewQuestions] = useState(false)
    const [mockInterviewId, setMockInterviewId] = useState('')
    const [sentInitialMessage, setSentInitialMessage] = useState(messages.length > 0);
    const initialRender = useRef(true);

    // Send the initial message
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        if (!sentInitialMessage && initialMessage) {
            setSentInitialMessage(true);
            sendMessage(initialMessage);
        }
    }, [initialMessage, sentInitialMessage]);

    // Whenever messages update update the state
    useEffect(() => {
        setChatMessages(messages)
    }, [messages])

    useEffect(() => {
        if (mockInterviewId && textToSubmit) {
            const newMessage: Message = { id: nanoid(), role: 'assistant', content: textToSubmit, createdAt: new Date() }
            addMockInterviewMessageAction(mockInterviewId, newMessage, path);
        }
    }, [textToSubmit, mockInterviewId]);

    const sendMessage = async (text: string) => {
        const response = await fetch(
            `/api/openai/assistant/messages`,
            {
                method: "POST",
                body: JSON.stringify({
                    content: text,
                    threadId
                }),
            }
        );
        if (response.body) {
            const stream = AssistantStream.fromReadableStream(response.body);
            handleReadableStream(stream);
        }
    };

    const submitActionResult = async (runId: string, toolCallOutputs: any) => {
        const response = await fetch(
            `/api/openai/assistant/actions`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    runId: runId,
                    toolCallOutputs: toolCallOutputs,
                    threadId
                }),
            }
        );
        if (response.body) {
            const stream = AssistantStream.fromReadableStream(response.body);
            handleReadableStream(stream);
        }
    };

    const submitUserMessage = async (input: string) => {
        sendMessage(input);
        appendMessage("user", input)
    };

    /* Stream Event Handlers */

    // imageFileDone - show image in chat
    const handleImageFileDone = (image: any) => {
        appendToLastMessage(`\n![${image.file_id}](/api/files/${image.file_id})\n`);
    }

    // toolCallCreated - log new tool call
    const toolCallCreated = (toolCall: ToolCall) => {
        if (toolCall.type != "code_interpreter") return;
        appendMessage("code", "");
    };

    // toolCallDelta - log delta and snapshot for the tool call
    const toolCallDelta = (delta: any, snapshot: ToolCall) => {
        if (delta.type != "code_interpreter") return;
        if (!delta.code_interpreter.input) return;
        appendToLastMessage(delta.code_interpreter.input);
    };

    const functionCallHandler = async (call: RequiredActionFunctionToolCall) => {
        const functionName = call?.function?.name
        const args = JSON.parse(call.function.arguments);

        //Don't call any other functions than the ones created
        if (!["startMockInterview", "endMockInterview"].includes(functionName)) return;

        switch (functionName) {
            case 'startMockInterview':

                let questions: string[] = []
                let interviewName = '';

                if (handleGenerateQuestions) {
                    setCreatingInterviewQuestions(true);
                    const res = await handleGenerateQuestions();
                    setCreatingInterviewQuestions(false);

                    if (res?.questions) {
                        questions = res.questions
                    }
                } else {
                    questions = getInterviewQuestions(args.discipline, args.interviewType).map(q => q.question);
                }
                if (jobTitle) {
                    interviewName = jobTitle;
                    const date = new Date();
                    setInterviewName(`${jobTitle} - ${format(date, 'LLLL d, yyyy')}`);
                } else {
                    interviewName = parseInterviewArgs(args.discipline, args.interviewType);
                    setInterviewName(interviewName);
                }
                const newMockInterviewData = { chatId, userId, name: interviewName, questions };
                const newMockInterviewId = await createMockInterviewAction({ data: newMockInterviewData, path });

                if (newMockInterviewId) {
                    setMockInterviewId(newMockInterviewId);
                    setInterviewing(true);
                }

                return JSON.stringify(questions);
            case 'endMockInterview':
                setInterviewing(false)
                setInterviewName('')
                return JSON.stringify({})
            default:
                return
        }
    };


    // handleRequiresAction - handle function call
    const handleRequiresAction = async (
        event: AssistantStreamEvent.ThreadRunRequiresAction
    ) => {
        //console.log('Made it to [handleRequiresAction] with event.data: ', event.data)
        const runId = event.data.id;
        if (event.data.required_action) {
            const toolCalls = event.data.required_action.submit_tool_outputs.tool_calls;
            // loop over tool calls and call function handler
            const toolCallOutputs = await Promise.all(
                toolCalls.map(async (toolCall) => {
                    const result = await functionCallHandler(toolCall);
                    return { output: result, tool_call_id: toolCall.id };
                })
            );
            //console.log('About to submit result with [toolCallOutputs]', toolCallOutputs)
            submitActionResult(runId, toolCallOutputs);
        }
    };

    // handleRunCompleted - re-enable the input form
    const handleRunCompleted = () => {
        //console.log('Run is completed!')
    };

    // Text completed
    const handleTextComplete = (content: Text, snapshot: any) => {
        //console.log('Text finished', content)
        appendMessage("assistant", content.value);
        setTextToSubmit(content.value)
    };

    const handleReadableStream = (stream: AssistantStream) => {

        // image
        stream.on("imageFileDone", handleImageFileDone);

        // code interpreter
        stream.on("toolCallCreated", toolCallCreated);
        stream.on("toolCallDelta", toolCallDelta);

        stream.on("textDone", handleTextComplete)

        // events without helpers yet (e.g. requires_action and run.done)
        stream.on("event", (event) => {
            if (event.event != 'thread.message.delta') //console.log('event: ', event.event)
                if (event.event === "thread.run.requires_action") {
                    //console.log('Made it to requires action')
                    handleRequiresAction(event);
                }
            if (event.event === "thread.run.completed") handleRunCompleted();
        });
    };

    /*
      =======================
      === Utility Helpers ===
      =======================
    */

    const appendToLastMessage = (text: string) => {
        setChatMessages((prevMessages) => {
            const lastMessage = prevMessages[prevMessages.length - 1];
            const updatedLastMessage: Message = {
                ...lastMessage,
                content: lastMessage.content + text,
            };
            return [...prevMessages.slice(0, -1), updatedLastMessage];
        });
    };

    const appendMessage = (role: any, text: string) => {
        setChatMessages((prevMessages) => [...prevMessages, { id: nanoid(), role, content: text }]);
        const newMessage: Message = { id: nanoid(), role, content: text, createdAt: new Date() }
        updateChatAction(chatId, newMessage, path);
    };

    return { interviewing, interviewName, submitUserMessage, chatMessages, textToSubmit, setTextToSubmit, mockInterviewId, creatingInterviewQuestions }
}