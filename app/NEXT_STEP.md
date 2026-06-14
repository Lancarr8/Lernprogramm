# NEXT_STEP.md — Phase 5: Deployment
> Aktiver Auftrag für CC. Nicht autonom editieren: Roadmap.md, HANDOFF.md, REQUIREMENTS.md.

## Scope
Projekt deployment-ready machen. CC legt Config-Dateien an und
verifiziert den Production-Build. Netlify-Account + Git-Repo
erstellt Nico danach manuell (CC hat keinen Browser-Zugriff dafür).

## Nicht anfassen
- Alle Screen-Dateien, Content-Dateien — nicht ändern
- src/data/progress.js, src/router.jsx — nicht ändern

---

## Task 1 — .gitignore (Projekt-Root)
Erstelle `E:/Projects/Lernprogramm/.gitignore`:

```
# Dependencies
app/node_modules/

# Build output
app/dist/

# Dev tools
.DS_Store
*.local
.env
.env.*

# Netlify
.netlify/

# Logs
npm-debug.log*
```

---

## Task 2 — netlify.toml (Projekt-Root)
Erstelle `E:/Projects/Lernprogramm/netlify.toml`:

```toml
[build]
  base    = "app"
  command = "npm run build"
  publish = "dist"

# SPA-Fallback: alle Routen auf index.html
[[redirects]]
  from   = "/*"
  to     = "/index.html"
  status = 200
```

---

## Task 3 — Production-Build verifizieren
Aus `app/` ausführen:

```bash
npm run build
```

Verify folgende Dateien existieren in `app/dist/`:
- [ ] `index.html`
- [ ] `manifest.webmanifest`
- [ ] `sw.js` (Service Worker)
- [ ] `icons/icon-192.png`
- [ ] `icons/icon-512.png`
- [ ] `assets/` (JS + CSS bundles)

---

## Task 4 — npm audit Report
```bash
npm audit
```

Output vollständig unter `## Audit-Report` am Ende dieser Datei dokumentieren
(Severity, Paket, ob fix-able). Nicht automatisch fixen — Nico entscheidet.

---

## Task 5 — PWA-Checkliste für Nico (ans Ende dieser Datei anhängen)
Nach dem CC-Teil folgende Checkliste anhängen:

```
## Nico: Manuelle Schritte nach CC

### A — Git-Repo anlegen
1. GitHub.com → New Repository → "lernprogramm" (privat oder öffentlich)
2. In E:/Projects/Lernprogramm/:
   git init
   git add .
   git commit -m "initial: Phase 0-5 complete"
   git remote add origin https://github.com/DEIN-USERNAME/lernprogramm.git
   git push -u origin main

### B — Netlify verbinden
1. netlify.com → Log in → "Add new site" → "Import an existing project"
2. GitHub → lernprogramm Repo auswählen
3. Build settings werden aus netlify.toml gelesen (automatisch)
4. "Deploy site" klicken
5. Nach ~1 Minute: Site live unter xxxxx.netlify.app

### C — PWA testen (Chrome / Edge)
1. Site im Browser öffnen
2. Adressleiste: Install-Icon (Computer mit Pfeil) klicken
3. "Installieren" bestätigen
4. App öffnet sich als eigenständiges Fenster (kein Browser-Chrome)
5. Netzwerk in DevTools auf "Offline" stellen → App lädt noch ✓
6. App-Icon auf Desktop prüfen: Bracket-Bolt-Icon sichtbar ✓

### D — Domain (optional)
Netlify → Site settings → Domain management → Add custom domain
```

---

## Definition of Done (CC)

- [ ] `.gitignore` existiert in `E:/Projects/Lernprogramm/`
- [ ] `netlify.toml` existiert in `E:/Projects/Lernprogramm/`
- [ ] `npm run build` → 0 Errors
- [ ] `dist/manifest.webmanifest` vorhanden
- [ ] `dist/sw.js` vorhanden
- [ ] `dist/icons/icon-192.png` + `icon-512.png` vorhanden
- [ ] npm audit Report unter `## Audit-Report` dokumentiert

## Wenn fertig
Schreibe am Ende dieser Datei: `## STATUS: PHASE 5 COMPLETE`
und liste Audit-Report + was du getan hast.
Warte dann auf Nicos Review.

---

