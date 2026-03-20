"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { pillars, stats } from "@/components/site-data";

const heroTextBg =
  "https://images.pexels.com/photos/8837747/pexels-photo-8837747.jpeg?cs=srgb&dl=pexels-yankrukov-8837747.jpg&fm=jpg";
const heroTextBgAlternative =
  "https://images.pexels.com/photos/8424482/pexels-photo-8424482.jpeg";

function parseStatValue(value: string) {
  const numeric = Number.parseInt(value.replace(/\D/g, ""), 10);

  return {
    prefix: value.startsWith("+") ? "+" : "",
    suffix: value.endsWith("%") ? "%" : value.endsWith("h") ? "h" : "",
    target: Number.isNaN(numeric) ? 0 : numeric
  };
}

function AnimatedStat({ value, label, trigger }: { value: string; label: string; trigger: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const parsed = useMemo(() => parseStatValue(value), [value]);

  useEffect(() => {
    if (!trigger) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      const reducedMotionFrame = window.requestAnimationFrame(() => {
        setDisplayValue(parsed.target);
      });

      return () => window.cancelAnimationFrame(reducedMotionFrame);
    }

    let frameId = 0;
    const duration = 1300;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(parsed.target * eased));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [parsed.target, trigger]);

  return (
    <div
      className="card"
      style={{
        padding: "0.8rem 0.9rem",
        boxShadow: "none",
        background: "rgba(255,255,255,0.95)",
        border: "1px solid rgba(43, 76, 178, 0.1)"
      }}
    >
      <div
        aria-label={`${parsed.prefix}${parsed.target}${parsed.suffix} ${label}`}
        style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--navy-soft)" }}
      >
        {parsed.prefix}
        {displayValue}
        {parsed.suffix}
      </div>
      <div
        style={{
          marginTop: "0.15rem",
          fontSize: "0.84rem",
          color: "rgba(29, 36, 54, 0.76)"
        }}
      >
        {label}
      </div>
    </div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [animationCycle, setAnimationCycle] = useState(0);
  const wasVisibleRef = useRef(false);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !wasVisibleRef.current) {
          wasVisibleRef.current = true;
          setAnimationCycle((current) => current + 1);
        }

        if (!entry.isIntersecting) {
          wasVisibleRef.current = false;
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section aria-labelledby="hero-titulo" className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
      <div
        ref={sectionRef}
        style={{
          position: "relative",
          width: "100%",
          minHeight: "560px",
          overflow: "hidden",
          background: "#eef2fb"
        }}
      >
        <Image
          src={heroTextBgAlternative || heroTextBg}
          alt="Profissional utilizando tablet em escritório"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.985) 0%, rgba(255,255,255,0.95) 24%, rgba(255,255,255,0.78) 42%, rgba(255,255,255,0.26) 66%, rgba(255,255,255,0.12) 100%)"
          }}
        />

        <div
          className="container"
          style={{
            position: "relative",
            zIndex: 1,
            minHeight: "560px",
            display: "flex",
            alignItems: "center",
            paddingBlock: "1.35rem"
          }}
        >
          <div style={{ width: "min(100%, 720px)" }}>
            <span className="eyebrow">Contabilidade estratégica para empresas</span>
            <h1
              id="hero-titulo"
              className="section-title"
              style={{
                maxWidth: "9.2ch",
                marginTop: "0.8rem",
                fontSize: "clamp(1.95rem, 4.4vw, 3.75rem)",
                lineHeight: 0.93
              }}
            >
              Elevando padrões, <span className="split-highlight">superando expectativas</span>
            </h1>
            <p
              className="section-copy"
              style={{
                maxWidth: "42rem",
                marginTop: "0.7rem",
                fontSize: "1rem",
                lineHeight: 1.5,
                color: "rgba(29, 36, 54, 0.78)"
              }}
            >
              Seja nosso cliente e mude o jogo sendo nosso parceiro. Atendemos os departamentos
              essenciais da empresa com visão estratégica, organização e proximidade no atendimento.
            </p>

            <div style={{ display: "grid", gap: "0.45rem", marginTop: "0.85rem", maxWidth: "42rem" }}>
              {pillars.map((pillar) => (
                <div key={pillar.title} style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: "0.78rem",
                      height: "0.78rem",
                      borderRadius: "999px",
                      background: "var(--navy-soft)",
                      marginTop: "0.42rem",
                      flexShrink: 0
                    }}
                  />
                  <div>
                    <strong
                      style={{
                        display: "block",
                        marginBottom: "0.08rem",
                        fontSize: "0.96rem",
                        color: "rgba(29, 36, 54, 0.96)"
                      }}
                    >
                      {pillar.title}
                    </strong>
                    <span
                      style={{
                        color: "rgba(29, 36, 54, 0.72)",
                        lineHeight: 1.45,
                        fontSize: "0.95rem"
                      }}
                    >
                      {pillar.text}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="hero-actions" style={{ display: "flex", gap: "0.75rem", flexWrap: "nowrap", marginTop: "1rem" }}>
              <Link className="button button-primary hero-action-button" href="#contato" style={{ whiteSpace: "nowrap", minHeight: "2.9rem", paddingInline: "1.25rem" }}>
                Fale com um especialista
              </Link>
              <Link className="button button-secondary hero-action-button" href="#solucoes" style={{ whiteSpace: "nowrap", minHeight: "2.9rem", paddingInline: "1.25rem" }}>
                Conheça nossos serviços
              </Link>
            </div>

            <div
              className="hero-stats"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: "0.6rem",
                marginTop: "1rem",
                maxWidth: "52rem"
              }}
            >
              {stats.map((item) => (
                <AnimatedStat
                  key={`${item.label}-${animationCycle}`}
                  value={item.value}
                  label={item.label}
                  trigger={animationCycle}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
