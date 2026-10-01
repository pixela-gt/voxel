---
"@pixela/voxel-ui": minor
"@pixela/voxel-ui-nuxt": minor
---

Add 15 new Tier-2 components from the Astryx gap analysis (Batch A + Batch B):

**Batch A — Simple/wrapper components:**
- **AvatarGroup** — stacked/overlapping avatars with `max` prop and `+N` overflow badge; reuses Avatar, SR-readable overflow count
- **Kbd** — styled keyboard key element with `size` variants and monospace font; for shortcuts and key combos
- **Center** — flex wrapper that centers children; `as` prop for element tag, `inline` mode
- **StatusDot** — small colored status indicator (`online`/`away`/`busy`/`offline`); optional `pulse` animation and SR label via VisuallyHidden
- **Timestamp** — relative time ("2 min ago") or absolute time display using `Intl.RelativeTimeFormat`; SSR-safe, handles invalid dates gracefully
- **Token** — inline chip/token with `default`/`selected`/`error` variants; optional icon and remove button
- **FieldStatus** — validation state indicator (`error`/`warning`/`success`/`info`) with icon + message; composes with FormField
- **InputGroup** — input wrapper with leading/trailing adornment slots; shared border with focus-within highlight
- **RadioList** — vertical radio list with label + description per item; composes reka-ui RadioGroup primitives
- **Stack** — generic flex stack with `orientation` prop (`horizontal`/`vertical`); responsive object syntax for gap/align/justify
- **FormGrid** — two-column CSS Grid for form rows (label + control); configurable `labelWidth`/`gap`, collapses on small screens

**Batch B — Composite/interactive components:**
- **SegmentedControl** — segmented button group for exclusive selection; wraps reka-ui ToggleGroup with sliding pill indicator; arrow-key navigation
- **SelectableCard** — card with selection state; controlled (`modelValue`) and uncontrolled (`defaultSelected`); keyboard accessible; custom `selectedIcon` prop
- **Carousel** — horizontal scroll carousel with CSS scroll-snap; `slidesPerView` and `gap` props; optional arrows (hide at boundaries) and pagination dots
- **Lightbox** — full-screen image viewer on reka-ui Dialog; single image or gallery mode with prev/next; Escape to close; SSR-safe

**Refactors:**
- Extracted shared `resolveResponsive()` utility and `ResponsiveValue<T>` type into `utils/responsive.ts`; Grid, HStack, VStack now import from shared utility instead of duplicating logic
- Avatar status indicator now delegates to StatusDot component (removed duplicated status CSS)

**New tokens:**
- `--color-input-icon` — adornment icon color for InputGroup (defaults to `--color-text-secondary`)

**Bug fixes:**
- **Timestamp**: handle invalid dates gracefully — renders empty text and omits `datetime` attribute instead of crashing
- **PageHeader**: title now renders as `h1`

**Design details:**
- All components follow the 4-file convention (Component.vue, Component.types.ts, Component.stories.ts, index.ts)
- All components use design tokens; dark mode works via existing token system
- Token variant renamed from `destructive` to `error` for API consistency with Badge/FieldStatus
- Stack is independent of HStack/VStack — no breaking changes to existing layout components
- No new runtime dependencies — Carousel uses CSS scroll-snap
