'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

const Trigger = ({ newLimit, length, newRoleFilter }: { newLimit: number, length:number, newRoleFilter:string}) => {
  const router = useRouter()

  //console.log('Setting up observer with limit:', newLimit, 'length', length, 'and roleFilter:', newRoleFilter);

  const TriggerRef = useCallback(
    (node: any) => {
      if (!node) return

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          //console.log('Observer triggered. Entry is intersecting:', entry.isIntersecting);
          if (entry.isIntersecting && newLimit == length) {
            //console.log('Limit equals length. Updating with new limit:', newLimit + 30);
            const url = `?roleFilter=${encodeURIComponent(newRoleFilter)}&limit=${newLimit + 30}`
            //console.log(url);
            router.push(url, { scroll: false })
            observer.disconnect()
          }
        })
      })

      observer.observe(node)
    },
    [newLimit, newRoleFilter]
  )

  return <div ref={TriggerRef} className='w-full border-b-2 border-neutral-100'></div>
}

export default Trigger