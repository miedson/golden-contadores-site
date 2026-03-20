import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Golden Contadores",
    short_name: "Golden",
    description:
      "Contabilidade estratégica, planejamento tributário e suporte consultivo para empresas.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f8fc",
    theme_color: "#183a8f",
    lang: "pt-BR",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  };
}
