# NEXT_STEP — Migration B: Token-Sweep + Primitive-Adoption
Stand: 2026-06-16 · Autorität: Nico/Chat-Claude · CC führt aus.

## Ziel
Hardcodes für Font-Size / Spacing / Line-Height → Tokens. Plus Adoption der
Primitive Eyebrow / SectionTag / Stack. Rein visuell/strukturell — kein neues
Verhalten, keine Logik-, keine Farbänderung.

## Scope
IN:
- Landing(-Screen)
- Flow-Screens (alle Screens des Lern-Flows)
- Komponenten: Panel, Button, ProgressBar
OUT (nicht anfassen):
- Dashboard, Lernfeld → werden später token-nativ neu gebaut (Roadmap Punkt 2)
- Doku (Roadmap/HANDOFF/REQUIREMENTS)
- Farb-Rollen (in Migration A erledigt)
- Heading-Weight (bleibt 500)

## Grundregeln
- Nicht pixelidentisch. Snaps ≤2px sind gewollt — auf Token runden, alten Wert
  NICHT erhalten.
- Nur die drei Achsen Font/Spacing/LineHeight + die drei Primitive. Sonst nichts.
- write_file überschreibt komplett → pro Datei erst Inventar/Diff zeigen → GO → schreiben.
- Exakte Token-Identifier (CSS-Var-Strings bzw. tokens.js-Keys) in Step 0 aus dem
  Code verifizieren. Die Namen unten sind die Rollen, nicht zwingend die var-Strings.
- Pro Datei die Styling-Form treffen: var(--…) in CSS vs. tokens.js-Wert im Inline-Style.

## Mapping — Font-Size (roh px → Token)
| roh                   | Token        | px |
|-----------------------|--------------|----|
| 28 / 26 / 25          | --fs-display | 28 |
| 22 / 21 / 20          | --fs-h1      | 22 |
| 18                    | --fs-h2      | 18 |
| 16.5 / 16             | --fs-h3      | 16 |
| 15.5 / 15 / 14.5 / 14 | --fs-body    | 15 |
| 13.5 / 13             | --fs-sm      | 13 |
| 12.5 / 12             | --fs-label   | 12 |
| 11.5 / 11 / 10.5 / 10 | --fs-micro   | 11 |
Zwischenwerte (z.B. 24/23/19/17) und alles außerhalb 10–28 → Inventar, nicht auto-mappen.

## Mapping — Spacing (roh px → Token), gilt für margin/padding/gap
| roh    | Token     | px |
|--------|-----------|----|
| 2–4    | --space-1 | 4  |
| 5–9    | --space-2 | 8  |
| 10–13  | --space-3 | 12 |
| 14–16  | --space-4 | 16 |
| 20–24  | --space-5 | 24 |
| 26–32  | --space-6 | 32 |
| 40–48  | --space-7 | 48 |
| 64     | --space-8 | 64 |
Werte zwischen den Bändern (17–19, 33–39, 49–63) → Inventar, nicht auto-mappen.

## Mapping — Line-Height (nach Rolle, NICHT pixelweise)
- Headings / display → --lh-tight
- Fließtext / Body / UI-Labels → --lh-base
- Langform-Lesetext (lange Absätze, Erklärtexte) → --lh-relaxed
Riskanteste Achse: Sprünge >2px möglich. Daher confirm-each — CC listet jeden
gefundenen Roh-Wert mit vorgeschlagenem Token im Inventar, Nico bestätigt einzeln.
Numerische Werte von --lh-tight/base/relaxed in Step 0 aus tokens.js verifizieren;
uneindeutige Roh-Werte markieren statt raten.

## Primitive-Adoption
Ad-hoc-Umsetzungen durch Primitive ersetzen, NUR bei eindeutigem Muster-Match:
- Eyebrow: kleines Uppercase-Label über Headings → <Eyebrow>
- SectionTag: Abschnitts-Tags/-Marker → <SectionTag>
- Stack: manuelles vertikales Spacing (margin-bottom-Ketten / flex-column+gap)
  → <Stack> mit Token-gap
Unsichere Fälle ins Inventar, nicht raten. Echte Props der drei Primitive in Step 0
aus dem Code bestätigen — nicht aus dieser Spec annehmen.

## Ausführungs-Protokoll (CC)
0. Inventar erstellen & zeigen (vor jeder Änderung):
   a. Konkrete Datei-Liste im Scope (echte Pfade).
   b. Exakte Token-Identifier + Line-Height-Werte aus tokens.js/cssVars.
   c. Props-Signaturen von Eyebrow/SectionTag/Stack aus dem Code.
   d. Pro Datei: alle Font/Spacing/LineHeight-Hardcodes + Adoption-Kandidaten,
      je mit vorgeschlagenem Token/Primitive.
1. Auf GO warten.
2. Datei für Datei: Diff-Preview → GO → write_file.
3. Nach jedem File: kurzer Render-/Verhaltens-Check.

## Akzeptanzkriterien
- Keine rohen Font-Size/Spacing-Werte mehr im Scope (außer bewusst ausgenommene).
- Line-Height im Scope über Tokens.
- Eyebrow/SectionTag/Stack adoptiert, wo Muster passt.
- Kein Verhaltens-/Logik-/Farbwechsel. Heading-Weight 500.
- Visuelle Abweichung ≤2px ok, keine offensichtlichen Layout-Brüche.
- Dashboard/Lernfeld unangetastet.

