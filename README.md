# Marcos Verdejo Bosch — personal portfolio

Static portfolio built with **Astro 7, TypeScript, and plain CSS**, prepared for GitHub Pages.

The portfolio uses a minimal personal introduction, separate About and Projects pages, a shared contact footer, and Inter for reading. Commit Mono is reserved for technical labels. The initial design and engineering decisions are recorded in [the revamp research](docs/revamp-research.md) and [the November 6 baseline](docs/engineering-baseline.md).

## Local development

Requires Node.js 24 or newer and npm. On Windows / PowerShell:

```powershell
& "C:\Program Files\nodejs\npm.cmd" ci
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
| `src/data/site.ts` | Identity, shared navigation, contact links |
| `src/content/projects/*.md` | Project text and typed frontmatter |
| `src/content.config.ts` | Required fields and draft/status rules |
| `src/pages/` | Routes and page composition |
| `src/components/` | Navigation, project summaries, contact, 3D viewer |
| `src/layouts/BaseLayout.astro` | Document structure and metadata |
| `src/styles/` | Shared theme and layout rules, plus page-specific styles |
| `assets/img/projects/linear-regulator/` | Preserved original PCB assets |
| `scripts/prepare-assets.mjs` | Compresses the PCB model and copies asset licenses |

Add a project in `src/content/projects/`. Its filename becomes `/projects/<filename>/`. The build validates its required frontmatter. `draft: true` excludes it from page generation and project lists.

Current routes are `/`, `/about/`, `/projects/`, `/projects/linear-regulator/`, and `/404.html`. The old `/contact/` route redirects to the homepage footer.

## Assets and interaction

- The PCB image is optimized into responsive WebP assets during the build.
- Fonts are self-hosted through Fontsource. The site preloads Inter Latin WOFF2. The project details and 404 page also use Commit Mono WOFF2. Asset licenses are included under `/licenses/`.
- The 3D library, local Meshopt decoder, and approximately 4 MB model load after the visitor activates the viewer. The build compresses the existing optimized GLB without re-quantizing or simplifying the mesh. The source assets are preserved in `assets/`.
- A responsive static image is available initially and after an error. With JavaScript disabled, a direct download is available for viewers that support Meshopt. `public/models/` and `public/licenses/` are generated and ignored by Git.
- Identity and contact use the links from the previous homepage, now centralized.
- Light and dark themes use semantic color tokens in `src/styles/global.css`, with crimson in dark mode and a muted green accent in light mode. The sun/moon button is available on every route. The first visit follows the system; an explicit choice is saved locally as `mvb-theme` and restored before rendering, including recovery from the back/forward cache. Switching still works when storage is blocked. Without JavaScript, the site remains dark and the inactive toggle stays hidden.

## GitHub Pages

`.github/workflows/pages.yml` installs locked dependencies, builds and verifies Astro, and deploys `dist/`. Its trigger remains a push to `main` or an explicit workflow dispatch. GitHub Settings → Pages must use **GitHub Actions**.

The canonical URL is `https://marcosverdejobosch.github.io`. Update `site` in `astro.config.mjs` and `public/robots.txt` together if the domain changes.

## Previous Jekyll version

The old Jekyll site is available in [Git history at 594eb51](https://github.com/MarcosVerdejoBosch/MarcosVerdejoBosch.github.io/tree/594eb518cc62450f919e4411dc1b61dfbb72d292). Astro builds from `src/` and `public/`.

The regulator page pairs the PCB model with one simulated load-release trace. The [plot](assets/img/projects/linear-regulator/load-release-3v3.svg) uses the archived SIM-06 3.3 V samples from the 2026-09-24 revalidation; its metadata records the source CSV hash. The technical report, full waveforms and circuit files live in the regulator project.
