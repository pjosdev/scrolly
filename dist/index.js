//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = __toESM(react_jsx_runtime);
let react = require("react");
react = __toESM(react);

//#region scrolly.module.css
var scrolly_module_default = {};

//#endregion
//#region scrolly-controls.module.css
var scrolly_controls_module_default = {};

//#endregion
//#region scrolly-controls.tsx
function ScrollyControls({ canGoLeft, canGoRight, onScrollLeft, onScrollRight, ButtonLeft, ButtonRight }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: scrolly_controls_module_default.wrapper,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: `${scrolly_controls_module_default.btnWrapper} ${scrolly_controls_module_default.btnWrapperLeft} ${canGoLeft ? scrolly_controls_module_default.btnWrapperVisible : null}`,
			children: ButtonLeft ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ButtonLeft, { onClick: () => {
				console.log("Custom button left clicked, calling onScrollLeft");
				onScrollLeft();
			} }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
				onClick: onScrollLeft,
				className: scrolly_controls_module_default.button,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "2",
					strokeLinecap: "round",
					strokeLinejoin: "round",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "m15 18-6-6 6-6" })
				})
			})
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: `${scrolly_controls_module_default.btnWrapper} ${scrolly_controls_module_default.btnWrapperRight} ${canGoRight ? scrolly_controls_module_default.btnWrapperVisible : null}`,
			children: ButtonRight ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ButtonRight, { onClick: onScrollRight }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
				className: scrolly_controls_module_default.button,
				onClick: onScrollRight,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "2",
					strokeLinecap: "round",
					strokeLinejoin: "round",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "m9 18 6-6-6-6" })
				})
			})
		})]
	});
}

//#endregion
//#region hooks/useScrollState.ts
function useScrollState(scrollRef) {
	const [canGoLeft, setCanGoLeft] = (0, react.useState)(false);
	const [canGoRight, setCanGoRight] = (0, react.useState)(false);
	(0, react.useEffect)(() => {
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
	return { scrollBy: (0, react.useCallback)((direction) => {
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
	return (0, react.useMemo)(() => generateContainerCSS(componentId, responsiveValues, containerStyles), [
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
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("style", { children: css }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: componentId,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
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
		}), showControls && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ScrollyControls, {
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
exports.Scrolly = Scrolly;
exports.ScrollyControls = ScrollyControls;