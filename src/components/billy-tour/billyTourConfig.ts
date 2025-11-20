// Billy Tour Configuration
// Define all tour steps with selectors, titles, and content

export type BillyTourStep = {
  id: string;
  selector: string; // CSS selector to find the target element
  title: string;
  body: string;
  placement?: "top" | "bottom" | "left" | "right" | "auto";
};

export const BILLY_TOUR_STEPS: BillyTourStep[] = [
  {
    id: "header",
    selector: '[data-bizen-tour="header"]',
    title: "¡Bienvenido a BIZEN!",
    body: "¡Hola! Soy Billy 👋 Aquí arriba encontrarás el logo de BIZEN. Desde cualquier página, puedes hacer clic aquí para volver al inicio.",
    placement: "bottom"
  },
  {
    id: "courses",
    selector: '[data-bizen-tour="courses"]',
    title: "Tu ruta de aprendizaje",
    body: "Este es el corazón de BIZEN. Aquí encontrarás todos tus cursos y lecciones organizados en un camino visual. Cada estrella es una lección que debes completar. ⭐",
    placement: "auto"
  },
  {
    id: "progress",
    selector: '[data-bizen-tour="progress"]',
    title: "Tu progreso",
    body: "Aquí puedes ver cuántas lecciones has completado. ¡Cada lección cuenta para tu progreso total! 🎯",
    placement: "left"
  },
  {
    id: "navigation",
    selector: '[data-bizen-tour="navigation"]',
    title: "Navegación principal",
    body: "Usa este menú para moverte entre las diferentes secciones de BIZEN: cursos, Business Lab, Cash Flow, simuladores y más. 🚀",
    placement: "left"
  }
];

// Local storage key for tracking if tour has been seen
export const BILLY_TOUR_LOCAL_STORAGE_KEY = "bizen_onboarding_v2_seen";

