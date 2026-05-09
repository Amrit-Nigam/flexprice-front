# FlexPrice frontend take-home — submission notes

This document walks through how I approached the assignment: exploring the codebase, structuring Storybook, and implementing the optional advanced tracks.

**Hosted Storybook:** [flexprice-front-two.vercel.app](https://flexprice-front-two.vercel.app)  
**Local:** `npm run storybook` (port 6006)

---

## 1. How I explored the codebase

- Skimmed **`src/components/`** atomic layout: `atoms/`, `molecules/`, `organisms/`, plus **`src/components/ui/`** (shadcn-style primitives).
- Read **`tailwind.config.js`**, **`components.json`**, and **`src/index.css`** so Storybook’s **`.storybook/preview.ts`** loads the same global styles as the app (tokens, fonts, variables).
- Picked components that map cleanly to the brief (buttons, chips, inputs, tables, dashboard-style cards, sidebar, empty states, tier tables) and that already existed or could be composed without copying upstream wholesale.

---

## 2. Storybook organisation

- All take-home stories use titles under **`Design System/`** (e.g. `Design System/Atoms/Button`, `Design System/Molecules/DataTable`) so the sidebar reads like a small design system.
- Stories are **co-located** next to components (`*.stories.tsx`), which matches common Flexprice / monorepo habits and keeps refactors in sync.

---

## 3. Component coverage (17 stories)

Stories map to the brief’s tiers as follows.

### Atoms

| Story | What it demonstrates |
|--------|----------------------|
| **Button** | Variants (primary/secondary/ghost/danger mapping), sizes, loading/disabled, `play` on click |
| **Input** | Text, number, error, currency-style prefix, `play` typing |
| **StatusChip** | Plan / subscription / invoice-style statuses; controls + variant grid |
| **SearchableSelect** | Searchable single select; variants + `play` for search/select |
| **Tooltip** | Delay and placement; interaction for focus |
| **Spinner** / **LoadingState** | Sizes and labelled loading UI |
| **DateRangePicker** | Controlled range, disabled/prefilled variants; calendar open `play` |

### Molecules

| Story | What it demonstrates |
|--------|----------------------|
| **MetricCard** | KPI-style tiles, currency vs percent, trend arrow |
| **MeterProgress** | Used vs entitled usage bar |
| **InvoiceStatusBadge** | Status → chip + icon |
| **SearchBar** | Debounce + clear; `play` |
| **DataTable** | Sort, pagination, loading/empty, **WithFilterPersistence**, **VirtualizedTenThousandRows** |
| **SortDropdown** | Multi-sort popover (Query Builder pattern) |

### Organisms

| Story | What it demonstrates |
|--------|----------------------|
| **SidebarNav** | Collapsible rail, active item, navigation + collapse `play` |
| **PricingTierTable** | Graduated tiers + optional footnote tied to tier math |
| **EmptyState** | Icon, copy, CTA; `play` on button |

---

## 4. Story patterns (per brief)

1. **Default** — happy path, realistic Flexprice-style copy (invoices, customers, MRR, metering).
2. **Variants** — loading, empty, error, disabled, and multi-state grids where one control would be noisy.
3. **Controls** — `args` + `argTypes` (selects for enums, booleans, numbers) so reviewers can tune props in the panel.
4. **Docs** — **`tags: ['autodocs']`** on meta; components that needed it per the brief carry **JSDoc** on the exported component (props and usage).
5. **Interaction tests** — **`@storybook/test`** (`userEvent`, `within`, `expect`) in `play` for buttons, inputs, search, sidebar, date picker, filter story, etc.

---

## 5. Advanced challenges

### A — Filter persistence without URL bloat

- Implemented **`useFilterStore`** in [`src/hooks/useFilterStore.ts`](src/hooks/useFilterStore.ts): Zustand + **`sessionStorage`** keyed by route, **`setFilter` / `resetFilters` / `getFilters`**, and a **`hashFilterState`** fingerprint.
- The hook syncs only the **`fp`** query param via React Router’s **`useSearchParams`** so bookmarks stay lightweight.
- **Story:** **DataTable → WithFilterPersistence** (wrapped in **`MemoryRouter`**) wires **`SearchBar`** + table + reset; `play` types into the filter field.

### B — Virtualised list

- **`DataTable`** supports **`virtualized`** mode with **`@tanstack/react-virtual`** (`estimatedRowHeight`, `getRowId`, overscan).
- **Story:** **VirtualizedTenThousandRows** with **10,000** mock rows to show smooth scrolling.

### C — Query config helper

- **`createQueryConfig`** in [`src/lib/query/createQueryConfig.ts`](src/lib/query/createQueryConfig.ts): defaults (**`staleTime` 5m**, **`gcTime` 10m**), presets **`REALTIME`**, **`DEFAULT`**, **`STATIC`**, and **`mergeQueryOptions`** for call-site overrides.

Thank you for reviewing.
