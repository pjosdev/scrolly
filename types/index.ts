export type Album = {
  id: string;
  imageSrc: string;
  artist: string;
  trackname: string;
};

export type ResponsiveValue<T> = T | Record<number, T>;
export type ScrollFunction = (direction: 'left' | 'right') => void;
export type ButtonRenderProp = (scrollFn: ScrollFunction) => React.ReactNode;
export type Direction = "left" | "right";