import { checkSubscription } from "../../../../../lib/hooks/check-subscription";
import { getJobApp } from "../../../../../lib/app-db";
import { cache } from "react";
import { JobAppPageProps, getJobAppInterface, stripObojects } from "../../../app-helper";
import { handleChatCreation } from "../../../../eve/_action";
import { extractAppObjects, updateJobAppAction } from "../../../_action";
import { getChat } from "../../../../../lib/chat-db";
import { Message } from "ai";
import { VideoChatContainer } from "../../../../components/chatbot/VideoChatContainer";
import { createInterviewQuestions } from "./_action";

const loadJob = cache((id: string) => {
  return getJobApp(id)
})

export default async function JobAppPage({ params }: JobAppPageProps) {
  const { userId, activeSubscription, userName } = await checkSubscription(true)
  const { app } = await loadJob(params.id) as getJobAppInterface
  const { resume, job, jobId, jobAppId, chatId } = await extractAppObjects(app)
  const { userResumeStripped, jobStripped } = stripObojects(resume, job)

  let currentChatId: string;
  let chat;

  const createNewChat = async () => {
    const interviewdata = { userResume: userResumeStripped, jobPosition: jobStripped }
    const { chatId } = await handleChatCreation({ userId, interviewdata });
    if (!chatId) {
      throw new Error('There was a problem creating a new chat');
    }
    const stateUpdate = { chatId };
    await updateJobAppAction(jobAppId, stateUpdate, '/apps/' + jobAppId);

    const { chat: newChat } = await getChat(chatId);
    if (!newChat) {
      throw new Error('There was a problem fetching the newly created chat');
    }

    return { chatId, chat: newChat };
  };

  if (chatId) {
    const { chat: currentChat } = await getChat(chatId);
    if (currentChat) {
      chat = currentChat;
      currentChatId = chatId;
    } else {
      const newChatData = await createNewChat();
      chat = newChatData.chat;
      currentChatId = newChatData.chatId;
    }
  } else {
    const newChatData = await createNewChat();
    chat = newChatData.chat;
    currentChatId = newChatData.chatId;
  }

  if (!chat) {
    return <p>We're sorry we had an issue waking Eve up.</p>;
  }

  const messages: Message[] = chat.messages

  //console.log('At Eve, messages ', messages)

  const initialMessage = `Hi! I'm ${userName}. Please welcome me, introduce yourself, and kick off this behavioral mock interview for this job position: ${jobStripped.jobTitle}}`

  const handleGenerateQuestions = async () => {
    "use server"
    return createInterviewQuestions(jobStripped, userResumeStripped)
  }

  const jobTitle = `${jobStripped.jobTitle} - ${jobStripped.company}`


  return (
    <VideoChatContainer
      userId={userId}
      chatId={chat._id.toString()}
      initialMessage={initialMessage}
      threadId={chat.threadId}
      messages={messages}
      activeSubscription={activeSubscription}
      handleGenerateQuestions={handleGenerateQuestions}
      jobTitle={jobTitle}
    />
  );
}