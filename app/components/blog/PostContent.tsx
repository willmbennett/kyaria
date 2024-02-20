// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatMessage.tsx
import { AnchorHTMLAttributes, DetailedHTMLProps, ImgHTMLAttributes } from 'react';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { CodeBlock } from '../chat/codeblock';

type MarkdownComponentProps = {
    children?: React.ReactNode;
};

type ImageProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

type LinkProps = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;


export function PostContent({ content }: { content: string }) {

    const P = ({ children }: MarkdownComponentProps) => <p className="mb-4 text-base md:text-lg">{children}</p>;
    const Li = ({ children }: MarkdownComponentProps) => <li className="ml-4">{children}</li>;
    const Ul = ({ children }: MarkdownComponentProps) => <ul className="list-inside list-disc pl-4">{children}</ul>;
    const Ol = ({ children }: MarkdownComponentProps) => <ol className="list-decimal list-inside pl-4">{children}</ol>;
    const H1 = ({ children }: MarkdownComponentProps) => <h1 className="text-3xl md:text-4xl font-bold mb-4">{children}</h1>;
    const H2 = ({ children }: MarkdownComponentProps) => <h2 className="text-2xl md:text-3xl font-semibold mb-3">{children}</h2>;
    const H3 = ({ children }: MarkdownComponentProps) => <h3 className="text-xl md:text-2xl font-semibold mb-3">{children}</h3>;
    const H4 = ({ children }: MarkdownComponentProps) => <h4 className="text-lg md:text-xl font-medium mb-2">{children}</h4>;
    const Blockquote = ({ children }: MarkdownComponentProps) => <blockquote className="pl-4 border-l-4 border-gray-300 italic">{children}</blockquote>;
    const Img = ({ alt, src }: ImageProps) => <img className="max-w-full h-auto my-4" alt={alt} src={src} />;
    const A = ({ href, children }: LinkProps) => <a className="underline" href={href}>{children}</a>;
    const Hr = () => <hr className="my-4 border-gray-300" />;



    return (
        <div className="flex-1 px-1 ml-4 space-y-2 overflow-hidden">
            <Markdown
                children={content}
                remarkPlugins={[remarkGfm, remarkMath]}
                components={{
                    p: P,
                    li: Li,
                    ul: Ul,
                    ol: Ol,
                    h1: H1,
                    h2: H2,
                    h3: H3,
                    h4: H4,
                    blockquote: Blockquote,
                    img: Img,
                    a: A,
                    hr: Hr,
                    code({ node, inline, className, children, ...props }) {

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
            />
        </div>
    )
}