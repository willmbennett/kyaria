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
  const handleStartListening = () => {
    SpeechRecognition.startListening({ continuous: true })
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening()
    setInput(transcript)
  };

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <form
      onSubmit={async e => {
        resetTranscript()
        e.preventDefault()
        if (!input?.trim()) {
          return
        }
        setInput('')
        await onSubmit(input)
      }}
      ref={formRef}
    >
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
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
        <div className="flex items-center space-x-2 mt-2 mb-4">
          <span className="text-gray-600">Microphone: {listening ? 'On' : 'Off'}</span>

          <Button
            type="button"
            onClick={handleStartListening}
            variant="outline"
            size="sm"
            disabled={listening}
          >
            Start
          </Button>

          <Button
            type="button"
            onClick={handleStopListening}
            variant="outline"
            size="sm"
            disabled={!listening}
          >
            Stop
          </Button>

          <Button
            type="button"
            onClick={resetTranscript}
            variant="outline"
            size="sm"
          >
            Reset
          </Button>
        </div>

        <Textarea
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
        />

        <div className="absolute right-0 top-4 sm:right-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || input === ''}
              >
                <IconArrowElbow />
                <span className="sr-only">Send message</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  )
}