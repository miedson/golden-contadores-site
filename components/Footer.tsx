import Image from "next/image";
import Link from "next/link";

import { navItems, site, socialLinks } from "@/components/site-data";

function SocialIcon({ name }: { name: string }) {
  if (name === "Instagram") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none">
        <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M13.64 20v-6.67h2.24l.34-2.6h-2.58V9.07c0-.75.2-1.27 1.29-1.27H16V5.48c-.18-.03-.8-.08-1.52-.08-2.26 0-3.8 1.38-3.8 3.93v1.4H8.13v2.6h2.55V20h2.96Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="section" style={{ paddingBottom: 0, paddingTop: 0 }}>
      <div style={{ background: "#232530", color: "white", padding: "2.5rem 0 1rem" }}>
        <div className="container">
          <div
            className="footer-grid"
            style={{
              display: "grid",
              gap: "2rem",
              gridTemplateColumns: "1.2fr 1fr 1fr 1fr 0.8fr",
              alignItems: "start"
            }}
          >
            <div>
              <Image
                src="/golden-contadores-enhanced-transparent.svg"
                alt="Golden Contadores"
                width={180}
                height={182}
                style={{ width: "132px", height: "auto", objectFit: "contain" }}
              />
              <p
                style={{
                  marginTop: "0.95rem",
                  color: "rgba(255,255,255,0.76)",
                  lineHeight: 1.7,
                  maxWidth: "16rem"
                }}
              >
                Transforme sua gestão financeira com uma estrutura contábil consultiva, clara e
                mais próxima da realidade da sua empresa.
              </p>
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: "0.9rem" }}>Site</div>
              <div style={{ display: "grid", gap: "0.65rem", color: "rgba(255,255,255,0.8)" }}>
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    {item.label}
                  </Link>
                ))}
                <span>Contabilidade</span>
                <span>Abertura de Empresa</span>
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: "0.9rem" }}>Segmentos</div>
              <div style={{ display: "grid", gap: "0.65rem", color: "rgba(255,255,255,0.8)" }}>
                <span>Comércio e Varejo</span>
                <span>Imposto de Renda PF</span>
                <span>MEI e Simples Nacional</span>
                <span>Prestadores de Serviço</span>
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: "0.9rem" }}>Institucional</div>
              <div style={{ display: "grid", gap: "0.65rem", color: "rgba(255,255,255,0.8)" }}>
                <span>Política de Privacidade</span>
                <span>Sobre Nós</span>
                <span>Contato</span>
                <span>Termos de Uso</span>
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: "0.9rem" }}>Redes</div>
              <div style={{ display: "grid", gap: "0.65rem", color: "rgba(255,255,255,0.8)" }}>
                <a href={`tel:${site.phone.replace(/\D/g, "")}`}>{site.phone}</a>
                <a href={`mailto:${site.email}`}>{site.email}</a>
                {socialLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${item.name} da Golden Contadores, abre em nova aba`}
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem" }}
                  >
                    <span
                      style={{
                        width: "1.8rem",
                        height: "1.8rem",
                        display: "grid",
                        placeItems: "center",
                        borderRadius: "999px",
                        border: "1px solid rgba(255,255,255,0.16)"
                      }}
                    >
                      <SocialIcon name={item.name} />
                    </span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "2rem",
              paddingTop: "1rem",
              borderTop: "1px solid rgba(255,255,255,0.14)",
              textAlign: "center",
              color: "rgba(255,255,255,0.76)",
              fontSize: "0.92rem"
            }}
          >
            © Copyright 2025 - Golden Contadores - Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
