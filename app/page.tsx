import {
  CtaSection,
  DifferentialsSection,
  ReviewsSection,
  SectorsSection,
  ServicesPreview,
  TeamPhotoSection
} from "@/components/Sections";
import { Hero } from "@/components/Hero";
import { services, site, socialLinks } from "@/components/site-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://goldencontadores.com.br";
export const revalidate = 300;

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: site.name,
    url: siteUrl,
    email: site.email,
    telephone: site.phone,
    areaServed: "Brasil",
    address: {
      "@type": "PostalAddress",
      addressLocality: "São Luís",
      addressRegion: "MA",
      addressCountry: "BR"
    },
    sameAs: socialLinks.map((item) => item.href),
    serviceType: services.map((item) => item.title),
    description:
      "Contabilidade estratégica, planejamento tributário, abertura de empresa, departamento pessoal e suporte consultivo para empresas."
  };

  return (
    <main id="conteudo-principal" tabIndex={-1}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div id="inicio">
        <Hero />
      </div>
      <div id="solucoes">
        <ServicesPreview />
      </div>
      <div id="diferenciais">
        <DifferentialsSection />
      </div>
      <div id="equipe">
        <TeamPhotoSection />
      </div>
      <SectorsSection />
      <ReviewsSection />
      <div id="contato">
        <CtaSection />
      </div>
    </main>
  );
}
