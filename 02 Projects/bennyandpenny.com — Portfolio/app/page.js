"use client";

import React, { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────
//  Hamilton Pinto Jr. — Portfolio homepage (bennyandpenny.com)
//  Editorial / premium register (ref: acc.capital, xbeton.com)
//  Palette:  ink #14110E · espresso #3A2E25 · cream #EFE9DD · bone #F7F3EA
//            brass #B08544 (accent, used sparingly) · book-pop per tile
//  Type:     Display = serif (Georgia stack, tight) · Body/UI = system sans
// ─────────────────────────────────────────────────────────────────────────

const COLORS = {
  ink: "#14110E",
  espresso: "#3A2E25",
  cream: "#EFE9DD",
  bone: "#F7F3EA",
  brass: "#B08544",
  line: "rgba(239,233,221,0.14)",
};

const SERIF = `"Hoefler Text", "Iowan Old Style", Georgia, "Times New Roman", serif`;
const SANS = `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`;

// ── Portfolio data — the work speaks; imprint is one wing among many ───────
const PROJECTS = [
  {
    id: "xbeton",
    eyebrow: "Construction Technology",
    title: "XBeton",
    blurb:
      "Commerce + agent-onboarding platform for an AAC and nano-graphene building-systems company. Architecture, API integration, and go-to-market systems.",
    role: "Platform architecture · Integrations",
    pop: "#5B7B7A",
    span: "wide",
    url: "https://www.xbeton.com/",
  },
  {
    id: "aff",
    eyebrow: "Financial Services",
    title: "Advantage First Financial",
    blurb:
      "Lead-capture, compliance, and sales-performance infrastructure for a debt-resolution firm, built and supported end to end.",
    role: "Systems · Compliance · BI",
    pop: "#3E5C8A",
    span: "tall",
    url: "https://www.advantagefirst.com/",
  },
  {
    id: "benny-penny",
    eyebrow: "Publishing Imprint",
    title: "Benny & Penny's Adventures",
    blurb:
      "An original children's book series, and the launch of a self-owned publishing imprint. Brand, web, and production pipeline.",
    role: "Founder · Publisher · Design",
    pop: "#E0612F",
    isImprint: true,
    span: "normal",
    url: "https://www.bennyandpennyadventures.com/",
  },
  {
    id: "mercury",
    eyebrow: "Communications",
    title: "Mercury Call Desk",
    blurb:
      "AI-powered communications platform. Pricing, quoting, telephony, and billing systems for high-volume outbound teams.",
    role: "Product · Architecture",
    pop: "#7A6CA8",
    span: "normal",
    url: "https://mercurycalldesk.com/",
  },
  {
    id: "brands",
    eyebrow: "Brand & Launch",
    title: "60+ Establishments",
    blurb:
      "Restaurants, law firms, medical practices, and professional-service organizations opened and supported across Southern California.",
    role: "Visual communications · Web",
    pop: "#B08544",
    span: "wide",
  },
];

// ── Ventures / backlinks — surfaced in the footer (all dofollow) ──────────
const VENTURES = [
  { label: "ACC", url: "https://acc.capital/" },
  { label: "Advantage First Financial", url: "https://www.advantagefirst.com/" },
  { label: "Benny & Penny's Adventures", url: "https://www.bennyandpennyadventures.com/" },
  { label: "XBeton", url: "https://www.xbeton.com/" },
  { label: "Mercury Call Desk", url: "https://mercurycalldesk.com/" },
];

// Capabilities · stack · identity — the marquee that scrolls under the hero
const CLIENTS = [
  "Software Architecture",
  "API Integration",
  "Brand & Design",
  "Consultation",
  "Visionary",
  "Pioneer",
  "Publisher",
];

// ── Small hook: reveal-on-scroll ──────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setShown(true),
      { threshold: 0.18 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, shown];
}

