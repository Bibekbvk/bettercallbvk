---
name: web-animation
description: Guidelines and code examples for creating performance-optimized, fluid, and modern CSS and JS animations/transitions for web interfaces.
---

# Web UI Animation Guidelines and Standards

Use this skill when designing or implementing animations, transitions, and micro-interactions. Dynamic and fluid motion enhances user engagement, but it must be high-performance, non-intrusive, and accessible.

## 1. Performance-First Animations

- **Animate Composite Properties Only:** Only animate properties that do not trigger paint or layout reflows:
  - `transform` (for translation, scaling, and rotation)
  - `opacity` (for fading)
- **Avoid Animating Layout Properties:** Avoid animating `width`, `height`, `margin`, `padding`, `top`, `left`, `bottom`, `right`, or `font-size`. Use `transform: scale()` or translation instead.
- **Will-Change:** Use the `will-change` CSS property sparingly and only on elements that will undergo heavy animation, to prompt browser optimizations without overloading memory:
  ```css
  .animating-element {
    will-change: transform, opacity;
  }
  ```

## 2. Natural Timing & Curves (Easing)

- **Avoid Linear Motion:** Linear motion feels mechanical and unnatural. Use easing curves that mirror real-world physics.
- **Standard Easing Values:**
  - **Ease-Out (Deceleration - entering elements):** Quick start, slow finish.
    ```css
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    ```
  - **Ease-In (Acceleration - exiting elements):** Slow start, quick finish.
    ```css
    transition: transform 0.25s cubic-bezier(0.55, 0.085, 0.68, 0.53);
    ```
  - **Ease-In-Out (Standard transition/cycles):**
    ```css
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    ```
- **Choreography:** Stagger animations of lists or grids by adding custom delays to successive child elements (`transition-delay`).

## 3. Accessibility & Reduced Motion

- **Respect User Preferences:** Always respect the user's operating system preferences regarding reduced motion. Implement media queries to disable or simplify complex animations:
  ```css
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-delay: 0s !important;
      animation-duration: 0s !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0s !important;
      scroll-behavior: auto !important;
    }
  }
  ```

## 4. Common Animation Patterns

- **Fade-In Up (Page/Card Entry):**
  ```css
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .card-fade-in {
    animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  ```
- **Pulse/Hover Scales (Micro-interactions):**
  ```css
  .btn-hover-grow {
    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .btn-hover-grow:hover {
    transform: scale(1.05);
  }
  .btn-hover-grow:active {
    transform: scale(0.98);
  }
  ```
