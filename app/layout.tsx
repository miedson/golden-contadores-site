import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/components/site-data";

import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://goldencontadores.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | Contabilidade estratégica em São Luís - MA`,
    template: `%s | ${site.name}`
  },
  description:
    "Golden Contadores oferece contabilidade estratégica, planejamento tributário, abertura de empresa, departamento pessoal e suporte consultivo para empresas em São Luís e atendimento nacional.",
  keywords: [
    "contabilidade em São Luís",
    "contabilidade estratégica",
    "planejamento tributário",
    "abertura de empresa",
    "departamento pessoal",
    "contador em São Luís",
    "Golden Contadores"
  ],
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  category: "business",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} | Contabilidade estratégica em São Luís - MA`,
    description:
      "Contabilidade estratégica, fiscal, societária e trabalhista para empresas que querem crescer com segurança.",
    images: [
      {
        url: "/golden-contadores-enhanced-transparent.svg",
        width: 512,
        height: 512,
        alt: "Logo da Golden Contadores"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Contabilidade estratégica em São Luís - MA`,
    description:
      "Contabilidade estratégica, fiscal, societária e trabalhista para empresas que querem crescer com segurança.",
    images: ["/golden-contadores-enhanced-transparent.svg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <a className="skip-link" href="#conteudo-principal">
          Pular para o conteúdo principal
        </a>
        <div className="page-shell">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
