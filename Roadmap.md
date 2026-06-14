# Roadmap.md — Lernprogramm
> Single Source of Truth: Vision, Konzepte, App-Struktur, Datenmodell, Roadmap.
> Autorität: Nico / Chat-Claude. CC darf diese Datei nicht autonom editieren.
> Zuletzt aktualisiert: 2026-06-14

---

## Vision

Ein offline-fähiges Lernprogramm für deutsche Elektronik-Azubis,
das den IHK-Lernstoff strukturiert, nachvollziehbar und ohne
externe Abhängigkeiten vermittelt. Kein Login, kein Abo,
kein Tracking — läuft lokal im Browser.

---

## IHK-Grundlage

KMK-Rahmenlehrplan: Elektroniker für Geräte und Systeme
(Beschluss 16.05.2003 i.d.F. 23.02.2018)
**13 Lernfelder** · 1020 Stunden gesamt · 4 Ausbildungsjahre

| LF | Titel | Jahr | Std. |
|---|---|---|---|
| 1 | Elektrotechnische Systeme analysieren und Funktionen prüfen | 1 | 80 |
| 2 | Elektrische Installationen planen und ausführen | 1 | 80 |
| 3 | Steuerungen analysieren und anpassen | 1 | 80 |
| 4 | Informationstechnische Systeme bereitstellen | 1 | 80 |
| 5 | Elektroenergieversorgung für Geräte und Systeme realisieren | 2 | 80 |
| 6 | Elektronische Baugruppen konzipieren, herstellen und prüfen | 2 | 60 |
| 7 | Baugruppen hard- und softwareseitig konfigurieren | 2 | 80 |
| 8 | Geräte herstellen und prüfen | 2 | 60 |
| 9 | Geräte und Systeme in Stand halten | 3 | 100 |
| 10 | Fertigungsanlagen einrichten | 3 | 80 |
| 11 | Prüfsysteme einrichten und anwenden | 3 | 100 |
| 12 | Geräte und Systeme planen und realisieren | 4 | 80 |
| 13 | Fertigungs- und Prüfsysteme in Stand halten | 4 | 60 |

Offizielle Inhalte je Lernfeld → `src/content/lf-xx/index.js`

---

## Lern-Schablone (pro Themenbereich)

Die Schritte pro Themenbereich sind **nicht fix** — Anzahl und Auswahl
werden in der Content-Definition (`src/content/lf-xx/index.js`) pro
Themenbereich festgelegt. Minimum: 3 Schritte. Kein Maximum.

Der Step-Indikator ("X / Y") liest diese Zahl zur Laufzeit aus dem
Content — nie hardcoded im Component.

**Mögliche Schritttypen (Auswahl pro Themenbereich):**

| Typ | Beschreibung |
|---|---|
| `lernseite` | Realwelt-Anker + Warum + interaktive Formel/Visual |
| `aufgaben` | Gestufte Aufgaben (leicht → schwer), sofortiges Feedback |
| `self-explanation` | Azubi erklärt in eigenen Worten, App klassifiziert |
| `schaltung` | Schaltplan lesen/verstehen (statisch oder interaktiv) |
| `selbst-bauen` | Aufbauanleitung / Praxisaufgabe |

Reihenfolge ist pro Themenbereich frei definierbar.
Überspringen nur nach Abschluss des vorherigen Schritts.

---

## App-Struktur

```
PWA (installierbar via Browser)
│
├── [Screen: Start / Landing]
│   Erster Eindruck wenn App frisch installiert.
│   Nach erstem Besuch: direkt → Dashboard.
│
├── [Screen: Dashboard]
│   Alle 13 Lernfelder auf einen Blick.
│   Fortschrittsanzeige pro Lernfeld.
│   Empfehlung: "Hier weitermachen" / "Das wiederholen".
│
├── [Screen: Lernfeld-Detail]
│   Alle Themenbereiche eines Lernfelds.
│   Roadmap: welche Themenbereiche abgeschlossen / offen / empfohlen.
│   Einstieg frei wählbar (nach Abschluss vorheriger Themen).
│
└── [Flow: Lernablauf] ← N Schritte pro Themenbereich (aus Content-Definition)
    Schritttypen und Reihenfolge kommen aus src/content/lf-xx/tf-xx/index.js
```

---

## Datenmodell (localStorage)

