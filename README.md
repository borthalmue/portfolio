# Portfolio

Personal portfolio — Mechanical & Bioengineering at Santa Clara University, robotics/AI
software, FRC fabrication, and research.

Live site: https://borthalmue.github.io/portfolio/

## Structure

- `index.html` — main page (About, Experience, Fabrication, Robotics, Software, Research teaser, Skills, Contact)
- `maser.html` — full "Masers in Medicine" research write-up
- `css/style.css` — all styling (light by default; dark via the toggle in the nav)
- `js/main.js` — nav + theme toggle
- `assets/images/` — project photos (folders already created: `frc/`, `gimbal/`, `woodworking/`, `robot-arm-sim/`, `hero/`)
- `assets/cad/` — downloadable STEP files (mirror plate, full robot assembly)

Related repos linked from the Software section: `robot-arm-sim`, `turret-tracking-sim`, and
`cv-image-classifier`, all under github.com/borthalmue.

## Adding real photos

1. Drop the image file into the matching `assets/images/<project>/` folder.
2. In `index.html`, add an `<img src="assets/images/<project>/your-photo.jpg" alt="...">` where
   you want it.
3. Save, then push (see below).

## Editing content

Search `index.html` for `<!-- EDIT ME -->` comments — those mark the remaining placeholder text
(the woodworking project list). Everything else is filled in.

## Pushing updates to the live site

This repo deploys automatically via GitHub Pages whenever `main` is updated.

```bash
git add -A
git commit -m "Update site"
git push
```

Changes usually go live within a minute or two.