// ── The signature element: a stacked-book glyph drawn in SVG ──────────────
// Spines fan slightly; the top spine carries the lone accent color.
function BookStack({ accent }) {
  return (
    <svg
      viewBox="0 0 120 150"
      width="100%"
      height="100%"
      role="img"
      aria-label="Stacked books"
      style={{ display: "block" }}
    >
      <g transform="rotate(-4 60 120)">
        <rect x="18" y="112" width="84" height="16" rx="2" fill={COLORS.espresso} />
        <rect x="18" y="112" width="6" height="16" fill={COLORS.ink} opacity="0.5" />
      </g>
      <g transform="rotate(3 60 100)">
        <rect x="22" y="92" width="80" height="15" rx="2" fill="#4E3E32" />
        <rect x="22" y="92" width="6" height="15" fill={COLORS.ink} opacity="0.45" />
      </g>
      <g transform="rotate(-2 60 80)">
        <rect x="20" y="72" width="82" height="15" rx="2" fill={accent} />
        <rect x="20" y="72" width="6" height="15" fill="#000" opacity="0.18" />
      </g>
      <g transform="translate(60 18)">
        <path d="M0 0 L30 8 L30 64 L0 58 Z" fill="#5A4838" />
        <path d="M0 0 L-30 8 L-30 64 L0 58 Z" fill="#6B5645" />
        <path d="M0 6 L0 58" stroke={COLORS.ink} strokeWidth="1.5" opacity="0.4" />
        <path
          d="M-26 12 L-6 17 M-26 22 L-6 27 M-26 32 L-6 37"
          stroke={COLORS.cream}
          strokeWidth="1.4"
          opacity="0.35"
        />
      </g>
    </svg>
  );
}

