import { Message } from "ai"
import { cache } from "react"
import { getJobApp, getUserJobApps } from "../../../lib/app-db"
import { getChat } from "../../../lib/chat-db"
import { checkSubscription } from "../../../lib/hooks/check-subscription"
import { createInterviewQuestions } from "../../apps/[id]/(pages)/mockinterview/_action"
import { extractAppObjects, updateJobAppAction } from "../../apps/_action"
import { getJobAppInterface, stripObojects } from "../../apps/app-helper"
import { VideoChatContainer } from "../../components/chatbot/VideoChatContainer"
import { deleteChatAction, handleChatCreation } from "../../eve/_action"
import { redirect } from "next/navigation"
import { AppClass } from "../../../models/Exports"
import { JobClass } from "../../../models/Job"
import { ActionItemType } from "../../board/job-helper"
import { SideBarItem } from "../../helper"
import { SidebarWrapper } from "../../components/sidebar/SidebarWrapper"
import { createMockInterview, handleMockInterviewDeletion, loadApps, setupMockInterview } from "../_action"
import { getMockInterviewSidebarItems } from "../helper"
import { RestartButton } from "../components/RestartButton"
import { InterviewTypeSelection } from "../components/InterviewTypeSelection"


const loadJob = cache((id: string) => {
  return getJobApp(id)
})

export interface MockInterviewPageProps {
  params: { id: string }
}

export default async function JobAppPage({ params }: MockInterviewPageProps) {
  const { userId, activeSubscription, userName } = await checkSubscription(true)
  const { app } = await loadJob(params.id) as getJobAppInterface
  if (!app) redirect('/mockinterviews')
  const { resume, job, jobAppId, chatId } = await extractAppObjects(app)
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

  const initialMessage = {
    message: `Hi! I'm ${userName}. Please welcome me, introduce yourself, and kick off this mock interview for this job position: ${jobStripped.jobTitle} at ${jobStripped.company}`,
    functionCall: "startMockInterview"
  }

  const handleGenerateQuestions = async () => {
    "use server"
    return createInterviewQuestions(jobStripped, userResumeStripped)
  }

  const jobTitle = `${jobStripped.jobTitle} - ${jobStripped.company}`

  const filter = {
    userId
  }

  const { jobApps } = await loadApps(filter) as { jobApps: AppClass[] }

  const items = getMockInterviewSidebarItems(jobApps)


  const RightElements = <RestartButton createNewChat={createNewChat} />
  const LeftElements = <InterviewTypeSelection createNewChat={createNewChat} />

  return (
    <SidebarWrapper
      userId={userId}
      sideBarTitle={'Jobs'}
      items={items}
      createNew={createMockInterview}
      newTitle={'New Mock Interview'}
      deleteItemAction={handleMockInterviewDeletion}
      rightElements={RightElements}
      leftElements={LeftElements}
    >
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
    </SidebarWrapper>
  );
}