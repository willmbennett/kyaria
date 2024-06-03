import { useCallback, useEffect, useRef, useState } from 'react';

export const useScrollAnchor = () => {
  const messagesRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const visibilityRef = useRef<HTMLDivElement>(null);

  const [isAtBottom, setIsAtBottom] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const scrollToBottom = useCallback(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, []);

  const scrollToMessage = useCallback((messageId: string) => {
    if (messagesRef.current) {
      const messageElement = document.getElementById(messageId);
      if (messageElement) {
        messagesRef.current.scrollTo({
          top: messageElement.offsetTop,
          behavior: 'smooth',
        });
      }
    }
  }, []);

  useEffect(() => {
    if (messagesRef.current) {
      if (isAtBottom && !isVisible) {
        messagesRef.current.scrollTo({
          top: messagesRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  }, [isAtBottom, isVisible]);

  useEffect(() => {
    const current = messagesRef.current;

    if (current) {
      const handleScroll = (event: Event) => {
        const target = event.target as HTMLDivElement;
        const offset = 25;
        const atBottom =
          target.scrollTop + target.clientHeight >= target.scrollHeight - offset;

        setIsAtBottom(atBottom);
      };

      current.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        current.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    if (visibilityRef.current && messagesRef.current) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setIsVisible(true);
            } else {
              setIsVisible(false);
            }
          });
        },
        {
          root: messagesRef.current,
          rootMargin: '0px',
        }
      );

      observer.observe(visibilityRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [visibilityRef, messagesRef]);

  return {
    messagesRef,
    scrollRef,
    visibilityRef,
    scrollToBottom,
    scrollToMessage,  // Add this line
    isAtBottom,
    isVisible,
  };
};