export default function PortfolioHome() {
  const [navSolid, setNavSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [workRef, workShown] = useReveal();
  const [aboutRef, aboutShown] = useReveal();

  return (
    <div
      style={{
        background: COLORS.bone,
        color: COLORS.ink,
        fontFamily: SANS,
        minHeight: "100vh",
        WebkitFontSmoothing: "antialiased",
        overflowX: "hidden",
      }}
    >
      <style>{`
        a { text-decoration: none; color: inherit; }
        .hp-link { position: relative; }
        .hp-link::after {
          content: ""; position: absolute; left: 0; bottom: -4px;
          width: 100%; height: 1px; background: currentColor;
          transform: scaleX(0); transform-origin: right;
          transition: transform .4s cubic-bezier(.2,.8,.2,1);
        }
        .hp-link:hover::after { transform: scaleX(1); transform-origin: left; }

        .reveal { opacity: 0; transform: translateY(22px);
          transition: opacity .9s ease, transform .9s cubic-bezier(.2,.8,.2,1); }
        .reveal.in { opacity: 1; transform: none; }

        .tile { position: relative; overflow: hidden; cursor: pointer;
          background: ${COLORS.ink}; color: ${COLORS.cream};
          border: 1px solid ${COLORS.line}; min-height: 280px;
          display: flex; flex-direction: column; justify-content: flex-end;
          transition: transform .5s cubic-bezier(.2,.8,.2,1); }
        .tile:hover { transform: translateY(-6px); }
        .tile .pop { position: absolute; inset: 0; opacity: 0;
          transition: opacity .5s ease; mix-blend-mode: normal; }
        .tile:hover .pop { opacity: 0.16; }
        .tile .arrow { transition: transform .45s cubic-bezier(.2,.8,.2,1); }
        .tile:hover .arrow { transform: translate(6px,-6px); }

        .imprint-tile { background: ${COLORS.bone}; color: ${COLORS.ink};
          border: 1px solid rgba(20,17,14,0.12); }

        @keyframes marquee { from { transform: translateX(0);} to { transform: translateX(-50%);} }
        .marquee-track { display: inline-flex; gap: 3.5rem; white-space: nowrap;
          animation: marquee 32s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
          .reveal { opacity: 1; transform: none; }
        }

        .grid {
          display: grid; gap: 1px;
          background: ${COLORS.line};
          grid-template-columns: repeat(6, 1fr);
          grid-auto-rows: 280px;
        }
        .span-wide { grid-column: span 4; }
        .span-tall { grid-column: span 2; grid-row: span 2; }
        .span-normal { grid-column: span 2; }
        @media (max-width: 860px) {
          .grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 240px; }
          .span-wide { grid-column: span 2; }
          .span-tall { grid-column: span 2; grid-row: span 1; }
          .span-normal { grid-column: span 1; }
        }
        @media (max-width: 540px) {
          .grid { grid-template-columns: 1fr; }
          .span-wide,.span-tall,.span-normal { grid-column: span 1; }
        }

        :focus-visible { outline: 2px solid ${COLORS.brass}; outline-offset: 3px; }
      `}</style>

      {/* ── NAV ─────────────────────────────────────────────────────── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: navSolid ? "14px 0" : "22px 0",
          background: navSolid ? "rgba(20,17,14,0.92)" : "transparent",
          backdropFilter: navSolid ? "blur(8px)" : "none",
          color: COLORS.cream,
          transition: "all .4s ease",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 clamp(20px,5vw,56px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <a
            href="#top"
            style={{
              fontFamily: SERIF,
              fontSize: 20,
              letterSpacing: "0.02em",
              fontWeight: 600,
              display: "flex",
              alignItems: "baseline",
              gap: 8,
            }}
          >
            Benny&nbsp;&amp;&nbsp;Penny&rsquo;s
            <span
              style={{
                fontFamily: SANS,
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                opacity: 0.6,
                fontWeight: 400,
              }}
            >
              A Tech Company
            </span>
          </a>

          <nav
            style={{
              display: "flex",
              gap: "2.4rem",
              fontSize: 13,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
            className="hp-desktop-nav"
          >
            <a className="hp-link" href="#work">Services</a>
            <a className="hp-link" href="#about">About</a>
            <a className="hp-link" href="#contact">Contact</a>
          </nav>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            className="hp-mobile-toggle"
            style={{
              display: "none",
              background: "none",
              border: "none",
              color: "inherit",
              fontSize: 13,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        {menuOpen && (
          <div
            style={{
              background: "rgba(20,17,14,0.97)",
              padding: "20px clamp(20px,5vw,56px) 28px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              fontSize: 15,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {[
              ["work", "Services"],
              ["about", "About"],
              ["contact", "Contact"],
            ].map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
          </div>
        )}
        <style>{`
          @media (max-width: 720px) {
            .hp-desktop-nav { display: none !important; }
            .hp-mobile-toggle { display: block !important; }
          }
        `}</style>
      </header>

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section
        id="top"
        style={{
          background: COLORS.ink,
          color: COLORS.cream,
          minHeight: "100vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          paddingTop: 90,
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "-10%",
            left: "-5%",
            width: "60vw",
            height: "60vw",
            maxWidth: 760,
            maxHeight: 760,
            background: `radial-gradient(circle, ${COLORS.brass}22 0%, transparent 62%)`,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 clamp(20px,5vw,56px)",
            display: "grid",
            gridTemplateColumns: "1.35fr 0.65fr",
            gap: "clamp(28px,5vw,72px)",
            alignItems: "center",
            width: "100%",
            position: "relative",
            zIndex: 2,
          }}
          className="hero-grid"
        >
          <div>
            <p
              style={{
                fontSize: 12.5,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: COLORS.brass,
                marginBottom: 28,
              }}
            >
              Software Architect · Creative Technologist · Publisher
            </p>
            <h1
              style={{
                fontFamily: SERIF,
                fontWeight: 600,
                fontSize: "clamp(2.6rem, 6.4vw, 5.4rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.015em",
                margin: 0,
                maxWidth: "16ch",
              }}
            >
              Vision, translated into{" "}
              <span style={{ fontStyle: "italic", color: COLORS.brass }}>
                real-world solutions.
              </span>
            </h1>
            <p
              style={{
                marginTop: 30,
                fontSize: "clamp(1rem,1.4vw,1.18rem)",
                lineHeight: 1.6,
                color: "rgba(239,233,221,0.74)",
                maxWidth: "52ch",
              }}
            >
              For two decades I&rsquo;ve built the systems behind brands, platforms,
              and ventures, pairing the eye of a designer with the discipline
              of a software architect. Now I&rsquo;m building my own.
            </p>
            <div
              style={{
                marginTop: 40,
                display: "flex",
                gap: 18,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <a
                href="#work"
                style={{
                  background: COLORS.cream,
                  color: COLORS.ink,
                  padding: "15px 30px",
                  fontSize: 13,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                View services
              </a>
              <a
                href="#contact"
                className="hp-link"
                style={{
                  fontSize: 13,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: COLORS.cream,
                }}
              >
                Get in touch
              </a>
            </div>
          </div>

          <div
            className="hero-glyph"
            style={{
              height: "min(46vh, 380px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "min(60%, 220px)" }}>
              <BookStack accent={COLORS.brass} />
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(239,233,221,0.5)",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          Scroll
          <span
            style={{
              display: "inline-block",
              width: 1,
              height: 30,
              background: "rgba(239,233,221,0.4)",
            }}
          />
        </div>
        <style>{`
          @media (max-width: 820px) {
            .hero-grid { grid-template-columns: 1fr !important; }
            .hero-glyph { display: none !important; }
          }
        `}</style>
      </section>

      {/* ── CLIENT MARQUEE ──────────────────────────────────────────── */}
      <section
        style={{
          background: COLORS.espresso,
          color: COLORS.cream,
          padding: "26px 0",
          overflow: "hidden",
          borderTop: `1px solid ${COLORS.line}`,
          borderBottom: `1px solid ${COLORS.line}`,
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div className="marquee-track">
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <span
                key={i}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "3.5rem",
                  fontFamily: SERIF,
                  fontSize: "clamp(1.1rem,2vw,1.6rem)",
                  opacity: 0.62,
                  fontWeight: 500,
                }}
              >
                {c}
                <span
                  aria-hidden
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: COLORS.brass,
                    opacity: 0.7,
                    flexShrink: 0,
                  }}
                />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORK ────────────────────────────────────────────────────── */}
      <section
        id="work"
        ref={workRef}
        className={`reveal ${workShown ? "in" : ""}`}
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "clamp(64px,9vw,120px) clamp(20px,5vw,56px)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 48,
          }}
        >
          <div>
            <p
              style={{
                fontSize: 12.5,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: COLORS.brass,
                marginBottom: 14,
              }}
            >
              Services
            </p>
            <h2
              style={{
                fontFamily: SERIF,
                fontWeight: 600,
                fontSize: "clamp(1.9rem,4vw,3rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
                margin: 0,
                maxWidth: "20ch",
              }}
            >
              One discipline, many registers.
            </h2>
          </div>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.6,
              color: "rgba(20,17,14,0.62)",
              maxWidth: "34ch",
            }}
          >
            From construction-tech platforms to a children&rsquo;s book imprint, the
            common thread is execution.
          </p>
        </div>

        <div className="grid">
          {PROJECTS.map((p) => {
            const Tag = p.url ? "a" : "article";
            const linkProps = p.url
              ? { href: p.url, target: "_blank", rel: "noopener" }
              : {};
            return (
              <Tag
                key={p.id}
                {...linkProps}
                className={`tile span-${p.span} ${p.isImprint ? "imprint-tile" : ""}`}
                style={{ padding: "clamp(20px,2.5vw,32px)" }}
                aria-label={p.url ? `${p.title} — opens in a new tab` : undefined}
              >
                {!p.isImprint && (
                  <div className="pop" style={{ background: p.pop }} aria-hidden />
                )}

                {p.isImprint && (
                  <>
                    <div
                      className="pop"
                      style={{ background: p.pop, opacity: 0.1 }}
                      aria-hidden
                    />
                    <div
                      aria-hidden
                      style={{
                        position: "absolute",
                        top: 18,
                        right: 18,
                        width: 52,
                        height: 68,
                        background: `linear-gradient(135deg, ${p.pop} 0%, #F2A35C 100%)`,
                        borderRadius: 3,
                        transform: "rotate(6deg)",
                        boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: SERIF,
                        fontSize: 18,
                        color: COLORS.bone,
                      }}
                    >
                      B&amp;P
                    </div>
                  </>
                )}

                <div
                  style={{
                    position: "relative",
                    zIndex: 2,
                    maxWidth: "100%",
                    paddingRight: p.isImprint ? 56 : 0,
                  }}
                >
                  <p
                    style={{
                      fontSize: 11.5,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: p.isImprint ? p.pop : COLORS.brass,
                      marginBottom: 10,
                    }}
                  >
                    {p.eyebrow}
                  </p>
                  <h3
                    style={{
                      fontFamily: SERIF,
                      fontSize:
                        p.span === "wide" ? "clamp(1.5rem,2.6vw,2.1rem)" : "1.4rem",
                      fontWeight: 600,
                      margin: "0 0 10px",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    {p.title}
                    {p.url && (
                      <span className="arrow" style={{ fontSize: "0.8em", opacity: 0.7 }}>
                        ↗
                      </span>
                    )}
                  </h3>
                  <p
                    style={{
                      fontSize: 13.5,
                      lineHeight: 1.55,
                      color: p.isImprint
                        ? "rgba(20,17,14,0.66)"
                        : "rgba(239,233,221,0.66)",
                      margin: "0 0 14px",
                      maxWidth: "42ch",
                    }}
                  >
                    {p.blurb}
                  </p>
                  <p
                    style={{
                      fontSize: 11.5,
                      letterSpacing: "0.04em",
                      color: p.isImprint
                        ? "rgba(20,17,14,0.45)"
                        : "rgba(239,233,221,0.45)",
                    }}
                  >
                    {p.role}
                  </p>
                </div>
              </Tag>
            );
          })}
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────────────────── */}
      <section
        id="about"
        ref={aboutRef}
        className={`reveal ${aboutShown ? "in" : ""}`}
        style={{ background: COLORS.ink, color: COLORS.cream }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "clamp(64px,9vw,120px) clamp(20px,5vw,56px)",
            display: "grid",
            gridTemplateColumns: "0.9fr 1.1fr",
            gap: "clamp(32px,6vw,80px)",
            alignItems: "start",
          }}
          className="about-grid"
        >
          <div>
            <p
              style={{
                fontSize: 12.5,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: COLORS.brass,
                marginBottom: 18,
              }}
            >
              About
            </p>
            <h2
              style={{
                fontFamily: SERIF,
                fontWeight: 600,
                fontSize: "clamp(1.9rem,4vw,3rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.01em",
                margin: 0,
              }}
            >
              The big picture, executed at the technical level.
            </h2>
          </div>
          <div
            style={{
              fontSize: "clamp(1rem,1.3vw,1.12rem)",
              lineHeight: 1.7,
              color: "rgba(239,233,221,0.78)",
              display: "flex",
              flexDirection: "column",
              gap: "1.1em",
            }}
          >
            <p style={{ margin: 0 }}>
              My traditional training began at Westwood College of Technology,
              where I studied Graphic Design and Multimedia, and I hold a BA in
              Visual Communications with formal training in graphic design,
              multimedia, and computer-aided design. It is the craft foundation
              beneath everything that followed.
            </p>
            <p style={{ margin: 0 }}>
              I&rsquo;m a disciplined problem solver with deep experience in software
              architecture. I architect and build custom solutions, integrate
              third-party and proprietary APIs, and implement systems that
              improve operational efficiency, data flow, and business
              intelligence, engineering high-impact strategies that align
              creative execution with business objectives.
            </p>
            <p style={{ margin: 0 }}>
              As owner of Pinto Design Group and Pinto Consulting, I&rsquo;ve opened
              and supported 60+ establishments across financial services,
              restaurants, law, medicine, and professional services throughout
              Southern California. My studies also include certifications from
              Point Loma Nazarene University and advanced work in blockchain and
              cryptocurrency applications through UC Berkeley&rsquo;s Haas School of
              Business.
            </p>

            <div
              style={{
                marginTop: 36,
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: 20,
                borderTop: `1px solid ${COLORS.line}`,
                paddingTop: 28,
              }}
            >
              {[
                ["60+", "Establishments launched"],
                ["20yr", "Architecture & design"],
                ["8+", "National brands served"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div
                    style={{
                      fontFamily: SERIF,
                      fontSize: "clamp(1.6rem,3vw,2.2rem)",
                      color: COLORS.brass,
                      lineHeight: 1,
                    }}
                  >
                    {n}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      marginTop: 8,
                      color: "rgba(239,233,221,0.55)",
                      lineHeight: 1.4,
                    }}
                  >
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 820px) {
            .about-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── CONTACT / FOOTER ────────────────────────────────────────── */}
      <footer
        id="contact"
        style={{
          background: COLORS.ink,
          color: COLORS.cream,
          padding: "clamp(64px,9vw,110px) clamp(20px,5vw,56px) 48px",
          borderTop: `1px solid ${COLORS.line}`,
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <p
            style={{
              fontSize: 12.5,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: COLORS.brass,
              marginBottom: 22,
            }}
          >
            Get in touch
          </p>
          <h2
            style={{
              fontFamily: SERIF,
              fontWeight: 600,
              fontSize: "clamp(2.2rem,6vw,4.4rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.015em",
              margin: "0 0 36px",
              maxWidth: "16ch",
            }}
          >
            Let&rsquo;s build the next one.
          </h2>
          <a
            href="mailto:hello@bennyandpenny.com"
            className="hp-link"
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(1.2rem,2.4vw,1.8rem)",
              color: COLORS.cream,
            }}
          >
            hello@bennyandpenny.com
          </a>

          {/* Ventures / backlinks */}
          <div style={{ marginTop: 64 }}>
            <p
              style={{
                fontSize: 11.5,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(239,233,221,0.45)",
                marginBottom: 18,
              }}
            >
              Ventures
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px 32px",
                fontFamily: SERIF,
                fontSize: "clamp(1rem,1.8vw,1.3rem)",
              }}
            >
              {VENTURES.map((v) => (
                <a
                  key={v.label}
                  className="hp-link"
                  href={v.url}
                  target="_blank"
                  rel="noopener"
                  style={{ color: COLORS.cream }}
                >
                  {v.label}
                </a>
              ))}
            </div>
          </div>

          <div
            style={{
              marginTop: 70,
              paddingTop: 28,
              borderTop: `1px solid ${COLORS.line}`,
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 16,
              fontSize: 12,
              letterSpacing: "0.04em",
              color: "rgba(239,233,221,0.5)",
            }}
          >
            <span>© {new Date().getFullYear()} Benny &amp; Penny&rsquo;s</span>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              <a className="hp-link" href="#terms" style={{ color: "inherit" }}>
                Terms of Service
              </a>
              <a className="hp-link" href="#privacy" style={{ color: "inherit" }}>
                Privacy Policy
              </a>
            </div>
            <span>Southern California</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
