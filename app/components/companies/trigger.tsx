'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

const Trigger = ({ limit, length, roleFilter }: { limit: number, length:number, roleFilter:string}) => {
  const router = useRouter()

  //console.log('Setting up observer with limit:', limit, 'length', length, 'and roleFilter:', roleFilter);

  const TriggerRef = useCallback(
    (node: any) => {
      if (!node) return

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          //console.log('Observer triggered. Entry is intersecting:', entry.isIntersecting);
          if (entry.isIntersecting && limit == length) {
            //console.log('Limit equals length. Updating with new limit:', limit + 30);
            const url = `?roleFilter=${encodeURIComponent(roleFilter)}&limit=${limit + 30}`
            //console.log(url);
            router.push(url, { scroll: false })
            observer.disconnect()
          }
        })
      })

      observer.observe(node)
    },
    [limit, roleFilter]
  )

  return <div ref={TriggerRef} className='w-full border-b-2 border-neutral-100'></div>
}

export default Trigger