# Agent Instructions - DZ EXTREME Vue.js Project

## Project Overview
This is a Vue 3 + TypeScript + Tailwind CSS project for a skydiving/parachuting company website (DZ EXTREME). The project uses Vite as the build tool, Vue Router for navigation, and follows Vue 3 Composition API patterns.

## Build Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production (includes type-check)
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run all linters (oxlint + eslint)
npm run lint:oxlint  # Run oxlint only
npm run lint:eslint  # Run eslint only
npm run format       # Format code with Prettier
npm run type-check   # Run TypeScript type checking
```

## Code Style Guidelines

### Vue SFC (Single File Components)
- Use `<script setup lang="ts">` with TypeScript for all components
- Components should be multi-word names (e.g., `Navbar.vue` not `Nav.vue`)
- Use `defineProps` and `defineEmits` for prop/emit type declarations
- Import components using `@/` path alias (configured in vite.config.ts)

### TypeScript Conventions
- Use explicit types for props, emits, and reactive variables
- Prefer `interface` for object types, `type` for unions/primitives
- Use Vue's built-in types from `vue` package when appropriate

### Component Structure
```vue
<script setup lang="ts">
// 1. Imports (Vue, libraries, types)
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
/* Scoped component styles */
</style>
```

### Naming Conventions
- **Components**: PascalCase (e.g., `Navbar.vue`, `FooterSection.vue`)
- **Pages/Views**: PascalCase ending with `Page` (e.g., `HomePage.vue`, `TandemPage.vue`)
- **Props**: camelCase in JS, kebab-case in templates
- **Constants**: SCREAMING_SNAKE_CASE for truly constant values
- **Composables**: `use` prefix (e.g., `useAuth`, `useFetch`)
- **CSS classes**: kebab-case with Tailwind utilities

### Styling
- Use Tailwind CSS utility classes for all styling
- Use `@apply` sparingly - prefer direct Tailwind classes
- Custom animations should be defined in component `<style scoped>` or main CSS
- Use `ref` from Vue for reactive state, avoid `reactive` for primitives

### Imports
- Group imports: 1) Vue, 2) Libraries, 3) Components, 4) Types/Utils
- Use path aliases: `@/` for `/src`
- Avoid default imports from Vue (use named imports)

### Error Handling
- Use try/catch with async operations
- Handle edge cases in components (loading, error, empty states)
- Use TypeScript null checks for optional values

### Tailwind CSS v4
- Uses CSS-first configuration (no tailwind.config.js by default)
- Theme customization via `@theme` in CSS
- Custom utilities with `@apply` in `@layer base`

## Project Structure
```
src/
├── assets/
│   └── main.css          # Global styles + Tailwind imports
├── components/
│   ├── Navbar.vue
│   ├── Hero.vue
│   ├── QuoteSection.vue
│   ├── FormatsSection.vue
│   ├── ExperienceSection.vue
│   └── Footer.vue
├── views/
│   ├── HomePage.vue      # Landing page
│   ├── TandemPage.vue    # Tandem jump details
│   ├── SoloPage.vue      # Solo jump details
│   └── SportPage.vue     # Sport jump details
├── router/
│   └── index.ts          # Vue Router configuration
├── data/
│   └── formats.ts        # Static data/constants
├── App.vue               # Root component with router-view
└── main.ts              # App entry point
```

## Routes
| Path | Component | Description |
|------|-----------|-------------|
| `/` | HomePage | Landing page |
| `/tandem` | TandemPage | Tandem jump info |
| `/solo` | SoloPage | Solo jump info |
| `/sport` | SportPage | Sport jump info |

## Common Tasks

### Adding a New Page
1. Create page in `src/views/` (e.g., `NewPage.vue`)
2. Add route in `src/router/index.ts`
3. Use `<script setup lang="ts">` with TypeScript
4. Include Navbar and Footer components
5. Add link in FormatsSection or Navbar

### Adding a New Component
1. Create component in `src/components/`
2. Use `<script setup lang="ts">` with TypeScript
3. Import in parent component or page
4. Add scoped styles if needed

### Adding New Dependencies
```bash
npm install <package>      # Production dependency
npm install -D <package>   # Dev dependency
```

### Adding Icons
Use lucide-vue-next:
```typescript
import { IconName } from 'lucide-vue-next'
```

## File Patterns
- Pages/Views: `src/views/*Page.vue`
- Components: `src/components/*.vue`
- Composables: `src/composables/*.ts`
- Types: `src/types/*.ts` or inline in files
- Styles: `src/assets/*.css`
- Router: `src/router/index.ts`
