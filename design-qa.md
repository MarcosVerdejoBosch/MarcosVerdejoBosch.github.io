# Portfolio UI validation

Baseline reviewed on November 6, 2026. This version establishes the Astro portfolio as the starting point for further iterations.

## Approved experience

- A personal introduction on the homepage, with separate About and Projects pages.
- English copy describing electronics, software, audio, and the current role in Google Cloud infrastructure.
- Inter 500 for the name, Inter for reading, and Commit Mono for navigation and technical labels.
- Dark mode with a restrained crimson accent; warm light mode with a muted green accent.
- An accessible theme button, persistent preferences, and recovery after browser-history restoration.
- Original PCB assets, explicit project status, and an interactive model loaded only after activation.

## Light-theme contrast adjustment

Secondary labels, captions, metadata, and body text use a darker graphite green. Separators are more defined while preserving the thin rules and existing spacing.

| Role | Color | Contrast against the light background |
| --- | --- | --- |
| Background | `#F5F4F0` | — |
| Main text | `#252424` | 14.07:1 |
| Secondary text | `#49514B` | 7.45:1 |
| Green text accent | `#2F6657` | 6.04:1 |
| Standard separators | `#809185` | 3.03:1 |
| Strong separators | `#62766A` | 4.42:1 |

The secondary text previously used `#686460` at 5.33:1. The dark palette and green link accent remain unchanged.

## Verification

- `npm run build`: Astro Check reported zero errors, warnings, and hints; five static routes were generated.
- `npm run verify`: nine theme tests, twenty text-color pairs, 75 local references, and fifteen fragments passed.
- Static contracts cover headings, the main landmark, unique IDs, image alternatives, navigation state, matching font preload, responsive image candidates, and original asset preservation.
- Browser checks cover desktop and mobile layouts, both themes, focus, navigation, and the static model poster.
- The preceding foundation review also exercised the 3D viewer, keyboard controls, Reset view, reading index, and browser history across 40 responsive checks.
- Complete and production-only npm audit checks reported no known vulnerabilities during the foundation review.

The new source replaces the Jekyll build in the Pages workflow. Publication runs through the repository's [GitHub Actions history](https://github.com/MarcosVerdejoBosch/MarcosVerdejoBosch.github.io/actions).

## Evidence scope

Browser captures and historical review reports are kept as local development artifacts. They are not required for building or viewing the site. This file records the reproducible checks without depending on local filesystem links.

The review does not certify complete WCAG conformance or measure real-user Core Web Vitals. No screen-reader session was conducted. The no-JavaScript alternative was checked in generated HTML; simulated events cover bfcache restoration. The deferred 3D bundle still produces Vite's known size advisory.

Sources, module responsibilities, implementation decisions, and the next content work are documented in [the engineering baseline](docs/engineering-baseline.md).
