# Cómo actualizar el sitio

Guía rápida para **agregar proyectos o clientes** sin programar. Todo se edita
desde la web de GitHub; al guardar, el sitio se vuelve a publicar solo en
**1–2 minutos**.

> Los contadores de la portada (**Proyectos EDGE, Asesorías, Auditorías,
> Clientes**) se calculan **automáticamente** a partir de estas listas. No hay
> que actualizar ningún número a mano: al agregar un proyecto, la cifra sube
> sola.

---

## 1. Agregar un proyecto

Los proyectos viven en el archivo **`src/data/proyectos.json`**.

### Paso a paso

1. **Sube la foto** (si la tienes). Entra a la carpeta `public/images/` en
   GitHub → botón **Add file → Upload files** → arrastra la imagen.
   Usa un nombre sin espacios ni tildes, por ejemplo `Edificio-Aurora.jpg`.
2. Abre **`src/data/proyectos.json`** y haz clic en el lápiz ✏️ (*Edit*).
3. Copia un bloque existente (desde `{` hasta `}`) y pégalo, separándolo del
   anterior con una coma. Luego cambia los datos. Plantilla:

```json
  {
    "tipo": "auditoria",
    "nombre": "Edificio Aurora",
    "ubicacion": "San Borja",
    "cliente": "Constructora Ejemplo SAC",
    "estado": "preliminar",
    "imagen": "/images/Edificio-Aurora.jpg",
    "destacado": false,
    "internacional": false,
    "nota": null
  }
```

4. Abajo, escribe un mensaje breve (ej. *"Agrego Edificio Aurora"*) y
   **Commit changes**. ¡Listo!

### Qué significa cada campo

| Campo | Qué poner |
|---|---|
| `tipo` | `"asesoria"` (acompañamiento) o `"auditoria"` (verificación). |
| `nombre` | Nombre del proyecto. |
| `ubicacion` | Distrito, ciudad o país. |
| `cliente` | Nombre del cliente (deja `""` si no aplica). |
| `estado` | Uno de la tabla de abajo. **Define solo el texto del estado y la descripción** (se generan automáticamente). |
| `imagen` | `"/images/NOMBRE-DEL-ARCHIVO.jpg"`, o `null` si no hay foto. |
| `destacado` | `true` para que aparezca en la portada; si no, `false`. |
| `internacional` | `true` si es fuera del Perú (va a la sección "Proyectos internacionales"); si no, `false`. |
| `nota` | Un dato especial (ej. "Primero en su tipo"). Si no hay, pon `null`. Si hay, usa el formato bilingüe del ejemplo de abajo. |

### Valores válidos de `estado`

| `estado` | Se muestra como | Úsalo cuando… |
|---|---|---|
| `"preliminar"` | Certificación Preliminar EDGE | Se logró la certificación de diseño. |
| `"final"` | Certificación Final EDGE | Se logró la certificación post-construcción. |
| `"advanced"` | EDGE Advanced | Superó el 40 % de ahorro de energía. |
| `"en-proceso-preliminar"` | En proceso | Aún se está trabajando hacia la preliminar. |
| `"en-proceso-final"` | Certificación Final en proceso | Ya tiene la preliminar; la final está en curso. |
| `"edge"` | Certificación EDGE | Caso general / sin etapa específica. |

### Nota con dato especial (opcional)

Si el proyecto tiene un hito, reemplaza `"nota": null` por:

```json
    "nota": {
      "es": "Texto en español del dato especial.",
      "en": "English text of the highlight."
    }
```

---

## 2. Agregar un cliente

Los logos de clientes están en **`src/data/clientes.json`**. Sube primero el
logo a `public/images/` (idealmente PNG con fondo transparente) y agrega:

```json
  { "nombre": "Constructora Ejemplo SAC", "imagen": "/images/Logo-Ejemplo.png" }
```

Si aún no hay logo, usa `"imagen": null` (no se mostrará, pero igual cuenta).

---

## 3. Consejos para no romper el archivo

El formato es **JSON** y es estricto con la puntuación:

- Cada bloque de proyecto va entre **llaves `{ }`** y se separa del siguiente
  con una **coma**.
- El **último** bloque de la lista **no** lleva coma después de su `}`.
- Los textos van entre **comillas dobles** `" "`. Nunca uses comillas “curvas”.
- `true`, `false` y `null` van **sin** comillas.

Si algo se ve raro tras publicar, lo más probable es una coma de más o de
menos. Puedes pegar el contenido en <https://jsonlint.com> para que te diga
exactamente en qué línea está el error.

> ¿Dudas? Pídele ayuda a Carlos: cualquier cambio queda guardado en el
> historial de GitHub y siempre se puede revertir.
