'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

const Trigger = ({ limit }: { limit: number }) => {
  const router = useRouter()

  const TriggerRef = useCallback(
    (node: any) => {
      if (!node) return

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            router.push(`/jobs?limit=${limit + 10}`, { scroll: false })
            observer.disconnect()
          }
        })
      })

      observer.observe(node)
    },
    [limit]
  )

  return <div ref={TriggerRef} className='w-full border-b-2 border-neutral-100'></div>
}

export default Trigger