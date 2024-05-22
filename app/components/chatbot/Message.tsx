'use client'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import headshot from '/public/images/eve-headshot.png'
import Image from 'next/image'
import { IconOpenAI, IconUser } from '../ui/icons'
import { cn } from '../../../lib/utils'
import { MemoizedReactMarkdown } from '../apps/markdown'
import { CodeBlock } from '../chat/codeblock'

// Different types of message bubbles.

export function UserMessage({ children }: { children: React.ReactNode }) {
    return (
        <div className="group relative flex items-start">
            <div className="flex size-[25px] shrink-0 select-none items-center justify-center rounded-md border bg-background shadow-sm">
                <IconUser />
            </div>
            <div className="ml-4 flex-1 space-y-2 overflow-hidden pl-2">
                {children}
            </div>
        </div>
    )
}

export function BotMessage({
    content,
    className
}: {
    content: string
    className?: string
}) {
    const text = content

    return (
        <div className={cn('group relative flex items-start', className)}>
            <div className="flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm">
                <Image
                    src={headshot}
                    alt="Picture of the author"
                    className='object-cover rounded-full'
                // width={500} automatically provided
                // height={500} automatically provided
                // blurDataURL="data:..." automatically provided
                // placeholder="blur" // Optional blur-up while loading
                />
            </div>
            <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
                <MemoizedReactMarkdown
                    className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
                    remarkPlugins={[remarkGfm, remarkMath]}
                    components={{
                        p({ children }) {
                            return <p className="mb-2 last:mb-0">{children}</p>
                        },
                        code({ node, inline, className, children, ...props }) {
                            if (children.length) {
                                if (children[0] == '▍') {
                                    return (
                                        <span className="mt-1 animate-pulse cursor-default">▍</span>
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
                    {text}
                </MemoizedReactMarkdown>
            </div>
        </div>
    )
}

export function BotCard({
    children,
    showAvatar = true
}: {
    children: React.ReactNode
    showAvatar?: boolean
}) {
    return (
        <div className="group relative flex items-start md:-ml-12">
            <div
                className={cn(
                    'flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm',
                    !showAvatar && 'invisible'
                )}
            >
                <IconOpenAI />
            </div>
            <div className="ml-4 flex-1 pl-2">{children}</div>
        </div>
    )
}