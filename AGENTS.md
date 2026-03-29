# Agent Instructions - DZ EXTREME Vue.js Project

## Project Overview

Vue 3 + TypeScript + Tailwind CSS v4 project for a skydiving/parachuting company (DZ EXTREME).
Uses Vite build tool, Vue Router, Pinia for state, and Vue 3 Composition API with `<script setup>`.

## Build & Quality Commands

```bash
npm run dev            # Start dev server
npm run build          # Build for production (runs type-check in parallel)
npm run preview        # Preview production build
npm run type-check     # TypeScript type checking (vue-tsc --build)
npm run lint           # Run all linters sequentially (oxlint then eslint, both with --fix)
npm run lint:oxlint    # Run oxlint only (with --fix)
npm run lint:eslint    # Run eslint only (with --fix --cache)
npm run format         # Format code with Prettier
```

**Verification workflow:** After making changes, run `npm run lint && npm run type-check` to verify correctness.

## Code Style

### Formatting (`.prettierrc.json`, `.editorconfig`)

- No semicolons (`semi: false`)
- Single quotes (`singleQuote: true`)
- 2-space indentation, max line length 100 chars
- UTF-8, LF line endings, trailing whitespace trimmed
- Files to lint: `**/*.{vue,ts,mts,tsx}`

### Vue SFC Structure

```vue
<script setup lang="ts">
// 1. Imports (Vue, libraries, components, types)
// 2. Props/Emits definitions
// 3. Composables and reactive state
// 4. Computed properties
// 5. Methods
// 6. Lifecycle hooks
</script>

<template>
  <!-- Template content -->
</template>

<style scoped>
/* Scoped styles only when needed */
</style>
```

Always use `<script setup lang="ts">`. The `vue/multi-word-component-names` rule is disabled.

### TypeScript

- Explicit types for props, emits, reactive variables
- `interface` for object types, `type` for unions/primitives
- `noUncheckedIndexedAccess` is enabled in tsconfig — handle potential undefined from array/object access
- Named imports from Vue (`import { ref } from 'vue'`), never default imports

### Imports — Order & Aliases

1. Vue core
2. Third-party libraries
3. Project components (`@/components/...`)
4. Types, utils, composables, data

Use `@/` alias for `src/` (configured in `vite.config.ts`).

### Naming Conventions

| Item        | Convention                               | Example                          |
| ----------- | ---------------------------------------- | -------------------------------- |
| Components  | PascalCase                               | `Navbar.vue`, `BookingModal.vue` |
| Pages/Views | PascalCase + `Page` suffix               | `HomePage.vue`, `TandemPage.vue` |
| Composables | `use` prefix, camelCase                  | `useBookingModal.ts`             |
| Props       | camelCase in JS, kebab-case in templates | `isActive` → `:is-active`        |
| Constants   | SCREAMING_SNAKE_CASE                     | `MAX_JUMPS`                      |
| CSS classes | kebab-case + Tailwind utilities          | `btn-primary`                    |

### Styling

- Tailwind CSS utility classes for all styling; avoid `@apply` unless truly necessary
- Custom animations in component `<style scoped>` or `src/assets/main.css`
- Tailwind v4: CSS-first config via `@theme` in CSS, no `tailwind.config.js`
- Use `ref` for primitives, prefer `ref` over `reactive` for objects too

### Error Handling

- `try/catch` around all async operations
- Handle loading, error, and empty states in components
- TypeScript null checks for optional values

## Project Structure

```
src/
├── assets/main.css          # Global styles + Tailwind
├── components/              # Reusable UI components
│   ├── Navbar.vue, Hero.vue, Footer.vue
│   ├── BookingModal.vue, CertificateModal.vue
│   ├── AboutSection.vue, ContactsSection.vue
│   ├── ExperienceSection.vue, FormatsSection.vue
│   └── QuoteSection.vue
├── views/                   # Route-level pages
│   ├── HomePage.vue, TandemPage.vue, SoloPage.vue
│   ├── SportPage.vue, TrainingPage.vue
│   └── CertificatePage.vue
├── composables/             # Reusable composition functions
│   ├── useBookingModal.ts
│   └── useCertificateModal.ts
├── content/                 # Page/section content data
├── constants/index.ts       # App-wide constants
├── data/formats.ts          # Static data
├── router/index.ts          # Vue Router config
├── App.vue                  # Root component
└── main.ts                  # Entry point
```

## Routes

| Path           | Component       |
| -------------- | --------------- |
| `/`            | HomePage        |
| `/tandem`      | TandemPage      |
| `/solo`        | SoloPage        |
| `/sport`       | SportPage       |
| `/training`    | TrainingPage    |
| `/certificate` | CertificatePage |

## Key Dependencies

- **UI/Icons:** `lucide-vue-next` — import icons as `import { IconName } from 'lucide-vue-next'`
- **Animations:** `@vueuse/motion` for scroll/entrance animations
- **State:** `pinia` for global state management

## Adding New Features

**New page:** Create `src/views/XxxPage.vue`, add route in `src/router/index.ts`, include `Navbar` and `Footer`.

**New component:** Create in `src/components/`, use `<script setup lang="ts">`, import with `@/` alias.

**New dependency:** `npm install <pkg>` (prod) or `npm install -D <pkg>` (dev).

## Environment

- Node.js: `^20.19.0 || >=22.12.0`
- No test framework configured; verify changes with `npm run lint && npm run type-check`
- No Cursor rules (`.cursor/rules/`) or Copilot rules (`.github/copilot-instructions.md`) present
