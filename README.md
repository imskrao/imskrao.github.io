# imskrao.github.io

Personal site for **Santosh Rao**, Senior Software Engineer - live at
<https://imskrao.github.io>.

Hand-written HTML, modern CSS and one ES module. No framework, no build step,
no dependencies, no `node_modules`. Push to `master` and GitHub Pages serves it.

## Running locally

Any static server works, but the paths are absolute (`/css/app.css`), so it has
to be served from the project root rather than opened as a `file://` URL:

```sh
python3 -m http.server 5501
# then open http://localhost:5501
```

The repo also carries a VS Code Live Server port setting (`.vscode/settings.json`).

## Layout

```
index.html          Home - hero, what I do, selected work
about/index.html    Bio, experience, toolkit, education
work/index.html     Project grid
contact/index.html  Contact details
404.html            Served by GitHub Pages for unknown URLs

css/app.css         The entire stylesheet, organised with @layer
js/main.js          Theme, nav, reveals, clipboard, marquee, SW registration
images/icons.svg    SVG sprite, referenced via <use href="...#id">
service-worker.js   Offline support
```

## Notes for future edits

- **Theming** runs through `light-dark()` in `css/app.css`. Every colour is one
  token with a light and a dark value, so the toggle only changes
  `color-scheme` via `data-theme` on `<html>`. Don't add theme-specific
  selectors; add a token.
- **Header and footer are duplicated** across the four pages. That is the price
  of having no build step. If a nav item changes, change it in all of
  `index.html`, `about/`, `work/`, `contact/` and `404.html`.
- **New page checklist:** copy an existing page's `<head>`, update `<title>`,
  `description`, `og:*` and `canonical`; move `aria-current="page"` to the right
  nav link; add the URL to `sitemap.xml` and to `PRECACHE` in
  `service-worker.js`.
- **Service worker** is network-first for pages and stale-while-revalidate for
  assets. Bump `VERSION` in `service-worker.js` when precached files change.
- **Motion** is gated on `prefers-reduced-motion` throughout. Scroll reveals are
  only applied when the `js` class is present, so the page is fully readable
  without JavaScript.
