import { useCallback, type RefObject } from "react";

export function useScrollActions(scrollRef: RefObject<HTMLDivElement>) {
  const scrollBy = useCallback((direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const scrollAmount = scrollRef.current.clientWidth * 0.8;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }, [scrollRef]);

  return { scrollBy };
}