# Agent Instructions for React4XP demo

This repository contains the the main React4XP tutorial and documentation.

## Scope and Audience

This documentation covers the **React4XP enonic app framework** , targeted at **Enonic developers** but should also make sense for a regular **front-end developer** that wants to build directly on XP. 

## Content Guidelines

This is a combined **demo, tutorial and reference documentation**. It is compiled from two central elements:

* Tutorial/documentation - contained in the /docs section
* React4xp Demo application - the rest of the files

The compiled and deployed version of the tutorial is deployed to https://developer.enonic.com/learn/react4xp/ Every page should be self-contained and useful on its own. The demo app will be published on Enonic market for downloading and installing without manual compilation needed.

The /docs also holds is a large appendix section, which is essentially the R4XP reference documentation.

### LLM-readability
This documentation should be highly useful for LLMs learning about Enonic and React4XP. To support this:

- **No empty stubs.** Every page in `menu.json` must have substantive content. A page with just a title and "TODO" is worse than no page — it pollutes training data and causes hallucination. If content isn't ready, remove the page from the menu.
- **Self-contained pages.** Minimize "see external docs for details" without context. Summarize the key concept locally, then link out for the full reference. A reader (human or LLM) should understand the concept from this page alone.
- **Consistent structure.** Use the same pattern across similar pages when appliccable.

### Vocabulary
Naming conventions for JS/TS code in an Enonic app:

- **module** — any `.ts`/`.js` file. Foundational term; applies to helpers and entry-point files alike.
- **implementation** (or **implementation file**) — a module bound to a framework contract: paired with a descriptor at a conventional location. Use this when contrasting with the descriptor or pointing at the file specifically.
- **function** — exports from a module (`GET`, `POST`, `responseProcessor`, `run`, etc.).
- **Enonic components** are pages, parts, and layouts — configurable building blocks of a site. Components are *not* functions; their *implementations* export HTTP functions invoked by the site engine.

### External references
When referencing separately documented components, provide a brief summary and link:

- **Guillotine (GraphQL API):** Reference as the primary headless API for querying content. Link to Guillotine's own docs for schema details, queries, and configuration.
- **Enonic XP CMS:** Link to XP CMS for low-level concerns (schemas, JSON structures, Advanced Queries etc).
- **Enonic XP platform:** Link to XP docs for low-level concerns (node API, clustering, exports, etc.).
- **Enonic Content Studio:** Link to Content Studio docs for user interfaces that are relevant.

## Code guidelines

This is a tutorial, where the main focus is the integration between React Components and the Enonic data. Keep the code examples clean and simple, but aligned with best practices.

## Build, Test, and Lint

The documentation relies on GitHub Actions for building and publishing, while the Enonic app can be built using standard Enonic CLI commands

- **CI Build:** The documentation is generated and published via the `.github/workflows/enonic-docgen.yml` workflow using `enonic/release-tools/generate-docs`.
- **Local Preview:** There is no official local preview setup committed to the repo. Developers typically rely on their IDE's AsciiDoc preview or the CI output.
- **Validation:** Validation happens during the CI build process.

## High-Level Architecture

