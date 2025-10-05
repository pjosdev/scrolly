import { useEffect, useState, type RefObject } from "react";

export function useScrollState(scrollRef: RefObject<HTMLDivElement>) {
  const [canGoLeft, setCanGoLeft] = useState(false);
  const [canGoRight, setCanGoRight] = useState(false);

  useEffect(() => {
    if (!scrollRef.current) return;

    const wrapper = scrollRef.current;

    const updateScrollState = () => {
      const { scrollLeft, scrollWidth, clientWidth } = wrapper;
      const maxScroll = scrollWidth - clientWidth;

      setCanGoLeft(scrollLeft > 2);
      setCanGoRight(scrollLeft < maxScroll - 2);
    };

    updateScrollState();
    wrapper.addEventListener("scroll", updateScrollState);

    return () => wrapper.removeEventListener("scroll", updateScrollState);
  }, [scrollRef]);

  return { canGoLeft, canGoRight };
}
