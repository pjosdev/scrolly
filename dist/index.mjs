import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useState } from "react";

//#region scrolly.module.css
var scrolly_module_default = {};

//#endregion
//#region scrolly-controls.module.css
var scrolly_controls_module_default = {};

//#endregion
//#region scrolly-controls.tsx
function ScrollyControls({ canGoLeft, canGoRight, onScrollLeft, onScrollRight, ButtonLeft, ButtonRight }) {
	return /* @__PURE__ */ jsxs("div", {
		className: scrolly_controls_module_default.wrapper,
		children: [/* @__PURE__ */ jsx("div", {
			className: `${scrolly_controls_module_default.btnWrapper} ${scrolly_controls_module_default.btnWrapperLeft} ${canGoLeft ? scrolly_controls_module_default.btnWrapperVisible : null}`,
			children: ButtonLeft ? /* @__PURE__ */ jsx(ButtonLeft, { onClick: () => {
				console.log("Custom button left clicked, calling onScrollLeft");
				onScrollLeft();
			} }) : /* @__PURE__ */ jsx("button", {
				onClick: onScrollLeft,
				className: scrolly_controls_module_default.button,
				children: /* @__PURE__ */ jsx("svg", {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "2",
					strokeLinecap: "round",
					strokeLinejoin: "round",
					children: /* @__PURE__ */ jsx("path", { d: "m15 18-6-6 6-6" })
				})
			})
		}), /* @__PURE__ */ jsx("div", {
			className: `${scrolly_controls_module_default.btnWrapper} ${scrolly_controls_module_default.btnWrapperRight} ${canGoRight ? scrolly_controls_module_default.btnWrapperVisible : null}`,
			children: ButtonRight ? /* @__PURE__ */ jsx(ButtonRight, { onClick: onScrollRight }) : /* @__PURE__ */ jsx("button", {
				className: scrolly_controls_module_default.button,
				onClick: onScrollRight,
				children: /* @__PURE__ */ jsx("svg", {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "2",
					strokeLinecap: "round",
					strokeLinejoin: "round",
					children: /* @__PURE__ */ jsx("path", { d: "m9 18 6-6-6-6" })
				})
			})
		})]
	});
}

//#endregion
//#region hooks/useScrollState.ts
function useScrollState(scrollRef) {
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
	return {
		canGoLeft,
		canGoRight
	};
}

//#endregion
//#region hooks/useScrollAction.ts
function useScrollActions(scrollRef) {
	return { scrollBy: useCallback((direction) => {
		if (!scrollRef.current) return;
		const scrollAmount = scrollRef.current.clientWidth * .8;
		scrollRef.current.scrollBy({
			left: direction === "left" ? -scrollAmount : scrollAmount,
			behavior: "smooth"
		});
	}, [scrollRef]) };
}

//#endregion
//#region helpers/helpers.ts
function generateContainerCSS(componentId, responsiveValues, containerStyles = {}) {
	const staticStyles = Object.entries(containerStyles).map(([key, value]) => {
		return `${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}: ${value};`;
	}).join("\n");
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
	const breakpoints = /* @__PURE__ */ new Set();
	Object.values(responsiveValues).forEach((value) => {
		if (typeof value === "object") Object.keys(value).forEach((bp) => breakpoints.add(Number(bp)));
	});
	Array.from(breakpoints).sort((a, b) => a - b).forEach((bp) => {
		css += `
      @container ${componentId} (min-width: ${bp}px) {
        .${componentId} > div {
    `;
		Object.entries(responsiveValues).forEach(([prop, value]) => {
			if (typeof value === "object" && value[bp]) css += `--${prop}: ${value[bp]};`;
		});
		css += `}}`;
	});
	return css;
}

//#endregion
//#region hooks/useScrollyCss.ts
function useScrollyCSS(componentId, responsiveValues, containerStyles) {
	return useMemo(() => generateContainerCSS(componentId, responsiveValues, containerStyles), [
		componentId,
		responsiveValues,
		containerStyles
	]);
}

//#endregion
//#region scrolly.tsx
function Scrolly({ children, paddingX = "0", paddingY = "0", scrollPaddingInline = "1rem", scrollMarginInline = "0", scrollSnapAlign = "none", scrollSnapType = "none", overscrollBehaviourInline = "contain", overflowType = "auto", hideScrollBar = true, gap = "0px", containerStyles = {}, ButtonLeft, ButtonRight, showControls = true }) {
	const scrollWrapperRef = useRef(null);
	const componentId = useId().replace(/:/g, "");
	const { canGoLeft, canGoRight } = useScrollState(scrollWrapperRef);
	const { scrollBy } = useScrollActions(scrollWrapperRef);
	const css = useScrollyCSS(componentId, {
		"padding-x": paddingX,
		"padding-y": paddingY,
		"scroll-padding-inline": scrollPaddingInline,
		"scroll-margin-inline": scrollMarginInline,
		gap
	}, containerStyles);
	const hideScrollbarStyles = {
		scrollbarWidth: "none",
		msOverflowStyle: "none",
		WebkitScrollbar: { display: "none" }
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("style", { children: css }), /* @__PURE__ */ jsxs("div", {
		className: componentId,
		children: [/* @__PURE__ */ jsx("div", {
			className: scrolly_module_default["scroll-wrapper"],
			ref: scrollWrapperRef,
			style: {
				"--scroll-snap-type": scrollSnapType,
				"--overscroll-behavior-inline": overscrollBehaviourInline,
				"--scroll-snap-align": scrollSnapAlign,
				"--overscroll-type": overflowType,
				...hideScrollBar && hideScrollbarStyles,
				...typeof scrollMarginInline === "string" && { "--scroll-margin-inline": scrollMarginInline },
				...typeof scrollPaddingInline === "string" && { "--scroll-padding-inline": scrollPaddingInline },
				...typeof paddingX === "string" && { "--padding-x": paddingX },
				...typeof paddingY === "string" && { "--padding-y": paddingY },
				...typeof gap === "string" && { "--gap": gap }
			},
			children
		}), showControls && /* @__PURE__ */ jsx(ScrollyControls, {
			canGoLeft,
			canGoRight,
			onScrollLeft: () => scrollBy("left"),
			onScrollRight: () => scrollBy("right"),
			ButtonLeft,
			ButtonRight
		})]
	})] });
}

//#endregion
export { Scrolly, ScrollyControls };