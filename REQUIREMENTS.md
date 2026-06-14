# REQUIREMENTS.md
> Anforderungsdokumentation — Lernprogramm
> Erstellt: 2026-06-14 | Autorität: Nico / Chat-Claude (nicht CC)

---

## Projektziel

Eine Web-App, die deutschen Elektronik-Azubis hilft, ihren Lernstoff zu den offiziellen Lernfeldern zu üben — strukturiert, offline-fähig, ohne Ablenkung.

**Zielgruppe:** Elektroniker-Azubis in Deutschland (Berufsschule + zuhause)  
**Entwickler:** Nico — Azubi, Domain-Experte, Entwickler in einem.

---

## Funktionale Anforderungen

| # | Anforderung |
|---|---|
| F1 | Lernstoff ist nach Lernfeldern strukturiert |
| F2 | Lernablauf folgt der Lern-Schablone (Anker → Warum → Formel → Aufgaben → Self-Explanation → Schaltung → Bauen) |
| F3 | Self-Explanation: Azubi erklärt in eigenen Worten — App gibt Feedback |
| F4 | Lernfortschritt wird gespeichert |
| F5 | Inhalte sind ausschließlich autorisierte, geprüfte Snippets — kein LLM generiert Fachinhalte |

---

## Nicht-funktionale Anforderungen

| # | Anforderung | Entscheidung |
|---|---|---|
| NF1 | Plattform | PC (zuhause) + Berufsschule — responsives Layout erforderlich |
| NF2 | Offline-Fähigkeit | ✅ PWA — funktioniert ohne Internetverbindung |
| NF3 | Datenspeicherung | localStorage / IndexedDB — lokal im Browser |
| NF4 | Geräteübergreifende Synchronisation | ❌ V1 — geplantes Feature für spätere Version |
| NF5 | Content-Updates | Inhalte im App-Bundle — kein externer API-Call nötig |
| NF6 | Backend / Accounts | ❌ V1 — kein Backend, kein Login |

---

## Architekturprinzipien

- **Kein Scope-Creep:** V1 ist vollständig durch Etappenplan definiert. Neue Features kommen erst nach explizitem GO.
- **AI-Grenze:** `classifyExplanation()` ist der einzige KI-Berührungspunkt. Heuristik jetzt, LLM später als Swap. Kein LLM generiert Fachinhalte.
- **Vertikale Scheiben:** Ein Screen komplett von Daten bis UI — dann der nächste. Kein horizontales Schichten-Bauen.
- **Offline-first:** PWA-Strategie — Service Worker cached App-Shell und Inhalte. LLM-Modus nur wenn Netz vorhanden, Heuristik als Offline-Fallback.

---

## Bewusste Vereinfachungen (V1)

- Kein Drag-and-Drop-Schaltungseditor
- Kein Hub / Dashboard
- Kein echtes LLM (classifyExplanation bleibt Heuristik)
- Kein Backend, keine Accounts, kein Sync
- Kein Testrunner, kein Lint-Script (noch nicht konfiguriert)

---

## Offene Entscheidungen (für spätere Versionen)

| Thema | Notiz |
|---|---|
| Sync | Bei Einführung: Supabase empfohlen (Auth + DB + Sync, kostenloses Tier) |
| Konfliktstrategie | Bei Sync: was passiert wenn offline auf zwei Geräten gelernt wurde? |
| PWA-Konfiguration | vite-plugin-pwa — noch nicht eingerichtet |
