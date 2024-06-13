import { checkSubscription } from "../../../../../lib/hooks/check-subscription";
import { getJobApp } from "../../../../../lib/app-db";
import { cache } from "react";
import { JobAppPageProps, extractAppObjects, getJobAppInterface, stripObojects } from "../../../app-helper";
import { handleChatCreation } from "../../../../eve/_action";
import { updateJobAppAction } from "../../../_action";
import { getChat } from "../../../../../lib/chat-db";
import { Message } from "ai";
import { VideoChatContainer } from "../../../../components/chatbot/VideoChatContainer";

const loadJob = cache((id: string) => {
  return getJobApp(id)
})

export default async function JobAppPage({ params }: JobAppPageProps) {
  const { userId, activeSubscription, admin } = await checkSubscription(true)
  const { app } = await loadJob(params.id) as getJobAppInterface
  const { resume, job, jobId, jobAppId, chatId } = extractAppObjects(app)
  const { userResumeStripped, jobStripped } = stripObojects(resume, job)

  let currentChatId: string

  if (chatId) {
    currentChatId = chatId
  } else {
    const { chatId } = await handleChatCreation({ userId, jobStripped })
    if (chatId) {
      const stateUpdate = { chatId }
      await updateJobAppAction(jobAppId, stateUpdate, '/apps/' + jobAppId)
      currentChatId = chatId
    } else {
      const error = 'There was a problem creating a new chat'
      throw new Error(error)
    }
  }


  const { chat } = await getChat(currentChatId)

  if (!chat) {
    return <p>We're sorry we had an issue waking Eve up.</p>
  }
  //console.log('At Eve, chat ', chat)

  const messages: Message[] = chat.messages

  //console.log('At Eve, messages ', messages)

  return (
    <VideoChatContainer
      userId={userId}
      chatId={chat._id.toString()}
      threadId={chat.threadId}
      messages={messages}
      activeSubscription={activeSubscription}
      admin={admin}
      jobId={jobId}
    />
  );
}