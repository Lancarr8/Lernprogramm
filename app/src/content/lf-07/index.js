// LF 7 — Baugruppen hard- und softwareseitig konfigurieren
// 2. Ausbildungsjahr · 80 Stunden

export default {
  id: "lf-07",
  ihkNummer: 7,
  ausbildungsjahr: 2,
  zeitrichtwert: 80,
  titel: "Baugruppen hard- und softwareseitig konfigurieren",
  inhalte: [
    "Grafische Darstellung von Programmen",
    "Datenformate, parallele und serielle Datenübertragung, Datenvisualisierung",
    "Schnittstellen, Bussysteme, Hardwaretreiber, Firmware-Update",
    "Mikrocontroller, Signalprozessoren",
    "Programmiersprachen, auch grafische",
    "Programmtest an realen und simulierten/virtuellen Systemen",
    "Intelligente Sensoren",
    "Ansteuerung von Aktoren",
    "Steuerungstechnik, Regelungstechnik",
    "Komponenten einer integrierten Entwicklungsumgebung",
  ],
  themenfelder: [
    { id: "tf-01-mikrocontroller", titel: "Mikrocontroller und Signalprozessoren", data: () => import("./tf-01-mikrocontroller/index.js") },
    { id: "tf-02-schnittstellen", titel: "Schnittstellen und Bussysteme", data: () => import("./tf-02-schnittstellen/index.js") },
    { id: "tf-03-programmierung", titel: "Programmierung und Entwicklungsumgebung", data: () => import("./tf-03-programmierung/index.js") },
  ],
};
