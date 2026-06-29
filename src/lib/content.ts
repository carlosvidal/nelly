// ── Acceso tipado al contenido (JSON estático, renderizado en build) ─
import proyectosData from "../data/proyectos.json";
import serviciosData from "../data/servicios.json";
import clientesData from "../data/clientes.json";
import type { Lang } from "../i18n/ui";

export interface Bilingue {
  es: string;
  en: string;
}

export type Tipo = "asesoria" | "auditoria";
export type Estado =
  | "final"
  | "preliminar"
  | "en-proceso-preliminar"
  | "en-proceso-final"
  | "advanced"
  | "edge";

// Lo MÍNIMO que hay que escribir en proyectos.json por cada proyecto.
// Los textos de estado y descripción se generan solos (ver tablas abajo).
interface ProyectoRaw {
  tipo: Tipo;
  nombre: string;
  ubicacion: string;
  cliente: string;
  estado: Estado;
  imagen: string | null;
  destacado?: boolean;
  internacional?: boolean;
  nota?: Bilingue | null;
}

export interface Proyecto extends Required<Omit<ProyectoRaw, "nota">> {
  orden: number;
  estadoLabel: Bilingue;
  descripcion: Bilingue;
  nota: Bilingue | null;
}

// ── Tablas centrales: el "estado" decide la etiqueta y la descripción ──
const ESTADO_LABEL: Record<Estado, Bilingue> = {
  final: { es: "Certificación Final EDGE", en: "EDGE Final Certification" },
  preliminar: { es: "Certificación Preliminar EDGE", en: "EDGE Preliminary Certification" },
  "en-proceso-preliminar": { es: "En proceso", en: "In progress" },
  "en-proceso-final": { es: "Certificación Final en proceso", en: "Final Certification in progress" },
  advanced: { es: "EDGE Advanced", en: "EDGE Advanced" },
  edge: { es: "Certificación EDGE", en: "EDGE Certification" },
};

const DESCRIPCION: Record<Tipo, Record<Estado, Bilingue>> = {
  asesoria: {
    final: {
      es: "Acompañamiento para obtener la Certificación Preliminar EDGE y, posteriormente, la Certificación Final EDGE post-construcción.",
      en: "Guidance to obtain the EDGE Preliminary Certification and, subsequently, the EDGE Post-Construction (Final) Certification.",
    },
    preliminar: {
      es: "Acompañamiento para obtener la Certificación Preliminar EDGE.",
      en: "Guidance to obtain the EDGE Preliminary Certification.",
    },
    "en-proceso-preliminar": {
      es: "Proyecto en proceso de obtención de la Certificación Preliminar EDGE.",
      en: "Project in the process of obtaining the EDGE Preliminary Certification.",
    },
    "en-proceso-final": {
      es: "Certificación Preliminar EDGE obtenida; Certificación Final EDGE post-construcción en proceso.",
      en: "EDGE Preliminary Certification obtained; EDGE Post-Construction (Final) Certification in progress.",
    },
    advanced: {
      es: "Acompañamiento EDGE; el proyecto alcanzó el nivel EDGE Advanced.",
      en: "EDGE guidance; the project reached the EDGE Advanced level.",
    },
    edge: {
      es: "Acompañamiento en el proceso de Certificación EDGE.",
      en: "Guidance throughout the EDGE certification process.",
    },
  },
  auditoria: {
    final: {
      es: "Auditoría de la etapa preliminar y Auditoría Final EDGE.",
      en: "Audit of the preliminary stage and EDGE Final Audit.",
    },
    preliminar: {
      es: "Auditoría de la etapa preliminar EDGE.",
      en: "Audit of the EDGE preliminary stage.",
    },
    "en-proceso-preliminar": {
      es: "Auditoría de la etapa preliminar EDGE en proceso.",
      en: "Audit of the EDGE preliminary stage in progress.",
    },
    "en-proceso-final": {
      es: "Auditoría preliminar EDGE realizada; Auditoría Final EDGE en proceso.",
      en: "EDGE preliminary audit completed; EDGE Final Audit in progress.",
    },
    advanced: {
      es: "Auditoría Final EDGE; el proyecto alcanzó la certificación EDGE Advanced con más del 40 % de ahorro energético.",
      en: "EDGE Final Audit; the project reached EDGE Advanced certification with over 40% energy savings.",
    },
    edge: {
      es: "Auditoría de la certificación EDGE.",
      en: "EDGE certification audit.",
    },
  },
};

export interface Servicio {
  id: string;
  orden: number;
  icono: string;
  titulo: Bilingue;
  resumen: Bilingue;
  descripcion: { es: string[]; en: string[] };
  beneficios: { es: string[]; en: string[] };
}

export interface Cliente {
  nombre: string;
  imagen: string | null;
}

// Normaliza cada proyecto: completa los textos derivados del estado.
export const proyectos: Proyecto[] = (proyectosData as ProyectoRaw[]).map(
  (p, i) => ({
    orden: i,
    tipo: p.tipo,
    nombre: p.nombre,
    ubicacion: p.ubicacion,
    cliente: p.cliente,
    estado: p.estado,
    imagen: p.imagen ?? null,
    destacado: p.destacado ?? false,
    internacional: p.internacional ?? false,
    estadoLabel: ESTADO_LABEL[p.estado],
    descripcion: DESCRIPCION[p.tipo][p.estado],
    nota: p.nota ?? null,
  })
);

export const servicios = (serviciosData as Servicio[]).sort(
  (a, b) => a.orden - b.orden
);
export const clientes = clientesData as Cliente[];

export const proyectosDestacados = proyectos.filter((p) => p.destacado);
export const proyectosNacionales = proyectos.filter((p) => !p.internacional);
export const proyectosInternacionales = proyectos.filter(
  (p) => p.internacional
);
export const clientesConLogo = clientes.filter((c) => c.imagen);

export function pick(value: Bilingue, lang: Lang): string {
  return value[lang];
}

// Estadísticas para los contadores de la home
export const stats = {
  proyectos: proyectos.length,
  asesorias: proyectos.filter((p) => p.tipo === "asesoria").length,
  auditorias: proyectos.filter((p) => p.tipo === "auditoria").length,
  certificacionesFinales: proyectos.filter(
    (p) => p.estado === "final" || p.estado === "advanced"
  ).length,
  clientes: clientes.length,
};
