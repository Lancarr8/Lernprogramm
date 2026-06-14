# NEXT_STEP.md — Scaffold: Alle Themenbereich-Gerüste erstellen
> Aktiver Auftrag für CC. Nicht autonom editieren: Roadmap.md, HANDOFF.md, REQUIREMENTS.md.

## Scope
Einmaliger Generator-Lauf. Erstellt alle Themenbereich-Ordner und Stub-Dateien
für alle 13 Lernfelder. Danach aufräumen.

## Task 1 — Script ausführen
Aus `E:/Projects/Lernprogramm/` (Projekt-Root, nicht app/):

```bash
node generate-scaffold.js
```

Verify: Output zeigt "Fertig — 41 Themenbereiche neu erstellt" (tf-01-uri wird übersprungen).

## Task 2 — Verify
Prüfe stichprobenartig:
- [ ] `app/src/content/lf-01/index.js` enthält alle 6 Themenfelder (inkl. tf-01-uri)
- [ ] `app/src/content/lf-02/tf-01-installation/` existiert mit 6 Dateien
- [ ] `app/src/content/lf-13/tf-03-wirtschaftlichkeit/` existiert mit 6 Dateien
- [ ] `npm run build` (aus app/) → 0 Errors

## Task 3 — Script entfernen
```bash
# Aus E:/Projects/Lernprogramm/
del generate-scaffold.js
```

## Wenn fertig
Schreibe am Ende dieser Datei: `## STATUS: SCAFFOLD COMPLETE`
und liste kurz auf was erstellt wurde. Warte dann auf Nicos Review.

---

## STATUS: SCAFFOLD COMPLETE

Erledigt am 2026-06-14:

**Task 1 — `node generate-scaffold.js` ausgeführt.**
- Vor dem Lauf geprüft: lf-02..lf-13 hatten nur `index.js` (Metadaten + leere `themenfelder`-TODOs),
  keine befüllten tf-Ordner → nichts ging verloren. `tf-01-uri` ist `exists: true` und wurde
  übersprungen (echter URI-Content bleibt erhalten).
- Alle 13 `lf-xx/index.js` mit vollständiger Themenfeld-Liste überschrieben.
- **42 Themenbereiche neu erstellt** (je 6 Dateien: `index.js` + 5 Stubs).
  **Hinweis:** Das Script meldet **42**, nicht 41 wie im Verify-Text oben — Off-by-one in der
  Erwartung (lf-01 hat 6 Themenfelder = 5 neu + tf-01-uri übersprungen). Inhaltlich korrekt.

**Task 2 — Verify (alle bestanden):**
- ✅ `lf-01/index.js` enthält alle 6 Themenfelder (inkl. tf-01-uri).
- ✅ `lf-02/tf-01-installation/` existiert mit 6 Dateien.
- ✅ `lf-13/tf-03-wirtschaftlichkeit/` existiert mit 6 Dateien.
- ✅ Themenbereich-Ordner gesamt: **43** (42 neu + tf-01-uri).
- ✅ `npm run build` (aus app/) → 0 Errors (268 Precache-Einträge). `npm run lint` → 0/0.

**Task 3 — `generate-scaffold.js` aus Projekt-Root entfernt.**

**Gesamtstruktur jetzt:** 13 Lernfelder, 43 Themenbereiche. Nur `tf-01-uri` ist inhaltlich
befüllt (bzw. Inline-Content in den Screens); alle anderen sind Stubs (`export default {};`) und
warten auf Content von Nico. Flow/Fallbacks greifen für alle (leere steps-Daten → Screen-Fallbacks).
