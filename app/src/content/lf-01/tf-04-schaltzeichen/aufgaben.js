// aufgaben.js — tf-04-schaltzeichen: Schaltpl\u00e4ne und Schaltzeichen

export default {
  titel: "Aufgaben: Schaltzeichen",
  aufgaben: [
    {
      id: "a1",
      typ: "multiple-choice",
      frage: "Welches Symbol steht f\u00fcr einen ohmschen Widerstand nach DIN EN 60617?",
      optionen: [
        "Leeres Rechteck",
        "Kreis mit X",
        "Dreieck mit Strich",
        "Zwei parallele Linien",
      ],
      korrekt: 0,
      erklaerung:
        "Der ohmsche Widerstand wird als leeres Rechteck dargestellt (IEC/europäisch). " +
        "In US-Normen wird ein Zickzack verwendet.",
    },
    {
      id: "a2",
      typ: "multiple-choice",
      frage: "Wie wird eine Gleichspannungsquelle (Batterie) im Schaltplan dargestellt?",
      optionen: [
        "Langer und kurzer paralleler Strich (+ und \u2212)",
        "Kreis mit Plus-Zeichen",
        "Rechteck mit zwei Anschl\u00fcssen",
        "Dreieck mit Pfeil",
      ],
      korrekt: 0,
      erklaerung:
        "Die Batterie wird als abwechselnd lange (+) und kurze (\u2212) Striche dargestellt. " +
        "Der lange Strich ist der Pluspol.",
    },
    {
      id: "a3",
      typ: "multiple-choice",
      frage: "Woran erkennst du eine LED im Schaltplan?",
      optionen: [
        "Diodensymbol (Dreieck + Strich) mit zwei Pfeilen",
        "Rechteck mit Pfeil",
        "Kreis mit L",
        "Parallele Linien mit Pfeil",
      ],
      korrekt: 0,
      erklaerung:
        "Die LED ist ein Diodensymbol (Dreieck zeigt Stromrichtung + Kathodenstrich) " +
        "mit zwei Pfeilen die das Licht symbolisieren.",
    },
    {
      id: "a4",
      typ: "multiple-choice",
      frage: "Was zeigt ein Schaltplan im Unterschied zu einem Aufbauplan?",
      optionen: [
        "Die elektrischen Verbindungen und Funktionen \u2014 nicht die r\u00e4umliche Anordnung",
        "Die genaue Position der Bauteile auf der Platine",
        "Die Gr\u00f6\u00dfe der Bauteile ma\u00dfst\u00e4blich",
        "Den Stromfluss als Animation",
      ],
      korrekt: 0,
      erklaerung:
        "Ein Schaltplan zeigt logische Verbindungen und Funktionen. " +
        "Die r\u00e4umliche Anordnung ist egal \u2014 das zeigt der Aufbauplan oder das Leiterplattendesign.",
    },
  ],
};
