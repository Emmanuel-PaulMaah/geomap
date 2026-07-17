# GeoMap country-selector fix

This patch updates the current `main` branch implementation without overwriting unrelated UI and visualization code.

## Apply

From your local `geomap` repository root:

```bash
node /path/to/apply-fix.mjs
npm run lint
npm run build
npm run dev
```

Copy `apply-fix.mjs` anywhere first, or place it in the repository root and run:

```bash
node apply-fix.mjs
```

## What changes

- Validates the REST Countries HTTP response and JSON shape.
- Rejects countries without valid coordinates.
- Requests `flags`, which the popup already consumes.
- Shows a visible error and retry action instead of an unexplained empty map.
- Makes search/filter access null-safe.
- Fixes organization-key normalization.
- Uses the full country collection for relationship calculations while rendering only filtered markers.
- Updates zoom-derived marker dimensions correctly.
- Reduces marker rerenders by listening to `zoomend` rather than every zoom frame.

## Restore

The script creates backups beside each changed file:

```text
src/App.jsx.before-country-selector-fix
src/components/WorldMap.jsx.before-country-selector-fix
src/components/WorldMap.css.before-country-selector-fix
```

Restore with:

```bash
cp src/App.jsx.before-country-selector-fix src/App.jsx
cp src/components/WorldMap.jsx.before-country-selector-fix src/components/WorldMap.jsx
cp src/components/WorldMap.css.before-country-selector-fix src/components/WorldMap.css
```