```json
{
  "lastVisited": {
    "lernfeldId": "lf-01",
    "themenfeldId": "tf-01-uri",
    "screenIndex": 2
  },
  "lernfelder": {
    "lf-01": {
      "themenfelder": {
        "tf-01-uri": {
          "completed": false,
          "screens": [true, true, false, false, false],
          "score": null,
          "attempts": 1
        }
      }
    }
  }
}
```

`screens`-Array ist dynamisch — Länge entspricht der Schrittanzahl
des jeweiligen Themenbereichs aus der Content-Definition.

---

## Content-Struktur

Inhalte liegen als statische JS/JSON-Dateien im Bundle:

```
src/
└── content/
    ├── index.js              ← Alle 13 Lernfelder registriert
    ├── lf-01/
    │   ├── index.js          ← Meta + offizielle Inhalte + Themenfelder
    │   └── tf-01-uri/
    │       ├── index.js      ← Schrittliste: [{type, data}, ...]
    │       ├── lernseite.js
    │       ├── aufgaben.js
    │       ├── self-explanation.js
    │       ├── schaltung.js
    │       └── selbst-bauen.js
    ├── lf-02/ … lf-13/      ← Struktur vorhanden, Inhalte TODO
```

Neues Themenbereich hinzufügen = Ordner + Dateien anlegen + in lf-xx/index.js registrieren.
Kein CMS, kein Backend, kein Build-Step nötig.

---

## Roadmap

### ✅ Phase 0 — Foundation (erledigt)
- Design-System (Tokens, Farben, Fonts, Radii)
- Motion-Layer (Framer Motion, Varianten)
- Shared Primitives (Panel, Button, BracketCorners)
- App-Shell (main.jsx, App.jsx, global.css)
- Referenz-Screens (uri_slice_prototype, self_explanation_screen_v1)

### ✅ Phase 1 — Core Architecture (erledigt)
- ESLint + Prettier
- vite-plugin-pwa + Service Worker + Web Manifest
- App-Icon (Bracket Bolt, 192 + 512px)
- Daten-Layer: src/data/progress.js
- Content-Struktur: alle 13 Lernfelder als Skeleton
- Router: src/router.jsx

### ✅ Phase 2 — Navigation Screens (erledigt)
- Landing Screen, Dashboard, Lernfeld-Detail
- ProgressBar als shared Komponente

### ✅ Phase 3 — Lernablauf Screens (erledigt)
- FlowController + 5 Screen-Typen
- LernseiteScreen + SelfExplanationScreen migriert
- Aufgaben / Schaltung / Selbst-bauen als Shells

### ✅ Phase 4 — Content-System (erledigt)
- Token --c-warn-soft/--c-warn-edge
- stepData-Loading im FlowController
- AufgabenScreen, SchaltungScreen, SelbstBauenScreen funktional
- TODO-Stubs für Nico in tf-01-uri Content-Dateien

### 🔄 Phase 5 — Deployment (in Arbeit)
- [ ] .gitignore + netlify.toml (CC erledigt)
- [ ] Production-Build verifiziert
- [ ] Git-Repo + Netlify-Deploy (Nico manuell)
- [ ] PWA-Test im Browser

### 📝 Nico — Content befüllen (parallel zu Phase 5)
- [ ] tf-01-uri/aufgaben.js
- [ ] tf-01-uri/schaltung.js
- [ ] tf-01-uri/selbst-bauen.js
- [ ] Weitere Themenbereiche in lf-01 anlegen

### 🌐 Phase 6 — Landing Page
- [ ] Eigene Website oder Netlify-Page
- [ ] PWA-Install-Button
- [ ] Kurze App-Beschreibung

---

## Zukünftige Versionen

| Feature | Aufwand | Priorität |
|---|---|---|
| LF 02–13 inhaltlich befüllen (12 Lernfelder offen) | Sehr hoch | Nach V1 |
| .exe / Electron | Mittel | Optional |
| Cross-Device Sync (Supabase) | Hoch | Nach V1 |
| LLM-Swap für classifyExplanation | Mittel | Nach V1 |
| Echter Schaltungseditor | Sehr hoch | V3+ |

---

## AI-Grenze (unveränderlich)

`classifyExplanation()` ist der einzige KI-Berührungspunkt.
Klassifiziert Azubi-Text gegen autorisierte Konzeptkarte.
Generiert niemals Fachinhalt. Bleibt Heuristik bis explizit getauscht.