## Nico: Manuelle Schritte nach CC

### A — Git-Repo anlegen
1. GitHub.com → New Repository → "lernprogramm" (privat oder öffentlich)
2. In E:/Projects/Lernprogramm/:
   git init
   git add .
   git commit -m "initial: Phase 0-5 complete"
   git remote add origin https://github.com/DEIN-USERNAME/lernprogramm.git
   git push -u origin main

### B — Netlify verbinden
1. netlify.com → Log in → "Add new site" → "Import an existing project"
2. GitHub → lernprogramm Repo auswählen
3. Build settings werden aus netlify.toml gelesen (automatisch)
4. "Deploy site" klicken
5. Nach ~1 Minute: Site live unter xxxxx.netlify.app

### C — PWA testen (Chrome / Edge)
1. Site im Browser öffnen
2. Adressleiste: Install-Icon (Computer mit Pfeil) klicken
3. "Installieren" bestätigen
4. App öffnet sich als eigenständiges Fenster (kein Browser-Chrome)
5. Netzwerk in DevTools auf "Offline" stellen → App lädt noch ✓
6. App-Icon auf Desktop prüfen: Bracket-Bolt-Icon sichtbar ✓

### D — Domain (optional)
Netlify → Site settings → Domain management → Add custom domain

---

## Audit-Report

`npm audit` (ausgeführt 2026-06-14, aus `app/`):

**Ergebnis: 2 Vulnerabilities (1 moderate, 1 high) — alle in der Dev-Dependency-Kette
`esbuild` ← `vite`. Kein Laufzeit-Risiko für den deployten statischen Build.**

| Paket | Severity | Pfad | Beschreibung | Fix |
|---|---|---|---|---|
| esbuild (<=0.28.0) | high | node_modules/esbuild | (1) Dev-Server akzeptiert Cross-Origin-Requests und gibt Responses preis (GHSA-67mh-4wv8-2f99). (2) Fehlende Binär-Integritätsprüfung im Deno-Modul → RCE via NPM_CONFIG_REGISTRY (GHSA-gv7w-rqvm-qjhr). | nur via `npm audit fix --force` → installiert `vite@8` (**breaking change**) |
| vite (<=6.4.1) | (abh.) | node_modules/vite | Hängt von verwundbarer esbuild-Version ab. | s. o. |

**Einordnung:**
- Beide Befunde betreffen ausschließlich den **lokalen esbuild-Dev-Server** (`npm run dev`),
  nicht den Production-Output. Der Netlify-deployte `dist/` enthält keinen esbuild-Server.
- **Nicht automatisch gefixt** (laut Auftrag) — `npm audit fix --force` würde auf `vite@8`
  hochziehen (Breaking Change, aktuell `vite@5`). Empfehlung: vorerst belassen oder bewusst
  ein kontrolliertes Vite-Major-Upgrade als eigene Aufgabe planen. **Nico entscheidet.**

---

## STATUS: PHASE 5 COMPLETE

Erledigt am 2026-06-14:

**Task 1 — `.gitignore`** in `E:/Projects/Lernprogramm/` angelegt (node_modules, dist, env, .netlify, logs).

**Task 2 — `netlify.toml`** in `E:/Projects/Lernprogramm/` angelegt (base=app, command=`npm run build`,
publish=dist, SPA-Fallback-Redirect `/* → /index.html` 200).

**Task 3 — Production-Build verifiziert** (`npm run build`, 0 Errors). Vorhanden in `app/dist/`:
- ✅ `index.html` · ✅ `manifest.webmanifest` · ✅ `sw.js` (+ `workbox-*.js`)
- ✅ `icons/icon-192.png` · ✅ `icons/icon-512.png`
- ✅ `assets/` (JS-Bundles inkl. lazy code-split Content + `index-*.css`)

**Task 4 — npm audit** dokumentiert (siehe `## Audit-Report` oben). Nicht gefixt — Nico entscheidet.

**Task 5 — PWA-/Deployment-Checkliste** für Nico angehängt (siehe `## Nico: Manuelle Schritte nach CC`).

**Hinweis:** Repo-Erstellung, Netlify-Verbindung und PWA-Installationstest erfordern Browser-/Account-
Zugriff und macht Nico manuell (Schritte A–D). Der CC-Teil (Config + Build-Verifikation) ist vollständig.
