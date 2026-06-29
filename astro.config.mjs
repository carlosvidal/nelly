// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const SITE = "https://arquitectanelly.cuneo.com.pe";

// https://astro.build/config
export default defineConfig({
  site: SITE,
  trailingSlash: "ignore",
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "es",
        locales: {
          es: "es-PE",
          en: "en",
        },
      },
    }),
  ],
});