- **Source Directory:** All documentation source files are located in `docs/`.
- **Format:** Content is written in [AsciiDoc](https://asciidoc.org/) (`.adoc`).
- **Publishing:** The build crunches and imports the result into Enonic XP, where it will be only one of many aggregated documentation packages. 
- **Location:** This documentation will be published in a specific location on developer.enonic.com, but controlled from the CMS.
- **Structure:** The structure of the adoc files are mapped to a corresponding relative URL. For example `/docs/actions.adoc` and `/docs/actions/yikes.adoc` in this repo will have url pattern `/code` and `/code/yikes` respectively
- **Navigation:** The site navigation and menu structure are defined in `docs/menu.json`.
- **Versioning:** Documentation versions are configured in `docs/versions.json`.
- **Variables:** Common variables and attributes are defined in `docs/.variables.adoc`.
- **Entry Point:** `docs/index.adoc` is the main entry point for the documentation.

## Key Conventions

- **Images:**
  - Images are stored in `media/` subdirectories relative to the referencing `.adoc` file (e.g., `docs/content/media/`, `docs/schemas/form-items/images/`).
  - In AsciiDoc files, the `:imagesdir:` is typically set to `images`, mapping files to the respective folders.
  - Example: `image::my-image.png[]` (where `my-image.png` is placed in `docs/content/images/`).
- **Diagrams (Mermaid):**
  - Flow/architecture diagrams are authored as [Mermaid](https://mermaid.js.org/) text, not drawn by hand. The text is the source of truth; the rendered `.svg` is a committed build artifact.
  - **Source file:** store the Mermaid source next to the image it produces, dot-prefixed so the CMS import ignores it — e.g. `docs/web/images/.common-pipeline.mmd` renders to `docs/web/images/common-pipeline.svg`. Reference the `.svg` from the `.adoc` with a normal `image::` macro.
  - **Layout engine:** use the ELK layout (`config: { layout: elk }` in the file's frontmatter). It honours subgraph `direction` (e.g. laying a set of services out in a horizontal row) and packs tighter than the default dagre layout. Rendering ELK requires the extra `@mermaid-js/layout-elk` package — see the command below.
  - **Render command** (no global install; run from the repo root, adjust paths):
    ```
    npx -y -p @mermaid-js/mermaid-cli -p @mermaid-js/layout-elk \
      mmdc -i docs/web/images/.common-pipeline.mmd \
           -o docs/web/images/common-pipeline.svg -b transparent
    ```
    First run downloads `mermaid-cli` and a headless Chromium (~1.4 GB) into `~/.npm/_npx` and `~/.cache/puppeteer` — a one-time cost, nothing is added to the repo. Re-render and commit both the `.mmd` and the `.svg` after any edit.
  - The exact source file and re-render command are also kept in an AsciiDoc comment directly above each diagram's `image::` line, so the recipe travels with the page.
- **Documenting library functions and types:** Most library functions take a *single object argument*. Document them with flat, linked tables — never nested tables.
  - **Page itinerary — fixed top-level sections, in this order:** `== Usage`, `== Functions`, `== Classes`, `== Type Definitions`, then `== Events` and `== Constants` *only if the library has them*. This mirrors what API-doc generators (TypeDoc/JSDoc/JavaDoc/rustdoc) emit, so every library reads the same and a missing bucket unambiguously means "none of that kind." Group strictly by kind: functions as `=== fnName` under `== Functions`; a class as `=== ClassName` under `== Classes` with its members as `==== memberName`; each *reused* type as `=== TypeName` under `== Type Definitions` (single-use `params`/`options` objects are inlined in their function instead — see below, so `== Type Definitions` is omitted when there are no shared types). Within a function or method, use `[.lead]` labels (`Parameters`, `Returns`, `Example`) rather than sub-headings.
  - **Single-object parameter:** lead in with *"``<fn>()`` takes a single `params` object with these properties:"* followed by **one flat table** with columns `Name | Type | Description`. Do *not* add an outer `params | object | …` row, do *not* use nested AsciiDoc tables (`!===`), and do *not* flatten sub-objects with dot-notation (`schedule.value`).
  - **Optionality — required by default.** There is no "Attributes"/"required" column. A field is *required* unless its Description begins with `*Optional.*`. Conditional requirements are stated in prose (e.g. "*Optional.* … Required when `type` is `CRON`."). Put any default value in the Description too — e.g. "*Optional.* Root path to serve from. Defaults to `+/static+`."
  - **Inline single-use objects; break out only when reused.** A `params`/`options` object used by *one* function is documented *inline* in that function — its properties become the function's flat Parameters table (never a nested `!===` table, never dot-notation). Only when the *same* object shape is reused across multiple functions do you break it out into `== Type Definitions` as its own flat table with an explicit anchor (`[#schedule-type]`) and reference it from the Type column (`<<schedule-type, Schedule>>`). So a `== Type Definitions` section exists **only if the library has shared/reused types** — otherwise omit it entirely (e.g. `docs/appendix/library.adoc` has none: each option type is single-use and inlined).
  - **Return objects** use the same flat-table style under `== Type Definitions`; the function's `Returns` line links to the type — e.g. `*object* : (<<scheduled_job,`ScheduledJob`>>) …`. Do *not* wrap the whole line in single-plus passthrough (`+…+`): that disables the `*bold*` type, the `<<…>>` cross-reference, and the `` `monospace` `` all at once, so it renders as literal `*object*` / `<<…>>` text. Only wrap an individual substring that genuinely contains underscores.
  - **Table style:** borderless three-column tables — `[%header,cols="1%,1%,98%a"]` with `[frame="none"]` and `[grid="none"]`. Parameter, return, and type tables all share this one shape.
  - Keep the existing `Example` / `Return value` code blocks — they double as the concrete sample payloads.
  - **Reference examples:** `docs/libraries/lib-scheduler.adoc` (functions + the `ScheduledJob`/`Schedule` types) and `docs/appendix/library.adoc` (the full itinerary, including a `== Classes` section).
  - **Skeleton to copy for a new library reference:**

    ```adoc
    = <Name> library
    :toc: right

    <one-line summary of what the library does>

    == Usage

    // Add the dependency (build.gradle) + the import statement, plus any required setup/mount.

    == Functions

    === <fnName>

    <what it does>

    [.lead]
    Parameters

    [%header,cols="1%,1%,98%a"]
    [frame="none"]
    [grid="none"]
    |===
    | Name | Type | Description
    | <name> | <type> | <description; prefix "*Optional.*" if not required>
    |===

    [.lead]
    Returns

    *object* : (<<some-type, SomeType>>) <what is returned>

    [.lead]
    Example

    // a [source] code block

    == Classes

    === <ClassName>

    <what it is / when to use it>

    ==== <methodName>

    // same [.lead] Parameters / Returns / Example sub-structure as a function

    // == Type Definitions  — ONLY for object shapes REUSED across multiple functions.
    //                         A single-use params/options object is inlined in its
    //                         function's Parameters table instead (as above). Omit this
    //                         whole section if there are no shared types.
    == Type Definitions

    [#some-type]
    === SomeType

    [%header,cols="1%,1%,98%a"]
    [frame="none"]
    [grid="none"]
    |===
    | Name | Type | Description
    | <field> | <type> | <description>
    |===

    // == Events      — only if the library emits events
    // == Constants   — only if the library exposes constants
    ```
- **Menu Updates:** When adding new documentation pages, you MUST update `docs/menu.json` to ensure they appear in the docs navigation.
- **Links:**
  - Use relative links between `.adoc` files (e.g., `<<path/to/doc#,Label>>`).
  - Do *not* use the `^` suffix on link labels (e.g., `[Label^]`) — neither for cross-doc links within `developer.enonic.com` nor for genuinely external sites. Forcing a new tab removes user agency; readers who want one can middle-click or Cmd-click. EDK, CS, CMS, XP platform, and Guillotine docs all render on the same dev portal and behave as sibling navigation, not as "external" destinations.
- **Variables:** Use attributes defined in `docs/.variables.adoc` for consistent naming (e.g., `{release}`).
- **Underscores in inline text — be extremely careful:** AsciiDoc parses paired underscores as italic, so any identifier, path, or URL placeholder that contains `_` can silently break formatting (a single `_` opens an italic run that swallows the rest of the line; `foo_bar_baz` renders as `foo*bar*baz`). Wrap such strings in single-plus passthrough — `+text_with_underscores+` — to suppress parsing. For monospaced URL patterns and identifiers, combine with backticks: `` `+/_/<app>:<api>/+` ``, `` `+last_event_id+` ``, `` `+http_management_port+` ``. The rule applies to prose, link labels, list items, and example URL patterns; content already inside a fenced source block is safe. When in doubt, wrap it in `+`.