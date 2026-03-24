"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { navItems, site, socialLinks } from "@/components/site-data";

function SocialIcon({ name }: { name: string }) {
  if (name === "Instagram") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none">
        <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M13.64 20v-6.67h2.24l.34-2.6h-2.58V9.07c0-.75.2-1.27 1.29-1.27H16V5.48c-.18-.03-.8-.08-1.52-.08-2.26 0-3.8 1.38-3.8 3.93v1.4H8.13v2.6h2.55V20h2.96Z" />
    </svg>
  );
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("drawer-open", isOpen);
    document.documentElement.classList.toggle("drawer-open", isOpen);

    return () => {
      document.body.classList.remove("drawer-open");
      document.documentElement.classList.remove("drawer-open");
    };
  }, [isOpen]);

  return (
    <header className="site-header" style={{ zIndex: 20, backdropFilter: "blur(18px)" }}>
      <div className="topbar">
        <div className="container topbar-inner">
          <div className="topbar-contact" style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap" }}>
            <a href={`tel:${site.phone.replace(/\D/g, "")}`}>{site.phone}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <div className="topbar-meta" style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <span>{site.address}</span>
            <div className="topbar-socials" aria-label="Redes sociais" style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
              {socialLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${item.name} da Golden Contadores, abre em nova aba`}
                  style={{
                    display: "grid",
                    placeItems: "center",
                    color: "white",
                    opacity: 0.9,
                    minWidth: "1.7rem",
                    minHeight: "1.7rem"
                  }}
                >
                  <SocialIcon name={item.name} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        className="header-shell"
        style={{
          borderBottom: "1px solid rgba(24, 58, 143, 0.08)",
          background: "rgba(255, 255, 255, 0.92)"
        }}
      >
        <div
          className={`container header-main${isOpen ? " is-open" : ""}`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            minHeight: "4.2rem",
            flexWrap: "wrap",
            padding: "0.45rem 0"
          }}
        >
          <Link className="header-logo" href="#inicio" style={{ display: "flex", alignItems: "center", gap: "0.9rem" }} onClick={() => setIsOpen(false)}>
            <Image
              src="/logo_only_dourado.svg"
              alt="Golden Contadores"
              width={180}
              height={182}
              priority
              style={{ width: "80px", height: "auto", objectFit: "contain" }}
            />
          </Link>

          <button
            type="button"
            className="header-toggle"
            aria-expanded={isOpen}
            aria-controls="header-drawer"
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setIsOpen((current) => !current)}
          >
            <span className="line-1" />
            <span className="line-2" />
            <span className="line-3" />
          </button>

          <nav
            id="header-nav"
            className="header-nav"
            aria-label="Navegação principal"
            style={{ display: "flex", flexWrap: "wrap", gap: "1.35rem", alignItems: "center" }}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                style={{ color: "var(--text)", fontSize: "0.95rem", fontWeight: 600, opacity: 0.95 }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            className="button button-primary header-cta"
            href="#contato"
            onClick={() => setIsOpen(false)}
            style={{ paddingInline: "1.1rem", minHeight: "2.45rem", fontSize: "0.92rem" }}
          >
            {site.ctaLabel}
          </Link>
        </div>

        <div
          className={`header-drawer-backdrop${isOpen ? " is-open" : ""}`}
          onClick={() => setIsOpen(false)}
          aria-hidden={isOpen ? "false" : "true"}
        />
        <aside
          id="header-drawer"
          className={`header-drawer${isOpen ? " is-open" : ""}`}
          aria-label="Menu móvel"
          aria-hidden={isOpen ? "false" : "true"}
        >
          <div className="header-drawer-inner">
            <div className="header-drawer-top">
              <Link href="#inicio" className="header-drawer-logo" onClick={() => setIsOpen(false)}>
                <Image
                  src="/logo_only_dourado.svg"
                  alt="Golden Contadores"
                  width={180}
                  height={182}
                  priority
                  style={{ width: "80px", height: "auto", objectFit: "contain" }}
                />
              </Link>
              <button
                type="button"
                className="header-drawer-close"
                aria-label="Fechar menu"
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>
            </div>

            <nav className="header-drawer-nav" aria-label="Navegação principal mobile">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  style={{ color: "var(--text)", fontSize: "1rem", fontWeight: 600 }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </header>
  );
}
