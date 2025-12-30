---
name: web-design
description: Guidelines and patterns for creating premium, highly responsive, and aesthetically pleasing web interfaces using HTML, semantic CSS, and modern design principles.
---

# Web Design Guidelines and Standards

Use this skill when designing or implementing web pages, templates, or components to ensure they feel premium, look professional, and offer an outstanding user experience.

## 1. Visual Excellence & Aesthetics
*   **Curated Color Palettes:**
    *   Avoid using raw CSS colors (`red`, `blue`, `green`). Use harmonious, customized hex or HSL palettes.
    *   Define core color themes: Primary, Secondary, Background, Surface, Text, and Accent colors.
    *   Example HSL setup:
        ```css
        :root {
          --primary: hsl(250, 84%, 54%);
          --primary-hover: hsl(250, 84%, 48%);
          --background: hsl(220, 15%, 8%);
          --surface: hsl(220, 15%, 13%);
          --text: hsl(0, 0%, 96%);
          --text-muted: hsl(220, 10%, 70%);
          --accent: hsl(340, 82%, 52%);
        }
        ```
*   **Typography:**
    *   Do not use default browser serif fonts. Choose modern, elegant fonts (e.g., from Google Fonts like Inter, Outfit, or Roboto).
    *   Maintain strict hierarchy: clear scale from `h1` down to `h6`, keeping body text highly legible (16px/1rem minimum).
    *   Optimize line heights (`line-height: 1.5` or `1.6` for copy, `1.2` for headings) and letter spacing.
*   **Glassmorphism & Shadows:**
    *   Use subtle borders (`1px solid rgba(255, 255, 255, 0.08)`) with semi-transparent backdrops (`backdrop-filter: blur(12px)`) for a premium frosted-glass appearance.
    *   Implement soft, layered box shadows instead of harsh, dark ones:
        ```css
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        ```

## 2. Layout & Responsiveness
*   **Semantic HTML:** Always use descriptive elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
*   **Flexbox and CSS Grid:** Use flex and grid layouts for robust positioning. Avoid fixed widths and absolute position offsets unless absolutely necessary.
*   **Mobile-First Approach:** Implement responsive styling using `@media` queries focusing on standard breakpoints:
    *   Mobile: `< 640px`
    *   Tablet: `640px` to `1024px`
    *   Desktop: `> 1024px`
*   **Spacing Consistency:** Use a strict sizing scale (e.g., multiples of `4px` or `8px`, or relative units like `rem` and `em`) to maintain uniform margin and padding.

## 3. High-Quality Components & Layouts
*   Include card structures, navigation bars with active states, sidebars, interactive forms, grids, and modal windows.
*   Ensure all components are interactive with smooth hover and focus states.
