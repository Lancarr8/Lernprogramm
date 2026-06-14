export default {
  id: "tf-04-schaltzeichen",
  titel: "Schaltpläne und Schaltzeichen",
  steps: [
    { type: "lernseite",        data: () => import("./lernseite.js") },
    { type: "aufgaben",         data: () => import("./aufgaben.js") },
    { type: "self-explanation", data: () => import("./self-explanation.js") },
    { type: "schaltung",        data: () => import("./schaltung.js") },
    { type: "selbst-bauen",     data: () => import("./selbst-bauen.js") },
  ],
};
