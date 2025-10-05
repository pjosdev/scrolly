import type { ResponsiveValue } from "@/components/scrolly/types";

export function generateContainerCSS(
  componentId: string,
  responsiveValues: Record<string, ResponsiveValue<string>>,
  containerStyles: React.CSSProperties = {}
) {
  const staticStyles = Object.entries(containerStyles)
    .map(([key, value]) => {
      // Convert camelCase to kebab-case
      const cssKey = key.replace(
        /[A-Z]/g,
        (letter) => `-${letter.toLowerCase()}`
      );
      return `${cssKey}: ${value};`;
    })
    .join("\n");

  let css = `
    .${componentId} {
      container-type: inline-size;
      container-name: ${componentId};
      width: 100%;
      position: relative;
      overflow: hidden;
      ${staticStyles}
    }
  `;

  // Get all unique breakpoints
  const breakpoints = new Set<number>();

  Object.values(responsiveValues).forEach((value) => {
    if (typeof value === "object") {
      Object.keys(value).forEach((bp) => breakpoints.add(Number(bp)));
    }
  });

  // Generate container queries for each breakpoint
  Array.from(breakpoints)
    .sort((a, b) => a - b)
    .forEach((bp) => {
      css += `
      @container ${componentId} (min-width: ${bp}px) {
        .${componentId} > div {
    `;

      Object.entries(responsiveValues).forEach(([prop, value]) => {
        if (typeof value === "object" && value[bp]) {
          css += `--${prop}: ${value[bp]};`;
        }
      });

      css += `}}`;
    });

  return css;
}
