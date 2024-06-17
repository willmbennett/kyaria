import { Message } from "ai"
import { cache } from "react"
import { getJobApp } from "../../../lib/app-db"
import { getChat } from "../../../lib/chat-db"
import { checkSubscription } from "../../../lib/hooks/check-subscription"
import { createInterviewQuestions } from "../../apps/[id]/(pages)/mockinterview/_action"
import { extractAppObjects, updateJobAppAction } from "../../apps/_action"
import { getJobAppInterface, stripObojects } from "../../apps/app-helper"
import { VideoChatContainer } from "../../components/chatbot/VideoChatContainer"
import { handleChatCreation } from "../../eve/_action"


const loadJob = cache((id: string) => {
  return getJobApp(id)
})

export interface MockInterviewPageProps {
  params: { id: string }
  searchParams: { type: string }
}

export default async function JobAppPage({ params, searchParams }: MockInterviewPageProps) {
  const { userId, activeSubscription, userName } = await checkSubscription(true)
  const { app } = await loadJob(params.id) as getJobAppInterface
  const { resume, job, jobAppId, chatId } = await extractAppObjects(app)
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

  const initialMessage = `Hi! I'm ${userName}. Please welcome me, introduce yourself, and kick off this ${searchParams.type ? searchParams.type : 'behavioral'} mock interview for this job position: ${jobStripped.jobTitle} at ${jobStripped.company}}`

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