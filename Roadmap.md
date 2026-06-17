# Roadmap.md — Lernprogramm
> Single Source of Truth: Vision, Konzepte, App-Struktur, Datenmodell, Roadmap.
> Autorität: Nico / Chat-Claude. CC darf diese Datei nicht autonom editieren.
> Zuletzt aktualisiert: 2026-06-16

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
| `schaltung` | Schaltplan lesen/verstehen — statisch (SVG), beschreibung-only, oder interaktiv (CircuitBuilder) |
| `selbst-bauen` | Aufbauanleitung / Praxisaufgabe mit abhakbarer Checkliste |

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
    ├── lf-01/                ← ✅ vollständig befüllt (6 Themenbereiche)
    │   ├── index.js
    │   ├── tf-01-uri/        ← Ohmsches Gesetz
    │   ├── tf-02-reihe/      ← Reihenschaltung
    │   ├── tf-03-parallel/   ← Parallelschaltung
    │   ├── tf-04-schaltzeichen/
    │   ├── tf-05-messen/
    │   └── tf-06-sicherheit/
    ├── lf-02/ … lf-13/      ← Struktur vorhanden, Inhalte TODO
```

---

## Roadmap

### ✅ Phase 0 — Foundation
Design-System, Motion-Layer, Primitives, App-Shell, Referenz-Screens.

### ✅ Phase 1 — Core Architecture
ESLint, PWA, App-Icon (Bracket Bolt), Daten-Layer, Content-Skeleton, Router.

### ✅ Phase 2 — Navigation Screens
Landing, Dashboard, Lernfeld-Detail, ProgressBar.

### ✅ Phase 3 — Lernablauf Screens
FlowController, 5 Screen-Typen, CircuitBuilder (click-to-connect).

### ✅ Phase 4 — Content-System
stepData-Loading, AufgabenScreen/SchaltungScreen/SelbstBauenScreen funktional,
TF.js Universal Sentence Encoder für Self-Explanation (lokal, offline, kostenlos).

### ✅ Phase 5 — Deployment
Netlify (live: boisterous-tanuki-7f909f.netlify.app), PWA installierbar,
Git-Repo: github.com/Lancarr8/Lernprogramm.

### ✅ LF1 — Inhalt vollständig
6 Themenbereiche komplett befüllt: URI, Reihenschaltung, Parallelschaltung,
Schaltzeichen, Messverfahren, Sicherheit.

### 🔄 Laufend — LF2–13 Content
LF für LF befüllen: Nico prüft fachlich, Chat-Claude draftet Inhalt.
Reihenfolge: LF2 → LF3 → LF4 (1. Lehrjahr zuerst).

### 🌐 Offen — Phase 6: Landing Page
Eigene Website, PWA-Install-Button, kurze App-Beschreibung.

### 🔧 P0 — Bug-Fixes & Politur  (Stand 2026-06-16)
- ✅ Eyebrow „LERNFELD · URI" → dynamisch aus Content (FlowController reicht `kontext={lfNummer,thema}` an alle Flow-Screens; Eyebrow-Primitive adoptiert)
- 🟡 Emoji → Inline-SVG: erledigt in LernfeldScreen + Flow + konsolidiert in `Icons.jsx`. Offen: Glyph „✓" in DashboardScreen — kommt mit Dashboard-Rebuild.
- ⬜ Lernplan.md = Duplikat von REQUIREMENTS.md → entfernen (Doku, offen)
- ⬜ loadProgress() im Render → reaktiv in Context heben (mit Dashboard-Rebuild)

### ✅ Design-System — Migration A & B (2026-06-16)
- **Migration A:** Erfolg-Rolle als eigene Farbe — Tokens `--c-ok`/`--c-ok-soft`/`--c-ok-edge` (Mint #5FE3A1), Erfolg-States teal → Mint.
- **Migration B:** Token-Sweep (Font/Spacing/Line-Height-Hardcodes → Tokens) + Primitive-Adoption (Eyebrow ×2, SectionTag ×8) über 11 Dateien (Landing + Flow-Screens + Panel/Button/ProgressBar). Lint 0/0, Build grün. Dashboard/Lernfeld bewusst ausgespart (→ Punkt 2: token-nativer Rebuild).

---

## V2 — Geplante Features

### 1. Wissensabfrage zwischen Lernfeldern
*Pedagogisch: Testen ob das gesamte Lernfeld sitzt bevor weiter.*

- Neuer Screen-Typ: `wissensabfrage`
- Erscheint im LernfeldScreen wenn alle Themenbereiche abgeschlossen
- Zieht zufällig 8–10 Fragen aus allen `aufgaben.js` Dateien des Lernfelds
- Bestanden bei ≥ 70% → Lernfeld offiziell "abgeschlossen" (grüner Haken im Dashboard)
- Nicht bestanden → schwächste Themenbereiche als "Wiederholen empfohlen" markiert
- Content: keine neue Datei nötig — zieht aus bestehenden `aufgaben.js`

### 2. Spaced Repetition / Wiederholung
*Pedagogisch: Was man vergisst, muss man wiederholen — zum richtigen Zeitpunkt.*

- Datenmodell-Erweiterung: `score` und `lastPracticed` pro Themenbereich speichern
- Algorithmus (vereinfacht): Themenbereich nach 3 Tagen ohne Wiederholung → "Wiederholen"
- Dashboard: "Jetzt wiederholen" Banner mit den fälligen Themenbereichen
- LernfeldScreen: Badge "⚠ Wiederholen" bei Themenbereichen unter Schwellwert
- "Wiederholen"-Button startet Flow ab Schritt 1 mit neuem Seed für Aufgaben

### 3. CircuitBuilder in mehr Themenbereichen
*Pedagogisch: Selbst verdrahten ist der stärkste Lerneffekt.*

- tf-03-parallel: Parallelschaltung (R1 ∥ R2) — komplex durch geteilte Knoten, braucht Node-Konzept im CircuitBuilder
- tf-05-messen: Messschaltung — Voltmeter und Amperemeter richtig platzieren
- Dafür: CircuitBuilder um Node-Typ erweitern (ein Punkt, mehrere Verbindungen)
- Content: `schaltplan.typ = "interaktiv"` in jeweiliger `schaltung.js`

---

## Zukünftige Versionen (V3+)

| Feature | Aufwand | Priorität |
|---|---|---|
| LF 02–13 inhaltlich befüllen | Sehr hoch | Laufend |
| .exe / Electron | Mittel | Optional |
| Cross-Device Sync (Supabase) | Hoch | V3 |
| Echter Drag & Drop Schaltungseditor | Sehr hoch | V3+ |
| Lehrer-Dashboard (Klassenfortschritt) | Hoch | V3+ |
| Mehrsprachig (Englisch) | Mittel | V3+ |

---

## AI-Grenze (unveränderlich)

`classifyExplanation()` ist der einzige KI-Berührungspunkt.
Nutzt TensorFlow.js Universal Sentence Encoder — lokal im Browser,
offline-fähig, kein API-Key, keine Kosten.
Klassifiziert Azubi-Text gegen autorisierte Konzeptkarte.
Generiert niemals Fachinhalt.
