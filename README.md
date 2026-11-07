# Marcos Verdejo Bosch — personal portfolio

Static portfolio built with **Astro 7, TypeScript, and plain CSS**, prepared for GitHub Pages.

The portfolio uses a minimal personal introduction, separate About and Projects pages, Inter for reading, and Commit Mono for navigation. Framework research is recorded in [docs/revamp-research.md](docs/revamp-research.md); the current engineering and UI baseline is documented in [docs/engineering-baseline.md](docs/engineering-baseline.md).

## Local development

Requires Node.js 24 or newer and npm. On Windows / PowerShell:

```powershell
& "C:\Program Files\nodejs\npm.cmd" install
& "C:\Program Files\nodejs\npm.cmd" run dev
```

The development server uses `http://127.0.0.1:4321` by default. Use the actual URL printed by Astro if the port is occupied.

```powershell
& "C:\Program Files\nodejs\npm.cmd" run build
& "C:\Program Files\nodejs\npm.cmd" run verify
& "C:\Program Files\nodejs\npm.cmd" run preview
```

`build` checks Astro/TypeScript and project metadata, then generates `dist/`. `verify` tests theme preferences and checks routes, local links, section anchors, drafts, metadata, image alternatives, original asset hashes, and the on-demand 3D contract.

In a restricted environment that cannot write Astro's telemetry configuration to the user profile, set this variable for that shell session:

```powershell
$env:ASTRO_TELEMETRY_DISABLED = "1"
```

These scripts use Astro's CLI and native ESM configuration. There are no direct Vite CLI scripts or separate Vite config to load. If a direct Vite script is introduced, retain the project's `--configLoader native` convention.

## Where to edit

| Location | Responsibility |
| --- | --- |
| `src/data/site.ts` | Identity, shared navigation, contact links, areas of focus |
| `src/content/projects/*.md` | Project text and typed frontmatter |
| `src/content.config.ts` | Required fields and draft/status rules |
| `src/pages/` | Routes and page composition |
| `src/components/` | Navigation, project summaries, contact, 3D viewer |
| `src/layouts/BaseLayout.astro` | Document structure and metadata |
| `src/styles/global.css` | Semantic theme tokens and responsive styles |
| `assets/img/projects/linear-regulator/` | Preserved original PCB assets |
| `scripts/prepare-assets.mjs` | Copies the optimized model and font license to generated public assets |

Add a project in `src/content/projects/`. Its filename becomes `/projects/<filename>/`. The build validates its required frontmatter. `draft: true` excludes it from page generation and project lists.

Current routes: `/`, `/projects/`, `/projects/linear-regulator/`, `/about/`, and `/404.html`. The existing project permalink is preserved.

## Assets and interaction

- The PCB image is optimized into responsive WebP assets during the build.
- Fonts are self-hosted through Fontsource. Only the primary Latin Inter font is preloaded; other subsets retain Fontsource's browser-driven loading. The font licenses are included under `/licenses/`.
- The 3D library and 19 MB model load after the visitor activates the viewer. A responsive static image is available initially and after an error. Without JavaScript, the inactive 3D button stays hidden and a direct model download is available.
- `public/models/` and `public/licenses/` are generated and ignored by Git. Original source assets remain in `assets/`; the unoptimized 67 MB model is excluded from the output.
- Identity and contact use the links from the previous homepage, now centralized.
- Light and dark themes use semantic color tokens in `src/styles/global.css`, with crimson in dark mode and a muted green accent in light mode. The sun/moon button is available on every route. The first visit follows the system; an explicit choice is saved locally as `mvb-theme` and restored before rendering, including recovery from the back/forward cache. Switching still works when storage is blocked. Without JavaScript, the site remains dark and the inactive toggle stays hidden.

## GitHub Pages

`.github/workflows/pages.yml` installs locked dependencies, builds and verifies Astro, and deploys `dist/`. Its trigger remains a push to `main` or an explicit workflow dispatch. GitHub Settings → Pages must use **GitHub Actions**.

The canonical URL is `https://marcosverdejobosch.github.io`. Update `site` in `astro.config.mjs` and `public/robots.txt` together if the domain changes.

## Preserved Jekyll version

The original `index.md`, `projects.md`, `projects/`, `_layouts/`, `_config.yml`, `Gemfile`, and `assets/css/style.css` remain as a reference. Astro builds from `src/` and `public/`; it does not publish the legacy sources.

The old regulator pages contain conflicting circuit descriptions. The new case study describes the supplied CAD assets and design goals, with electrical measurements pending. Specific component/topology claims should be restored only after reviewing the actual schematic.
