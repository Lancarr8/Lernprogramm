# NEXT_STEP — Homepage / Landing (Phase 6)
Stand: 2026-06-17 · Autorität: Nico/Chat-Claude · CC führt aus.

## Ziel
Den minimalen `LandingScreen` zu einer vollwertigen **Homepage-Startseite** ausbauen —
Produkt-Website-Gefühl, damit die App „fertig" wirkt. Als Eingangsseite der bestehenden
PWA: ein Codebase, ein Deploy, Design-System wiederverwenden. Kein separates Projekt.
(Vorlage: das im Chat gezeigte Mockup — gleicher Look, gleiche Abschnitte.)

## Scope (IN)
- `screens/LandingScreen.jsx` → Homepage mit den Abschnitten unten.
- **Neu** `screens/ImpressumScreen.jsx` — erstmal nur Name (Platzhalter).
- **Neu** `hooks/useInstallPrompt.js` — PWA-Install-Logik.
- `index.html` — Apple-/iOS-Metas (apple-touch-icon, apple-mobile-web-app-capable,
  apple-mobile-web-app-status-bar-style, theme-color).
- `components/Icons.jsx` — Brand-Icons ergänzen: GitHub, Instagram, X (+ ggf. Share/Coffee).
- `router.jsx` — Route „impressum" ergänzen (Landing ↔ Impressum).

## OUT (nicht anfassen)
- Dashboard/Flow/Content/Classifier, Manifest (ist install-fertig), Redesign anderer Screens.
- **Echte Screenshots** (typografisch wie im Mock — Screenshots ggf. später).
- **Echte URLs/Accounts** (Social, Buy-me-a-coffee, Domain): Platzhalter; Nico trägt ein.
- Tracking/Analytics: keins.

## Entscheidungen (fix)
- Claim **„Kein Login nötig" bleibt**; Login nur als OPTION — Header-Button „Anmelden (bald)"
  als sichtbarer Dummy, **kein Fake-Formular**.
- **Impressum:** nur Name (Platzhalter), eigene Unterseite, Footer-Link. Rechtlich noch
  unvollständig — bewusst so entschieden.
- **Social:** GitHub, Instagram, X (Footer, Platzhalter-Links).
- **Buy me a coffee:** kleiner Footer-Link, als **plainer Link** — KEIN BMC-Embed-Script
  (das trackt; bricht „kein Tracking"). Platzhalter-URL.
- **Kein Fake-Social-Proof** (keine erfundenen Testimonials/Bewertungen).

## Abschnitte (Reihenfolge)
1. **Header** — Logo (mono) · Anker-Nav (Features / Ablauf / Lernfelder) ·
   „Anmelden (bald)" (Dummy) · „Starten" (→ dashboard).
2. **Hero** — Eyebrow „Lernprogramm · für Elektronik-Azubis", h1 „Lernfelder. Strukturiert.",
   Subline, CTAs „Lernfelder entdecken" (→ dashboard) + „App installieren".
3. **Zahlen-Strip** — 13 Lernfelder · 43 Themen · 100 % offline · 0 Tracking.
4. **Features (3)** — Offline lernbar · nach IHK-Lernfeldern strukturiert · interaktiv
   (Aufgaben/Schaltungen/Selbsterklärung). Icons aus `Icons.jsx`.
5. **So funktioniert's** — 5 Schritte: Lernseite → Aufgaben → Selbsterklärung → Schaltung → Selbst bauen.
6. **Lernfeld-Übersicht** — Grid; LF1 „verfügbar", Rest „bald".
   (Titel LF2–13 = Platzhalter, bis Nico echte liefert.)
7. **Install-CTA** — Button + iOS-Hinweis („Teilen → Zum Home-Bildschirm").
8. **FAQ** — kostenlos? / Internet nötig? / iPhone? / Account? (kein Login nötig, später optional).
9. **Footer** — „Kein Login nötig · offline · kein Tracking" · Social (GitHub/Insta/X) ·
   Buy-me-a-coffee (plainer Link) · Impressum-Link.

## Install-Logik
- `useInstallPrompt()`: fängt `beforeinstallprompt` (`preventDefault`, Event merken) →
  gibt `{ canInstall, promptInstall, isIOS, isStandalone }`. iOS per UA-Erkennung;
  standalone per `matchMedia('(display-mode: standalone)')` / `navigator.standalone`.
- Install-Button-Logik: standalone → ausblenden · `canInstall` → Prompt auslösen ·
  iOS → Inline-Hinweis · sonst → ausblenden.

## Grundregeln
- Design-System strikt wiederverwenden: Panel (BracketCorners), Button, Eyebrow, SectionTag,
  Stack, Icons + Tokens (`--c-*`, `--fs-*`, `--space-*`, `--ls-*`). Keine neuen Hardcodes.
- Atmosphäre wie bestehend: grid-bg, HUD-Klammern, Teal, Mono-Eyebrows, Space Grotesk / JetBrains Mono.
- **Keine neuen npm-Deps.** Motion-GPU-Regel (nur transform/opacity).
- CC-Protokoll: pro Datei lesen → `edit_file` dryRun → GO → schreiben.
  Neue Dateien (`useInstallPrompt.js`, `ImpressumScreen.jsx`) als Vollinhalt → GO → `write_file`.
- Step-0-Inventar vor Änderungen: betroffene Dateien, Tokens/Props aus dem Code,
  Vollinhalt der neuen Dateien.

## Verify
- `npm run lint` 0/0, `npm run build` 0 Errors, keine Konsolenfehler.
- Landing rendert alle Abschnitte; „Starten"/„Lernfelder entdecken" → Dashboard; Impressum-Route auf/zu.
- Install: Desktop-Chrome (deployt ODER DevTools → „Install") zeigt Button + Prompt; iOS-Pfad
  zeigt Hinweis; standalone blendet Button aus. **`beforeinstallprompt` ist lokal zickig**
  (Engagement-Heuristik) → verlässlich auf der deployten Netlify-Seite oder via DevTools prüfen.
- Responsive ok (mobil-first; Abschnitte brechen sauber).

## Commits (Vorschlag)
- (A) `useInstallPrompt` + `index.html`-Metas + Icons-Brand · (B) Homepage-`LandingScreen` +
  Footer · (C) Impressum-Route. Oder gebündelt — CC entscheidet, je 1 grüner Schritt.
- Push nur auf ausdrückliche Ansage (Netlify deployt master live).

## Nicht in diesem Schritt
- Echte Screenshots, echte URLs/Accounts, Login-Funktion, weitere Lernfeld-Inhalte, Classifier-Umbau.
