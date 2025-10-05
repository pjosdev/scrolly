import { generateContainerCSS } from "../helpers/helpers";
import type { ResponsiveValue } from "../types/index";
import { useMemo } from "react";

export function useScrollyCSS(
  componentId: string,
  responsiveValues: Record<string, ResponsiveValue<string>>,
  containerStyles: React.CSSProperties,
) {
  const css = useMemo(
    () => generateContainerCSS(componentId, responsiveValues, containerStyles),
    [componentId, responsiveValues, containerStyles],
  );

  return css;
}
