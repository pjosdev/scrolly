# Scrolly

A flexible, responsive horizontal scroll component for React with built-in navigation controls and container queries.

## Features

- 🎯 Snap scrolling with configurable alignment
- 📱 Responsive padding, gaps, and scroll behavior via container queries
- ⌨️ Built-in keyboard navigation
- 🎨 Customizable navigation buttons
- 🔧 Flexible API with sensible defaults
- 🪶 Lightweight with zero dependencies (除了 React)

## Installation

```bash
npm install @yourusername/scrolly
```

## Basic Usage

```tsx
import { Scrolly } from "@yourusername/scrolly";

function App() {
  return (
    <Scrolly gap="1rem" paddingX="2rem">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </Scrolly>
  );
}
```

## Props

### Layout & Spacing

| Prop       | Type                      | Default | Description        |
| ---------- | ------------------------- | ------- | ------------------ |
| `paddingX` | `ResponsiveValue<string>` | `"0"`   | Horizontal padding |
| `paddingY` | `ResponsiveValue<string>` | `"0"`   | Vertical padding   |
| `gap`      | `ResponsiveValue<string>` | `"0px"` | Gap between items  |

### Scroll Behavior

| Prop                        | Type                                       | Default     | Description                     |
| --------------------------- | ------------------------------------------ | ----------- | ------------------------------- |
| `scrollSnapType`            | `"x mandatory" \| "x proximity" \| "none"` | `"none"`    | Snap scrolling behavior         |
| `scrollSnapAlign`           | `"start" \| "end" \| "center" \| "none"`   | `"none"`    | Child snap alignment            |
| `scrollPaddingInline`       | `ResponsiveValue<string>`                  | `"1rem"`    | Padding for snap positions      |
| `scrollMarginInline`        | `ResponsiveValue<string>`                  | `"0"`       | Margin for child snap positions |
| `overscrollBehaviourInline` | `"auto" \| "contain" \| "none"`            | `"contain"` | Overscroll behavior             |
| `overflowType`              | `"scroll" \| "auto"`                       | `"auto"`    | Overflow behavior               |

### Controls & Styling

| Prop              | Type                                         | Default | Description                 |
| ----------------- | -------------------------------------------- | ------- | --------------------------- |
| `showControls`    | `boolean`                                    | `true`  | Show navigation buttons     |
| `hideScrollBar`   | `boolean`                                    | `true`  | Hide scrollbar              |
| `ButtonLeft`      | `React.ComponentType<{onClick: () => void}>` | -       | Custom left button          |
| `ButtonRight`     | `React.ComponentType<{onClick: () => void}>` | -       | Custom right button         |
| `containerStyles` | `React.CSSProperties`                        | `{}`    | Additional container styles |

## Responsive Values

Use responsive values for breakpoint-based styling:

```tsx
<Scrolly
  paddingX={{
    0: "1rem",
    768: "2rem",
    1024: "4rem",
  }}
  gap={{
    0: "0.5rem",
    640: "1rem",
    1024: "2rem",
  }}
>
  {/* children */}
</Scrolly>
```

## Examples

### Snap Scrolling Gallery

```tsx
<Scrolly
  scrollSnapType="x mandatory"
  scrollSnapAlign="center"
  gap="1rem"
  paddingX="2rem"
>
  {images.map((img) => (
    <img key={img.id} src={img.src} alt={img.alt} />
  ))}
</Scrolly>
```

### Custom Navigation Buttons

```tsx
import { ChevronLeft, ChevronRight } from "lucide-react";

function CustomButton({ onClick, direction }) {
  return (
    <button onClick={onClick} className="my-custom-btn">
      {direction === "left" ? <ChevronLeft /> : <ChevronRight />}
    </button>
  );
}

<Scrolly
  ButtonLeft={(props) => <CustomButton {...props} direction="left" />}
  ButtonRight={(props) => <CustomButton {...props} direction="right" />}
>
  {/* children */}
</Scrolly>;
```

### Responsive Product Carousel

```tsx
<Scrolly
  scrollSnapType="x proximity"
  scrollSnapAlign="start"
  gap={{
    0: "1rem",
    768: "1.5rem",
    1024: "2rem",
  }}
  paddingX={{
    0: "1rem",
    768: "2rem",
    1280: "4rem",
  }}
  scrollPaddingInline="1rem"
>
  {products.map((product) => (
    <ProductCard key={product.id} {...product} />
  ))}
</Scrolly>
```

## TypeScript

Fully typed with TypeScript. The `ResponsiveValue` type allows you to pass either a single value or an object with breakpoint keys:

```typescript
type ResponsiveValue<T> = T | Record<number, T>;
```

## Styling

The component uses CSS modules internally but exposes CSS custom properties for easy customization. Navigation buttons can be fully customized via the `ButtonLeft` and `ButtonRight` props.

## Browser Support

Works in all modern browsers that support:

- CSS Container Queries
- CSS Scroll Snap
- Flexbox

## License

MIT

## Contributing

Contributions welcome! Please open an issue or PR on [GitHub](https://github.com/pjosdev/scrolly).
