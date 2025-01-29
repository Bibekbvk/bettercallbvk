# 📓 2025 Production & High-Velocity Engineering Journal

Continuous production development log for Better Call Bvk.

---

- [2025-01-07T11:25] feat(blog): implement related articles algorithm based on shared tags

- [2025-01-07T13:13] refactor(components): extract reusable Modal, Dialog, and Backdrop primitives

- [2025-01-07T14:17] perf(bundle): dynamic import Recharts library to reduce initial JS payload

- [2025-01-07T15:44] fix(checkout): disable purchase button while payment verification is pending

- [2025-01-07T17:21] fix(cart): prevent quantity decrement below minimum allowable count of 1

- [2025-01-07T19:11] feat(marketplace): support multi-currency display formatting (NPR and USD)

- [2025-01-08T10:05] perf(next): enable Turbopack compilation flags in development server

- [2025-01-08T11:34] feat(checkout): add automated PDF receipt generation and email dispatch

- [2025-01-08T12:40] feat(marketplace): add stock availability indicator and low-inventory warning

- [2025-01-08T13:56] fix(auth): sanitize login email input to remove leading and trailing spaces

- [2025-01-08T15:45] feat(cart): add animated badge counter on navbar shopping cart icon

- [2025-01-08T17:35] perf(dom): remove unused DOM nodes from hidden mobile navigation

- [2025-01-11T11:24] feat(checkout): add eSewa wallet direct payment verification handler

- [2025-01-11T12:52] test(checkout): add form input validation test suite for payment details

- [2025-01-11T13:32] refactor(utils): move currency, date, and string helpers to shared utils lib

- [2025-01-11T15:11] feat(ui): implement sound toggle micro-interaction on button click

- [2025-01-11T16:40] test(cart): add unit tests for discount percentage and subtotal math

- [2025-01-15T10:31] test(utils): add unit tests for currency formatter edge cases

- [2025-01-15T11:18] docs(deploy): document Firebase Hosting build and deploy checklist

- [2025-01-15T12:56] feat(auth): add GitHub and Google OAuth login provider buttons

- [2025-01-15T13:41] feat(blog): implement sticky table of contents with active heading spy

- [2025-01-15T14:17] feat(ui): implement responsive mobile drawer with backdrop blur

- [2025-01-15T15:44] feat(seo): add JSON-LD Product and BreadcrumbList structured data

- [2025-01-15T16:35] fix(cart): clear active cart items upon confirmed order completion

- [2025-01-15T17:47] feat(marketplace): add instant copy share link action with toast notification

- [2025-01-15T18:33] docs(architecture): document state management and checkout lifecycle

- [2025-01-15T20:09] feat(auth): add email confirmation redirect handler and session sync route

- [2025-01-15T21:23] feat(admin): add system health and Supabase database latency monitor

- [2025-01-17T11:19] feat(ui): add floating back-to-top button with scroll progress circle

- [2025-01-17T13:08] refactor(theme): streamline Tailwind color tokens and dark mode CSS variables

- [2025-01-17T14:41] feat(checkout): validate customer phone numbers for Nepal telecom operators

- [2025-01-17T15:33] feat(profile): add API key generator for developer API integrations

- [2025-01-17T16:59] feat(ui): integrate Aurora mesh gradient animated background

- [2025-01-17T18:21] feat(blog): scaffold engineering blog with category tags and reading time

- [2025-01-17T19:55] feat(cart): implement persistent shopping cart using browser localStorage

- [2025-01-20T11:20] refactor(hooks): create custom useDebounce hook for search input optimization

- [2025-01-20T12:04] fix(checkout): handle network timeout exception during payment webhook call

- [2025-01-20T13:21] feat(profile): display user purchased downloads and order history table

- [2025-01-20T14:00] perf(images): convert all PNG banners to WebP format for 70% size reduction

- [2025-01-21T11:06] feat(admin): add monthly sales breakdown bar chart and trend indicator

- [2025-01-21T12:59] feat(marketplace): add category filter chips for AI models, templates, and plugins

- [2025-01-21T14:47] feat(ui): add animated counter component for live stats section

- [2025-01-21T15:48] docs(setup): update local environment variables configuration guide

- [2025-01-21T16:33] feat(ui): add interactive hover tilt effect to marketplace product cards

- [2025-01-21T17:50] feat(seo): add canonical URL tag generator to eliminate duplicate content

- [2025-01-22T10:35] refactor(checkout): transition checkout workflow into typed state machine

- [2025-01-22T11:56] feat(marketplace): add related items recommendation carousel on product detail view

- [2025-01-22T12:45] refactor(types): centralize Product, Order, and CartItem TypeScript interfaces

- [2025-01-22T14:06] docs(api): document Supabase Row Level Security (RLS) policies

- [2025-01-22T16:00] fix(security): sanitize SVG uploads against embedded cross-site script payloads

- [2025-01-22T17:21] fix(admin): ensure numeric sorting order on product price column

- [2025-01-22T18:18] feat(admin): implement role-based access control (RBAC) guard on admin routes

- [2025-01-22T20:04] feat(admin): export transaction logs and order summary to CSV format

- [2025-01-22T20:47] feat(checkout): scaffold multi-step checkout wizard with progress indicators

- [2025-01-22T21:48] perf(db): add composite index on product (category, created_at) in Supabase

- [2025-01-25T10:00] perf(render): wrap expensive marketplace filter logic in React useMemo

- [2025-01-25T10:49] feat(seo): optimize title tags and meta descriptions for high CTR

- [2025-01-25T12:25] feat(checkout): implement downloadable asset token delivery on checkout success

- [2025-01-25T14:14] feat(ui): add accessible keyboard focus rings across all interactive elements

- [2025-01-25T15:15] feat(marketplace): implement customer reviews and 5-star rating breakdown

- [2025-01-28T10:11] feat(admin): add customer management table with search and pagination

- [2025-01-28T11:20] feat(ui): add magnetic cursor hover interaction for CTA buttons

- [2025-01-28T12:49] feat(admin): build executive dashboard with Recharts revenue metrics

- [2025-01-28T13:30] feat(marketplace): add price sorting and rating filter dropdowns

- [2025-01-28T14:52] perf(scroll): throttle Lenis smooth scroll event listener to 60fps

- [2025-01-28T16:24] feat(ui): add typewriter headline effect with configurable speed

- [2025-01-28T18:03] perf(fonts): add font-display swap to optimize Google Fonts rendering speed

- [2025-01-28T18:53] feat(seo): implement dynamic OpenGraph and Twitter card metadata generator

- [2025-01-28T20:36] feat(blog): add social sharing buttons for LinkedIn, Twitter, and WhatsApp

- [2025-01-29T11:25] fix(profile): provide fallback initial letter avatar when photo URL is empty

- [2025-01-29T12:57] fix(navbar): resolve backdrop-filter blur clipping on mobile Safari iOS

- [2025-01-29T14:19] fix(images): add blur-up placeholder while hero banner image loads

- [2025-01-29T15:02] fix(contact): reset form state and show confirmation toast on successful send

- [2025-01-29T16:35] feat(seo): configure robots.txt directives and Google verification tag

- [2025-01-29T17:20] chore(lint): enable strict TypeScript linting rules across all route handlers
