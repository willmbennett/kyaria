// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatMessage.tsx

import { Message } from 'ai'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { cn } from '../../../lib/utils'
import { CodeBlock } from './codeblock'
import { MemoizedReactMarkdown } from '../apps/markdown'

export interface ChatMessageProps {
  message: Message,
  jobKeyWords?: string[]
}

export function ChatMessage({ message, jobKeyWords, ...props }: ChatMessageProps) {
  function highlightKeywords(content: string, keywords: string[]): string {
    if (content) {
      keywords.forEach((keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi'); // Match the keyword as a whole word
        content = content.replace(regex, (match) => `**${match}**`);
      });
      return content;
    } else {
      return content;
    }
  }

  let highlightedContent = message.content
  if (jobKeyWords) {
    if (jobKeyWords.length != 1 && jobKeyWords[0] != '') {
      highlightedContent = highlightKeywords(message.content, jobKeyWords)
    }
  }

  return (
    <div
      className={cn('w-full')}
      {...props}
    >
      <div className={`flex w-full text-left justify-center`}>
        <MemoizedReactMarkdown
          className="prose break-words prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>
            },
            code({ node, inline, className, children, ...props }) {
              if (children.length) {
                if (children[0] == '▍') {
                  return (
                    <span className="mt-1 cursor-default animate-pulse">▍</span>
                  )
                }

                children[0] = (children[0] as string).replace('`▍`', '▍')
              }

              const match = /language-(\w+)/.exec(className || '')

              if (inline) {
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }

              return (
                <CodeBlock
                  key={Math.random()}
                  language={(match && match[1]) || ''}
                  value={String(children).replace(/\n$/, '')}
                  {...props}
                />
              )
            }
          }}
        >
          {highlightedContent}
        </MemoizedReactMarkdown>
      </div>
    </div>
  )
}