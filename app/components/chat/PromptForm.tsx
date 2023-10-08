import { UseChatHelpers } from 'ai/react'
import * as React from 'react'
import Textarea from 'react-textarea-autosize'

import { Button, buttonVariants } from '../ui/button'
import { IconArrowElbow, IconPlus } from '../ui/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '../ui/tooltip'
import { useEnterSubmit } from '../../../lib/hooks/use-enter-submit'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '../../../lib/utils'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { ChatMessage } from '../board/ChatMessage'


export interface PromptProps
  extends Pick<UseChatHelpers, 'input' | 'setInput'> {
  onSubmit: (value: string) => Promise<void>
  isLoading: boolean
}

export function PromptForm({
  onSubmit,
  input,
  setInput,
  isLoading
}: PromptProps) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const router = useRouter()
  const path = usePathname()

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  const listenToggle = () => {
    if (!listening) {
      SpeechRecognition.startListening({ continuous: true })
    }
  };

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const componentRef = React.useRef<HTMLDivElement | null>(null);

  // Detect click outside of the component
  React.useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (componentRef.current && !componentRef.current.contains(event.target) && listening) {
        SpeechRecognition.stopListening();
      }
    }
    resetTranscript()
    // Add the click event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Remove event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [listening]);

  return (<div ref={componentRef}>
    <div className="relative inline-block text-left w-full">
    {transcript != '' && (
        <div className="absolute right-0 z-10 p-2 w-full bottom-full origin-bottom-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className={`p-3 rounded-xl border-2 bg-slate-200 text-right`}>
                <ChatMessage message={{ id: "1231231", role: "user", content: transcript }} />
            </div>
        </div>
    )}
</div>

    <form
      onSubmit={async e => {
        e.preventDefault();

        console.log('Made it to submit');
        console.log(transcript);

        // Stop listening.
        SpeechRecognition.stopListening();

        // Use transcript directly instead of relying on an updated input state.
        const trimmedTranscript = transcript.trim();
        if (!trimmedTranscript) {
          return;
        }

        // Reset the transcript and input.
        resetTranscript();
        setInput('');

        await onSubmit(trimmedTranscript);
      }}
      ref={formRef}
    >
      <div className="flex flex-col items-center space-x-2 mt-2 mb-4" >
        <span className={listening ? `text-red-400` : `text-gray-600`}>{listening ? 'Recording' : 'Click to record'}</span>
        <Button
          type={listening ? "submit" : "button"}
          onClick={listening ? undefined : listenToggle}
          variant="outline"
          size="sm"
          className={`w-20 h-20 rounded-full border ${listening ? 'bg-red-100 border-red-300 text-white shadow-lg' : 'bg-white border-transparent text-black'}`}
        >
          <svg
            fill="#000000"
            width="50px"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-51.2 -51.2 614.40 614.40"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            enableBackground="new 0 0 512 512"><g
              id="SVGRepo_bgCarrier" strokeWidth="0">
            </g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round">
            </g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <g>
                  <path d="m439.5,236c0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4c0,70-64,126.9-142.7,126.9-78.7,0-142.7-56.9-142.7-126.9 0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4c0,86.2 71.5,157.4 163.1,166.7v57.5h-23.6c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h88c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4h-23.6v-57.5c91.6-9.3 163.1-80.5 163.1-166.7z"></path> <path d="m256,323.5c51,0 92.3-41.3 92.3-92.3v-127.9c0-51-41.3-92.3-92.3-92.3s-92.3,41.3-92.3,92.3v127.9c0,51 41.3,92.3 92.3,92.3zm-52.3-220.2c0-28.8 23.5-52.3 52.3-52.3s52.3,23.5 52.3,52.3v127.9c0,28.8-23.5,52.3-52.3,52.3s-52.3-23.5-52.3-52.3v-127.9z">
                  </path>
                </g>
              </g>
            </g>
          </svg>
        </Button>
      </div>
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:px-12">
        {false && (<Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={e => {
                e.preventDefault()
                router.refresh()
                router.push(path)
              }}
              className={cn(
                buttonVariants({ size: 'sm', variant: 'outline' }),
                'absolute left-0 top-4 h-8 w-8 rounded-full bg-background p-0 sm:left-4'
              )}
            >
              <IconPlus />
              <span className="sr-only">New Chat</span>
            </button>
          </TooltipTrigger>
          <TooltipContent>New Chat</TooltipContent>
        </Tooltip>
        )}
        {/*<Textarea
          style={{ outline: 'none' }}
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          rows={1}
          value={transcript}
          onChange={e => setInput(e.target.value)}
          placeholder="Send a message."
          spellCheck={false}
          className="min-h-[60px] mb-2 w-full border-none resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
              />*/}

        <div className="absolute right-0 top-4 sm:right-4">
          <Tooltip>
            <TooltipTrigger asChild>
              {/*<Button
                type="submit"
                size="icon"
                disabled={isLoading || input === ''}
              >
                <IconArrowElbow />
                <span className="sr-only">Send message</span>
              </Button>*/}
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  </div>)
}