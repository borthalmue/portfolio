# Portfolio

Personal engineering portfolio — FRC fabrication/CAM, mechanical design, research, and woodworking.

Live site: https://borthalmue.github.io/portfolio/

## Structure

- `index.html` — main page (About, Experience, Projects, Research teaser, Skills, Contact)
- `maser.html` — full "Masers in Medicine" research write-up with live calculators
- `css/style.css` — all styling (dark/light theme via the toggle in the nav)
- `js/main.js` — nav, theme toggle, reveal-on-scroll, project filters, gimbal simulator, lightbox
- `js/calculators.js` — the two live calculators on the research page
- `assets/images/` — drop real photos here (folders already created per project: `frc/`, `gimbal/`, `woodworking/`, `hero/`)
- `assets/cad/` — downloadable STEP files (mirror plate, full robot assembly)

## Adding real photos

Each placeholder tile in a project's gallery is just a styled `<div class="ph">`. To swap one for
a real photo:

1. Drop the image file into the matching `assets/images/<project>/` folder.
2. In `index.html`, find the `<div class="ph">...</div>` you want to replace and swap it for:
   ```html
   <img src="assets/images/frc/your-photo.jpg" alt="Short description">
   ```
3. Save, then push the change (see below).

## Editing content

Search `index.html` for `<!-- EDIT ME -->` comments — those mark placeholder bio text, the
woodworking project list, etc. Everything else is already filled in.

## Pushing updates to the live site

This repo deploys automatically via GitHub Pages whenever `main` is updated. From this folder:

```bash
git add -A
git commit -m "Update site"
git push
```

Changes usually go live within a minute or two.
