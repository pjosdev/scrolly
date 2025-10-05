//#region types/index.d.ts
type Album = {
  id: string;
  imageSrc: string;
  artist: string;
  trackname: string;
};
type ResponsiveValue<T> = T | Record<number, T>;
type ScrollFunction = (direction: 'left' | 'right') => void;
type ButtonRenderProp = (scrollFn: ScrollFunction) => React.ReactNode;
type Direction = "left" | "right";
//#endregion
//#region scrolly.d.ts
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
  ButtonLeft?: React.ComponentType<{
    onClick: () => void;
  }>;
  ButtonRight?: React.ComponentType<{
    onClick: () => void;
  }>;
}
declare function Scrolly({
  children,
  paddingX,
  paddingY,
  scrollPaddingInline,
  scrollMarginInline,
  scrollSnapAlign,
  scrollSnapType,
  overscrollBehaviourInline,
  overflowType,
  hideScrollBar,
  gap,
  containerStyles,
  ButtonLeft,
  ButtonRight,
  showControls
}: ScrollyProps): any;
//#endregion
//#region scrolly-controls.d.ts
interface ScrollyControlsProps {
  canGoLeft: boolean;
  canGoRight: boolean;
  onScrollLeft: () => void;
  onScrollRight: () => void;
  ButtonLeft?: React.ComponentType<{
    onClick: () => void;
  }>;
  ButtonRight?: React.ComponentType<{
    onClick: () => void;
  }>;
}
declare function ScrollyControls({
  canGoLeft,
  canGoRight,
  onScrollLeft,
  onScrollRight,
  ButtonLeft,
  ButtonRight
}: ScrollyControlsProps): any;
//#endregion
export { Album, ButtonRenderProp, Direction, ResponsiveValue, ScrollFunction, Scrolly, ScrollyControls };