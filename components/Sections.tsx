import Image from "next/image";
import Link from "next/link";

import { moreServicesCard, sectors, services, site } from "@/components/site-data";

export function DifferentialsSection() {
  return (
    <section className="section" aria-labelledby="diferenciais-titulo">
      <div className="container" style={{ paddingTop: "0.8rem" }}>
        <span className="eyebrow">Diferenciais</span>
        <h2 id="diferenciais-titulo" className="section-title" style={{ maxWidth: "18ch", marginTop: "0.8rem" }}>
          Sua contabilidade para crescer com segurança
        </h2>
        <p className="section-copy" style={{ maxWidth: "42rem" }}>
          Simplificamos sua gestão financeira, reduzimos impostos legalmente e ajudamos seu negócio
          a prosperar com eficiência.
        </p>
      </div>

      <div
        className="container"
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          marginTop: "1.4rem"
        }}
      >
        {[
          "Atendimento próximo e linguagem simples",
          "Planejamento tributário com visão prática",
          "Organização financeira para ganhar previsibilidade",
          "Implantação rápida e suporte contínuo"
        ].map((item) => (
          <div key={item} className="card" style={{ padding: "1.2rem", minHeight: "156px" }}>
            <div
              style={{
                width: "2.4rem",
                height: "2.4rem",
                borderRadius: "999px",
                background: "var(--navy-soft)",
                color: "white",
                display: "grid",
                placeItems: "center",
                fontWeight: 800
              }}
            >
              +
            </div>
            <strong style={{ display: "block", marginTop: "0.85rem", fontSize: "1.02rem", lineHeight: 1.32 }}>
              {item}
            </strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ServicesPreview() {
  return (
    <section className="section section-dark" aria-labelledby="solucoes-titulo">
      <div className="container" style={{ width: "min(1280px, calc(100% - 1.5rem))" }}>
        <div style={{ textAlign: "center", paddingTop: "0.8rem" }}>
          <span className="eyebrow" style={{ background: "rgba(255,255,255,0.12)", color: "white" }}>
            Soluções
          </span>
          <h2 id="solucoes-titulo" className="section-title" style={{ marginInline: "auto", maxWidth: "18ch", marginTop: "0.8rem" }}>
            Escolha uma contabilidade estratégica que faz a diferença no seu negócio
          </h2>
          <p
            style={{
              maxWidth: "48rem",
              margin: "0 auto",
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.5,
              fontSize: "1rem"
            }}
          >
            A Golden oferece soluções contábeis inovadoras e eficientes, integrando planejamento
            tributário e atendimento personalizado para o sucesso do seu empreendimento.
          </p>
        </div>

        <div className="services-grid" style={{ marginTop: "1.8rem", gap: "0.85rem" }}>
          {services.map((service) => (
            <article
              key={service.title}
              className="service-card"
              style={{
                borderRadius: "24px",
                minHeight: "100%",
                boxShadow: "0 18px 40px rgba(0,0,0,0.1)",
                background: "rgba(255,255,255,0.98)",
                color: "var(--text)",
                border: "1px solid rgba(212,165,69,0.22)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                <div
                  className="service-badge"
                  style={{
                    background: "#ffffff",
                    color: "var(--gold-deep)",
                    border: "1px solid rgba(212,165,69,0.18)",
                    flexShrink: 0
                  }}
                >
                  <div
                    style={{
                      width: "0.8rem",
                      height: "0.8rem",
                      borderRadius: "999px",
                      background: "currentColor",
                      opacity: 0.9
                    }}
                  />
                </div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "1.08rem",
                    lineHeight: 1.18,
                    color: "var(--navy-soft)"
                  }}
                >
                  {service.title}
                </h3>
              </div>
              <p
                style={{
                  marginTop: "0.95rem",
                  color: "var(--muted)",
                  lineHeight: 1.55,
                  fontSize: "0.95rem"
                }}
              >
                {service.text}
              </p>
            </article>
          ))}

          <article
            className="service-card"
            style={{
              borderRadius: "24px",
              minHeight: "100%",
              boxShadow: "0 18px 40px rgba(0,0,0,0.1)",
              background: "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.06) 100%)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.12)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <div
                className="service-badge"
                style={{
                  background: "white",
                  color: "var(--navy-soft)",
                  border: "1px solid rgba(255,255,255,0.24)",
                  flexShrink: 0
                }}
              >
                <div style={{ fontSize: "1.35rem", fontWeight: 700, lineHeight: 1 }}>+</div>
              </div>
              <h3
                style={{
                  margin: 0,
                  fontSize: "1.08rem",
                  lineHeight: 1.18,
                  color: "white"
                }}
              >
                {moreServicesCard.title}
              </h3>
            </div>
            <p
              style={{
                marginTop: "0.95rem",
                color: "rgba(255,255,255,0.76)",
                lineHeight: 1.55,
                fontSize: "0.95rem"
              }}
            >
              {moreServicesCard.text}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

export function TeamPhotoSection() {
  return (
    <section className="section" aria-labelledby="sobre-golden-titulo">
      <div
        className="container"
        style={{
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          alignItems: "center",
          paddingTop: "0.8rem"
        }}
      >
        <div>
          <span className="eyebrow">Sobre a Golden</span>
          <h2 id="sobre-golden-titulo" className="section-title" style={{ maxWidth: "18ch", marginTop: "0.8rem" }}>
            Estrutura, proximidade e visão de crescimento para o seu negócio.
          </h2>
          <p className="section-copy">
            Nossa equipe reúne experiência contábil, fiscal, trabalhista e financeira para entregar
            uma operação organizada, segura e mais alinhada às necessidades reais da empresa.
          </p>
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              marginTop: "1.15rem"
            }}
          >
            {[
              "Equipe especializada",
              "Atendimento humanizado",
              "Resposta rápida",
              "Acompanhamento consultivo"
            ].map((item) => (
              <div
                key={item}
                className="card"
                style={{ padding: "0.9rem 1rem", boxShadow: "none", fontWeight: 700, fontSize: "0.96rem" }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: "0.9rem" }}>
          <div style={{ overflow: "hidden", borderRadius: "18px" }}>
            <Image
              src="/team-golden.jpg"
              alt="Equipe da Golden Contadores reunida no escritório"
              width={1280}
              height={960}
              priority
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectorsSection() {
  return (
    <section className="section section-band" aria-labelledby="especialidades-titulo">
      <div className="container" style={{ paddingTop: "0.8rem" }}>
        <div style={{ textAlign: "center" }}>
          <span className="eyebrow">Especialidades</span>
          <h2 id="especialidades-titulo" className="section-title" style={{ marginInline: "auto", maxWidth: "18ch", marginTop: "0.8rem" }}>
            Atendimento adaptado a diferentes perfis de empresa.
          </h2>
        </div>
        <div
          className="grid"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", marginTop: "1.35rem" }}
        >
          {sectors.map((sector) => (
            <div
              key={sector}
              className="card"
              style={{
                padding: "1rem 1.1rem",
                textAlign: "center",
                fontWeight: 700,
                fontSize: "0.96rem",
                borderRadius: "999px"
              }}
            >
              {sector}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaSection() {
  return (
    <section className="section" aria-labelledby="contato-titulo" style={{ paddingTop: "1.2rem" }}>
      <div
        className="container card"
        style={{
          padding: "1.85rem",
          background: "linear-gradient(135deg, #1f222b 0%, #183a8f 75%, #d4a545 160%)",
          color: "white"
        }}
      >
        <div className="contact-panel">
          <div>
            <span className="eyebrow" style={{ background: "rgba(255,255,255,0.12)", color: "white" }}>
              Contato
            </span>
            <h2 id="contato-titulo" style={{ margin: "0.8rem 0 0.45rem", fontSize: "clamp(1.95rem, 4.4vw, 3.75rem)", lineHeight: 0.93, maxWidth: "18ch" }}>
              Transforme a gestão financeira do seu negócio com a Golden
            </h2>
            <p style={{ margin: 0, maxWidth: "39rem", lineHeight: 1.5, color: "rgba(255,255,255,0.76)", fontSize: "1rem" }}>
              Nossa equipe está pronta para oferecer suporte e soluções sob medida para as
              necessidades da sua empresa.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gap: "0.9rem",
              alignContent: "start",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "20px",
              padding: "1rem"
            }}
          >
            <a href={`tel:${site.phone.replace(/\D/g, "")}`} style={{ color: "rgba(255,255,255,0.72)" }}>
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} style={{ color: "rgba(255,255,255,0.72)" }}>
              {site.email}
            </a>
            <div style={{ color: "rgba(255,255,255,0.72)" }}>{site.address}</div>
            <Link
              className="button button-secondary"
              href={site.whatsappHref}
              target="_blank"
              rel="noreferrer"
              aria-label={`${site.ctaLabel} pelo WhatsApp, abre em nova aba`}
            >
              {site.ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
