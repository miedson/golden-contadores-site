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
          <a
            className="whatsapp-float"
            href={site.whatsappHref}
            target="_blank"
            rel="noreferrer"
            aria-label="Falar com a Golden Contadores pelo WhatsApp"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
              <path d="M20.52 3.48A11.9 11.9 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.95L0 24l6.33-1.67a11.84 11.84 0 0 0 5.73 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.42ZM12.07 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.76.99 1-3.67-.23-.38a9.85 9.85 0 0 1-1.52-5.25c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.12 1.03 6.99 2.91a9.82 9.82 0 0 1 2.9 6.98c0 5.45-4.44 9.9-9.88 9.9Zm5.43-7.42c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.48-.88-.78-1.48-1.74-1.65-2.04-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.67-1.62-.92-2.23-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.53.08-.8.38-.27.3-1.03 1-1.03 2.43 0 1.43 1.05 2.81 1.2 3 .15.2 2.07 3.16 5.02 4.43.7.3 1.25.48 1.68.61.71.22 1.35.19 1.86.11.56-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.43-.08-.13-.28-.2-.58-.35Z" />
            </svg>
          </a>
          <Footer />
        </div>
      </body>
    </html>
  );
}
