import * as React from 'react'

export function useAtBottom(ref: any, offset = 0) {
  const [isAtBottom, setIsAtBottom] = React.useState(false)

  React.useEffect(() => {
    if (!ref.current) return; // Ensure the ref is valid

    const handleScroll = () => {
      const scrollHeight = ref.current.scrollHeight;
      const scrollPosition = ref.current.scrollTop + ref.current.offsetHeight;

      setIsAtBottom(scrollPosition >= scrollHeight - offset);
    }

    const currentElement = ref.current;

    // Attach the event listener to the div
    currentElement.addEventListener('scroll', handleScroll, { passive: true });

    handleScroll(); // Check the initial position

    return () => {
      // Remove the event listener from the div
      if (currentElement) {
        currentElement.removeEventListener('scroll', handleScroll);
      }
    }
  }, [ref, offset]);

  return isAtBottom;
}

