// ── i18n · cadenas de interfaz y mapa de rutas ─────────────────────
export type Lang = "es" | "en";
export const LANGS: Lang[] = ["es", "en"];
export const DEFAULT_LANG: Lang = "es";

// Identificadores de página, independientes del idioma
export type PageId =
  | "home"
  | "servicios"
  | "edge"
  | "proyectos"
  | "sobre"
  | "contacto";

// Rutas equivalentes por idioma (sin barra final, raíz = "/")
export const ROUTES: Record<PageId, Record<Lang, string>> = {
  home: { es: "/", en: "/en" },
  servicios: { es: "/servicios", en: "/en/services" },
  edge: { es: "/edge", en: "/en/edge" },
  proyectos: { es: "/proyectos", en: "/en/projects" },
  sobre: { es: "/sobre-nelly", en: "/en/about" },
  contacto: { es: "/contacto", en: "/en/contact" },
};

export function localizedPath(page: PageId, lang: Lang): string {
  return ROUTES[page][lang];
}

// Navegación principal
export const NAV: { page: PageId; label: Record<Lang, string> }[] = [
  { page: "servicios", label: { es: "Servicios", en: "Services" } },
  { page: "edge", label: { es: "Certificación EDGE", en: "EDGE Certification" } },
  { page: "proyectos", label: { es: "Proyectos", en: "Projects" } },
  { page: "sobre", label: { es: "Sobre Nelly", en: "About" } },
  { page: "contacto", label: { es: "Contacto", en: "Contact" } },
];

// Cadenas sueltas de interfaz
export const UI = {
  brand: { es: "Arq. Nelly Cúneo", en: "Arch. Nelly Cúneo" },
  brandFull: {
    es: "Arq. Nelly Cúneo Galdós",
    en: "Arch. Nelly Cúneo Galdós",
  },
  cap: { es: "CAP 8942", en: "CAP 8942" },
  skipToContent: { es: "Saltar al contenido", en: "Skip to content" },
  menu: { es: "Menú", en: "Menu" },
  langName: { es: "ES", en: "EN" },
  otherLangName: { es: "EN", en: "ES" },
  ctaContact: { es: "Conversemos", en: "Get in touch" },
  ctaServices: { es: "Ver servicios", en: "View services" },
  ctaProjects: { es: "Ver proyectos", en: "View projects" },
  ctaAllProjects: {
    es: "Ver todos los proyectos",
    en: "View all projects",
  },
  readMore: { es: "Saber más", en: "Learn more" },
  // Footer
  footerTagline: {
    es: "Consultora y auditora de la certificación EDGE. Arquitectura sostenible, eficiencia y seguridad.",
    en: "EDGE certification consultant and auditor. Sustainable architecture, efficiency and safety.",
  },
  footerNav: { es: "Navegación", en: "Navigation" },
  footerContact: { es: "Contacto", en: "Contact" },
  footerRights: {
    es: "Todos los derechos reservados.",
    en: "All rights reserved.",
  },
  whatsapp: { es: "WhatsApp", en: "WhatsApp" },
  email: { es: "Correo", en: "Email" },
  linkedin: { es: "LinkedIn", en: "LinkedIn" },
  // Proyectos / filtros
  filterAll: { es: "Todos", en: "All" },
  filterAsesoria: { es: "Asesorías", en: "Consulting" },
  filterAuditoria: { es: "Auditorías", en: "Audits" },
  tipoAsesoria: { es: "Asesoría EDGE", en: "EDGE Consulting" },
  tipoAuditoria: { es: "Auditoría EDGE", en: "EDGE Audit" },
  internationalProjects: {
    es: "Proyectos internacionales",
    en: "International projects",
  },
  clients: { es: "Clientes", en: "Clients" },
} as const;

export type UIKey = keyof typeof UI;

export function t(key: UIKey, lang: Lang): string {
  return UI[key][lang];
}
