// selbst-bauen.js — tf-06-sicherheit

export default {
  titel: "Sicherheitscheck: 5 Regeln anwenden",
  sicherheit:
    "Dieses Thema handelt von Sicherheit \u2014 nimm es ernst. " +
    "Niemals an spannungsf\u00fchrenden Teilen arbeiten ohne die 5 Regeln einzuhalten.",
  materialien: [
    { menge: 1, bauteil: "Pr\u00fcflampe oder Spannungspr\u00fcfer (Phasenpr\u00fcfer)" },
    { menge: 1, bauteil: "Abdeckband oder Warnschild" },
    { menge: 1, bauteil: "Diese Checkliste" },
  ],
  schritte: [
    "REGEL 1 \u2014 Freischalten: Gerinnungsspannung abschalten (Sicherung / Schalter aus).",
    "REGEL 2 \u2014 Gegen Wiedereinschalten sichern: Sicherung entnehmen oder Schalter abschlie\u00dfen und Warnschild anbringen.",
    "REGEL 3 \u2014 Spannungsfreiheit feststellen: Mit Spannungspr\u00fcfer an allen Leitern (L, N, PE) pr\u00fcfen.",
    "REGEL 4 \u2014 Erden und Kurzschlie\u00dfen: Bei Hochspannungsanlagen Kurzschlussgarnitur anlegen (bei Niederspannung oft entfallen).",
    "REGEL 5 \u2014 Abdecken: Benachbarte spannungsf\u00fchrende Teile abdecken / isolieren.",
    "Arbeit durchf\u00fchren.",
    "Nach der Arbeit: Abdeckungen entfernen, Kurzschlussgarnitur l\u00f6sen, Spannung einschalten, Funktion pr\u00fcfen.",
  ],
  abschluss:
    "Die 5 Sicherheitsregeln sind keine B\u00fcrokratie \u2014 sie sind durch T\u00f6desf\u00e4lle entstanden. " +
    "Jede ausgelassene Regel ist ein Risiko. Immer alle 5, immer in dieser Reihenfolge.",
};
