'use client'

import * as React from 'react'
import { Button, ButtonProps } from '../../ui/button'
import { cn } from '../../../../lib/utils'
import { IconArrowDown } from '../../ui/icons'

interface ButtonScrollToBottomProps extends ButtonProps {
  isAtBottom: boolean
  scrollToBottom: () => void
}

export function ButtonScrollToBottom({
  className,
  isAtBottom,
  scrollToBottom,
  ...props
}: ButtonScrollToBottomProps) {
  return (
    <Button
      variant="default"
      className={cn(
        'bg-white w-full transition-opacity duration-300 hover:bg-slate-100 py-2 h-full rounded-t-none shadow-b-none',
        isAtBottom ? 'opacity-0' : 'opacity-100',
        className
      )}
      onClick={() => scrollToBottom()}
      {...props}
    >
      <IconArrowDown />
      <span className="sr-only">Scroll to bottom</span>
    </Button>
  )
}