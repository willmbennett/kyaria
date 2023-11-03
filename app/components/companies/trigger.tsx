'use client'

import { useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const Trigger = ({ length, newLimit, newFilter }: { length: number, newLimit: number, newFilter: string }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const TriggerRef = useCallback(
    (node: any) => {
      if (!node) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          //console.log('Observer triggered. Entry is intersecting:', entry.isIntersecting);
          if (entry.isIntersecting && newLimit === length) {
            const setNewLimit = newLimit + 30;

            //console.log('newLimit', newLimit)
            //console.log('length', length)
            //console.log('setNewLimit', setNewLimit)
            //console.log('newFilter', newFilter)

            // Assuming searchParams is an instance of URLSearchParams
            const params = new URLSearchParams(searchParams);

            // Update the 'limit' parameter, assuming limit is a number and doesn't need encoding
            params.set('limit', setNewLimit.toString());
            params.set('roleFilter', newFilter);

            // Create the search string
            const paramString = `?${params.toString()}`;
            //console.log('New search string:', paramString); // This should give you the correct updated search string.
            observer.disconnect();
            router.push(paramString, { scroll: false });
          }
        });
      });

      observer.observe(node);
    },
    // Include all variables that are used inside the callback and can change over time.
    [length, newLimit, newFilter]
  );

  return <div ref={TriggerRef} className='w-full border-b-2 border-neutral-100'></div>
}

export default Trigger