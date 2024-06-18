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
import { setupMockInterview } from "../../../../mockinterviews/_action";
import { RestartButton } from "../../../../mockinterviews/components/RestartButton";

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
    "use server"
    const interviewdata = { userResume: userResumeStripped, jobPosition: jobStripped }
    return await setupMockInterview(userId, jobAppId, interviewdata)
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

  const initialMessage = {
    message: `Hi! I'm ${userName}. Please welcome me, introduce yourself, and kick off this mock interview for this job position: ${jobStripped.jobTitle} at ${jobStripped.company}`,
    functionCall: "startMockInterview"
  }

  const handleGenerateQuestions = async () => {
    "use server"
    return createInterviewQuestions(jobStripped, userResumeStripped)
  }

  const jobTitle = `${jobStripped.jobTitle} - ${jobStripped.company}`

  return (
    <div className="relative w-full h-3/4">
      <div className="flex w-full justify-end px-2 pb-4">
        <RestartButton createNewChat={createNewChat} />
      </div>
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
    </div>
  );
}