import { useId, useRef } from "react";
import styles from "@/components/scrolly/scrolly.module.css";
import type { ResponsiveValue } from "@/components/scrolly/types";
import ScrollyControls from "@/components/scrolly/scrolly-controls";
import { useScrollState } from "@/components/scrolly/hooks/useScrollState";
import { useScrollActions } from "@/components/scrolly/hooks/useScrollAction";
import { useScrollyCSS } from "@/components/scrolly/hooks/useScrollyCss";

interface ScrollyProps extends React.PropsWithChildren {
  paddingX?: ResponsiveValue<string>;
  paddingY?: ResponsiveValue<string>;
  scrollPaddingInline?: ResponsiveValue<string>;
  scrollMarginInline?: ResponsiveValue<string>;
  scrollSnapAlign?: "start" | "end" | "center" | "none";
  scrollSnapType?: "x mandatory" | "x proximity" | "none";
  overscrollBehaviourInline?: "auto" | "contain" | "none";
  overflowType?: "scroll" | "auto";
  gap?: ResponsiveValue<string>;
  hideScrollBar?: boolean;
  containerStyles?: React.CSSProperties;
  showControls?: boolean;
  ButtonLeft?: React.ComponentType<{ onClick: () => void }>;
  ButtonRight?: React.ComponentType<{ onClick: () => void }>;
}

export default function Scrolly({
  children,
  paddingX = "0",
  paddingY = "0",
  scrollPaddingInline = "1rem",
  scrollMarginInline = "0",
  scrollSnapAlign = "none",
  scrollSnapType = "none",
  overscrollBehaviourInline = "contain",
  overflowType = "auto",
  hideScrollBar = true,
  gap = "0px",
  containerStyles = {},
  ButtonLeft,
  ButtonRight,
  showControls = true,
}: ScrollyProps) {
  const scrollWrapperRef = useRef<HTMLDivElement>(
    null,
  ) as React.RefObject<HTMLDivElement>;
  const componentId = useId().replace(/:/g, ""); // Clean ID for CSS
  const { canGoLeft, canGoRight } = useScrollState(scrollWrapperRef);
  const { scrollBy } = useScrollActions(scrollWrapperRef);

  const responsiveValues = {
    "padding-x": paddingX,
    "padding-y": paddingY,
    "scroll-padding-inline": scrollPaddingInline,
    "scroll-margin-inline": scrollMarginInline,
    gap: gap,
  };

  const css = useScrollyCSS(componentId, responsiveValues, containerStyles);

  const hideScrollbarStyles = {
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    WebkitScrollbar: {
      display: "none",
    },
  } as React.CSSProperties;

  return (
    <>
      <style>{css}</style>
      <div className={componentId}>
        <div
          className={styles["scroll-wrapper"]}
          ref={scrollWrapperRef}
          style={
            {
              "--scroll-snap-type": scrollSnapType,
              "--overscroll-behavior-inline": overscrollBehaviourInline,
              "--scroll-snap-align": scrollSnapAlign,
              "--overscroll-type": overflowType,
              ...(hideScrollBar && hideScrollbarStyles),
              ...(typeof scrollMarginInline === "string" && {
                "--scroll-margin-inline": scrollMarginInline,
              }),
              ...(typeof scrollPaddingInline === "string" && {
                "--scroll-padding-inline": scrollPaddingInline,
              }),
              ...(typeof paddingX === "string" && {
                "--padding-x": paddingX,
              }),
              ...(typeof paddingY === "string" && {
                "--padding-y": paddingY,
              }),
              ...(typeof gap === "string" && {
                "--gap": gap,
              }),
            } as React.CSSProperties & Record<string, unknown>
          }
        >
          {children}
        </div>
        {showControls && (
          <ScrollyControls
            canGoLeft={canGoLeft}
            canGoRight={canGoRight}
            onScrollLeft={() => scrollBy("left")}
            onScrollRight={() => scrollBy("right")}
            ButtonLeft={ButtonLeft}
            ButtonRight={ButtonRight}
          />
        )}
      </div>
    </>
  );
}
