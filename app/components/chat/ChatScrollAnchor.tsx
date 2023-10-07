'use client'

import * as React from 'react'
import { useInView } from 'react-intersection-observer'

import { useAtBottom } from '../../../lib/hooks/use-at-bottom'

interface ChatScrollAnchorProps {
  trackVisibility?: boolean
  divRef: any
}

export function ChatScrollAnchor({ trackVisibility, divRef }: ChatScrollAnchorProps) {
  
  const { ref, entry, inView } = useInView({
    trackVisibility,
    delay: 100,
    rootMargin: '0px 0px -150px 0px'
  })

  const isAtBottom = useAtBottom(divRef)

  React.useEffect(() => {
    //console.log('Effect triggered. isAtBottom:', isAtBottom, 'trackVisibility:', trackVisibility, 'inView:', inView);
    if (trackVisibility && !inView && divRef.current) {
      //console.log('Scrolling to the bottom.');
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [inView, entry, isAtBottom, trackVisibility])

  return <div ref={ref} className="h-px w-full" />
}