## Nicht in dieser Migration
- Dashboard/Lernfeld-Rebuild, loadProgress-Reaktivität (Roadmap Punkt 2)
- Landingpage-als-Code-Screen (Punkt 3)

## Step-0-Entscheidungen (Migration B) — verbindlich

Line-Height (confirm-each, jetzt fix):
- 1.45 / 1.5 / 1.55 → --lh-base
- 1.6 (Erklär-/Subtexte) → --lh-relaxed
- 1.7 (AUFGEBAUT-MIT-Liste) → --lh-relaxed
- 1.3 (Formel-Card) → --lh-tight  (falls Render-Check Enge zeigt: base)
- 1.4 / 1.45 (mono Worked-Steps) → --lh-base

Font out-of-band:
- 25 → --fs-display  (per Mapping-Tabelle, +3px akzeptiert)
- 30 (LernseiteScreen Readout-Zahl) → roh lassen + Code-Kommentar „bewusste Out-of-band-Hero-Zahl"

Spacing-Snaps:
- 40 → --space-7  (+8px Bottom-Padding, ok)
- marginTop:1 (Icon-Nudges) → roh lassen (optischer Nudge, kein Scale-Wert)

SectionTag-Margin (Variante B):
- 12px als marginBottom: var(--space-3) Style-Override an SectionTag
- Ausnahme: wo der direkte Parent in derselben Datei zu <Stack> wird → Stack-gap (space-3) übernimmt, kein Override

## Ausführungsmodus (dieser Sweep) — hat VORRANG vor „Ausführungs-Protokoll (CC)" Punkt 2 oben
1. Backup zuerst: die 11 Scope-Dateien nach app/.bak-migB/ kopieren.
2. Sweep über alle 11 Dateien in EINEM Durchgang (Reihenfolge klein→groß wie im Step-0-Inventar).
3. Gesamt-Diff über alle Dateien zeigen — NICHT schreiben.
4. Auf Schreib-GO warten.
5. Nach GO alle Dateien rausschreiben.
6. Render-Check; bei Bruch betroffene Datei aus app/.bak-migB/ zurück + gezielt fixen.

---

## STATUS: MIGRATION B COMPLETE

Erledigt am 2026-06-16. Backup der 11 Dateien in `app/.bak-migB/` (Safety-Net, nach Review löschbar).

### Achsen-Sweep (Font / Spacing / Line-Height → Tokens)
Alle rohen fontSize/spacing/lineHeight im Scope durch `var(--…)` ersetzt, gemäß den
verbindlichen Step-0-Maps. **Bewusst roh gelassen:** Readout-`fontSize:30` (Hero-Zahl, mit Kommentar),
`marginTop:1`-Icon-Nudges, `paddingLeft:18` (Zwischenband 17–19), Geometrie (Checkbox 18/5, Dot 5,
SVG-Attribute/Koordinaten), Radien, Border-Breiten, `flex-basis`, `letterSpacing` (keine der 3 Achsen).
Line-Heights: 1.4/1.45/1.5/1.55→base, 1.3→tight, 1.6/1.7→relaxed.

### Primitive-Adoption
- **Eyebrow ×2:** LandingScreen Top-Marke, LernseiteScreen Header (`<Eyebrow>`; ls→`--ls-eyebrow`).
- **SectionTag ×8:** Aufgaben (BERECHNUNG/MULTIPLE CHOICE/AUFGABEN), Schaltung (SCHALTUNG×2-Branches/
  AUFGEBAUT MIT), SelbstBauen (SELBST BAUEN/MATERIAL/AUFBAU) — Margin-Variante B (`marginBottom:var(--space-3)`
  als Style-Override); lokale `const eyebrow` entfernt.
- **Stack ×0:** Spalten-Container sind animierte `motion.div` (rise) → bewusst NICHT geswappt
  (Verhaltenswechsel/Animationsverlust vermieden); gaps stattdessen in-place tokenisiert.
- Shell-/SelfExpl-Eyebrows: KEIN Eyebrow (nicht uppercase → Optik bliebe nicht erhalten).

### Verifikation
- ✅ `npm run lint` 0/0 · ✅ `npm run build` 0 Errors · ✅ keine Konsolenfehler.
- ✅ Render (Dev, computed): Landing-Eyebrow 11px/uppercase/ls 2.2px(0.2em)/teal · h1 28px(display) ·
  Landing-Panel-Override 32/24/24 · Lernseite-Header-Eyebrow 11px/uppercase · Readout 30px (roh) ·
  Panel-Padding 16px(space-4) · Aufgaben-SectionTag 12px/uppercase/mb 12px · Shell-Eyebrow „LF 1 · …".
- ✅ Alle 6 Screens (Landing + Lernseite/Aufgaben/SelfExpl/Schaltung/SelbstBauen) rendern ohne Bruch.
- Dashboard/Lernfeld unangetastet (außerhalb Scope).

### Berührte Files (11)
`components/{Panel,Button,ProgressBar}.jsx` · `screens/LandingScreen.jsx` ·
`screens/flow/{FlowController,CircuitBuilder,SchaltungScreen,AufgabenScreen,SelbstBauenScreen,LernseiteScreen,SelfExplanationScreen}.jsx`
