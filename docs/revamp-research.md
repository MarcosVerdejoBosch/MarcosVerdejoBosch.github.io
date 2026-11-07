# Portfolio revamp: research and decisions

This is the initial research record. The accepted visual direction and current implementation are documented in [the engineering baseline](engineering-baseline.md) and [UI validation](../design-qa.md).

Research date: **2026-11-03**. Scope: the existing personal engineering portfolio, GitHub Pages, and local implementation. This is an architecture decision record and a set of design references. **The visual direction remains open**, as requested by the user; the local styling is a reversible draft for evaluating structure.

## Architecture decision

Use **Astro with static output, strict TypeScript, project content collections, and plain CSS**. Keep GitHub Pages and `/projects/linear-regulator/`. Build an original implementation rather than fork a complete theme.

This recommendation is specific to a portfolio centered on technical case studies, CAD assets, and independent interactive demos. It is not a claim that Astro is universally best, or that this implementation has a measured performance advantage over every alternative.

| Candidate | Evidence | Assessment |
| --- | --- | --- |
| [Astro](https://github.com/withastro/astro) | [Rendering approach](https://docs.astro.build/en/concepts/why-astro/), [content collections](https://docs.astro.build/en/guides/content-collections/), [GitHub Pages](https://docs.astro.build/en/guides/deploy/github/) | Selected for static pages, typed project data, reusable components, and isolated browser interactions. A future React/Svelte demo can be added as a component. |
| [Eleventy](https://github.com/11ty/eleventy) | [Official documentation](https://www.11ty.dev/) and the portfolio starter below | A strong alternative for template-driven content. Astro's component and asset workflow fits the intended technical demos more directly. |
| [SvelteKit](https://github.com/sveltejs/kit) | [Static generation documentation](https://svelte.dev/docs/kit/adapter-static) | Can also generate a static site. Worth reconsidering if stateful application behavior becomes the main experience. |
| [Next.js](https://github.com/vercel/next.js) | [Official static export guide](https://nextjs.org/docs/app/guides/static-exports) | Supports static export. Its application features do not currently offer a clear benefit for the supplied portfolio content. |
| [Jekyll](https://jekyllrb.com/docs/) | Existing source, layout, Gemfile, and workflow | Adequate for the previous site. The requested revamp provides an opportunity to separate project data, components, assets, and demos. |

## Repository inspection

The GitHub connector was used to inspect repository metadata, package manifests, source directories, and a project content schema. No template was installed or copied wholesale.

| Repository | Useful idea | Adoption decision |
| --- | --- | --- |
| [Astro Nano](https://github.com/markhorn-dev/astro-nano) | Separate content/layout/component directories; a calm reading flow. | The inspected package manifest targets Astro 5 and includes a broader toolchain. Use as a structural reference. |
| [Astrofy](https://github.com/manuelernestog/astrofy) | Organized projects, CV, and content. | Its manifest targets Astro 4 and includes Tailwind, DaisyUI, and sections beyond this brief. Keep the useful boundaries without adopting the theme. |
| [BracoZS portfolio starter](https://github.com/BracoZS/astro-starter-portfolio) | Central identity data and a typed project schema. | Manifest and schema inspected. Build independent components and CSS rather than adopt the template identity. |
| [Brittany Chiang v4](https://github.com/bchiang7/v4) | Strong project hierarchy and attention to detail. | The inspected repository uses Gatsby 3/React 17. The current live website is another iteration; it was not treated as the same source. |
| [sb-ph portfolio starter](https://github.com/sb-ph/portfolio-starter) | Markdown-driven projects with shared global data. | The inspected manifest uses Eleventy 0.10. Its organization is useful; its dependency baseline is not adopted. |

These package versions describe the files actually read, not each framework's latest release. The npm registry was checked separately for the implementation: **Astro 7.4.5**, with Node 24 and TypeScript 6 supported by the selected Astro checker.

## Design references to consider

| Reference | What it helps evaluate |
| --- | --- |
| [Brittany Chiang](https://brittanychiang.com/) | A strong personal introduction, restrained navigation, and a clear hierarchy between identity and detailed work. Its current two-column composition was inspected in the browser. |
| [Astro Nano demo](https://astro-nano-demo.vercel.app/) | A quieter, reading-first portfolio with compact lists. Inspected in the browser. |
| [mitxela hardware projects](https://mitxela.com/projects/hardware) | Real electronic artifacts, explicit project states, and routes into technical detail. The hardware index was inspected in the browser. |
| [Josh W. Comeau](https://www.joshwcomeau.com/) | Technical explanations with demonstrations tied to a particular idea. Useful for future case-study interactions. |

Possible directions remain: a sober engineering portfolio with large artifact images; an editorial portfolio prioritizing reading; or an experimental portfolio with demonstrations. The current component/content boundaries support all three. The user wants time to think before selecting one.

## Implementation boundaries

- `src/data/site.ts`: one source for identity and contact links.
- `src/content/projects/*.md`: text, validated metadata, explicit project status, and drafts.
- `src/components/`: reusable presentation and an independently activated 3D viewer.
- `src/styles/global.css`: provisional visual tokens and responsive layout.
- Static output and GitHub Actions deployment; the present experience does not need a server.

## Content and preservation

The original regulator pages disagree about topology and reference. The new case study retains broad goals and the supplied CAD assets. It does not choose between the conflicting component descriptions or invent bench measurements. The IoT placeholder is retained as a draft, excluded until useful project artifacts are ready.

Original Jekyll source, CSS, and PCB assets are retained. Only the optimized model is copied to the build; the viewer and model are activated by the visitor, following the [model-viewer loading approach](https://modelviewer.dev/examples/loading/). Fonts are self-hosted, with their license included.

Compilation and browser verification establish technical behavior. They do not establish artistic approval, electrical performance, or a live deployment. The 19 MB model remains a substantial optional download; it has not been recompressed or substituted.

## Local validation result

- `npm run build` passed: five static pages; Astro/TypeScript diagnostics reported zero errors, warnings, or hints.
- `npm run verify` passed: five routes, 70 local references, 16 section links, original model/image checks, draft exclusion, and the generated 1200 × 630 PNG social image.
- Browser navigation passed from home to the project index and case study. The 3D viewer was absent before activation and rendered the actual supplied model after activation; its reset control and the report section links were exercised without console errors.
- All five routes were inspected at browser widths 390 and 320 pixels. No horizontal overflow was detected, and all rendered PCB images loaded. The normal viewport was restored after testing. The skip link was activated with the keyboard.
- Vite reports a chunk-size advisory for the optional model-viewer bundle (approximately 1 MB before transfer compression). The bundle remains behind a dynamic import activated by the visitor. This is separate from the 19 MB model download.
- These checks were local. The GitHub Actions workflow was prepared but not dispatched, and no deployment or visual approval is claimed.
