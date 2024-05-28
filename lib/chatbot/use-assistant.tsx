import { Message, nanoid } from "ai";
import { AssistantStream } from "openai/lib/AssistantStream";
import { ChatCompletionSnapshot } from "openai/lib/ChatCompletionStream";
import { AssistantStreamEvent } from "openai/resources/beta/assistants";
import { Annotation, Text, TextDelta } from "openai/resources/beta/threads/messages";
import { RequiredActionFunctionToolCall } from "openai/resources/beta/threads/runs/runs";
import { ToolCall } from "openai/resources/beta/threads/runs/steps";
import { useEffect, useState } from "react";
import { updateChatAction } from "../../app/eve/_action";
import { getInterviewQuesions } from "../../app/eve/function-helper";

interface UseDIDApiProps {
    chatId: string;
    threadId: string;
    messages: Message[]
}

export const useAssistant = ({ chatId, threadId, messages }: UseDIDApiProps) => {
    const [chatMessages, setChatMessages] = useState(messages)
    const [textToSubmit, setTextToSubmit] = useState('')
    const [incomingMessage, setIncomingMessasge] = useState('')

    // Whenever messages update update the state
    useEffect(() => {
        setChatMessages(messages)
    }, [messages])

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
        updateChatAction(chatId, [
            { id: nanoid(), role: 'user', content: input, createdAt: new Date() },
        ], '/eve');
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
        //console.log('Made it to [functionCallHandler] with function:', call?.function?.name);

        if (call?.function?.name !== "startMockInterview") return;

        const args = JSON.parse(call.function.arguments);
        //console.log('Function arguments:', args);

        const questions = getInterviewQuesions(args.discipline, args.interviewType);

        return JSON.stringify(questions)
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
        updateChatAction(chatId, [
            { id: nanoid(), role: 'assistant', content: content.value, createdAt: new Date() },
        ], '/eve');
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
    };

    return { submitUserMessage, chatMessages, textToSubmit, setTextToSubmit }
}