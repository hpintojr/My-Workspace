import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected ventures and platforms by Hamilton Pinto Jr. — XBeton, Advantage First Financial, Benny & Penny's Adventures, Mercury Call Desk, and 60+ launched establishments.",
};

const ventures = [
  {
    title: "XBeton",
    label: "Construction Technology",
    description:
      "Commerce and agent-onboarding platform for an AAC and nano-graphene building-systems company. Platform architecture, API integration, and go-to-market systems.",
    role: "Platform architecture · Integrations",
    tags: ["Architecture", "APIs", "Commerce", "Go-to-market"],
    url: "https://www.xbeton.com/",
  },
  {
    title: "Advantage First Financial",
    label: "Financial Services",
    description:
      "Lead-capture, compliance, and sales-performance infrastructure for a debt-resolution firm, built and supported end to end.",
    role: "Systems · Compliance · BI",
    tags: ["Systems", "Compliance", "Business intelligence"],
    url: "https://www.advantagefirst.com/",
  },
  {
    title: "Benny & Penny's Adventures",
    label: "Publishing Imprint",
    description:
      "An original children's medical book series and the launch of a self-owned publishing imprint. Brand, web, and production pipeline.",
    role: "Founder · Publisher · Design",
    tags: ["Brand", "Web", "Publishing"],
    url: "https://www.bennyandpennyadventures.com/",
  },
  {
    title: "Mercury Call Desk",
    label: "Communications",
    description:
      "AI-powered communications platform. Pricing, quoting, telephony, and billing systems for high-volume outbound teams.",
    role: "Product · Architecture",
    tags: ["Product", "Telephony", "Billing"],
    url: "https://mercurycalldesk.com/",
  },
  {
    title: "60+ Establishments",
    label: "Brand & Launch",
    description:
      "Restaurants, law firms, medical practices, and professional-service organizations opened and supported across Southern California.",
    role: "Visual communications · Web",
    tags: ["Branding", "Web", "Launch"],
    url: null,
  },
];

export default function WorkPage() {
  return (
    <>
      <section className="pageHero">
        <div className="shell">
          <p className="eyebrow">Work</p>
          <h1 className="display">Two decades of building the systems behind brands.</h1>
          <p className="lede">
            A selection of platforms, ventures, and brands I&apos;ve architected, built, and supported—
            spanning construction technology, financial services, communications, and publishing.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="workGrid">
            {ventures.map((v) => (
              <article className="card workCard ventureCard" key={v.title}>
                <span className="kicker">{v.label}</span>
                <h3>{v.title}</h3>
                <p>{v.description}</p>
                <div className="tagList">
                  {v.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
                </div>
                {v.url && (
                  <a className="cardLink" href={v.url} target="_blank" rel="noopener">
                    Visit site →
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="shell pageIntro">
          <div>
            <p className="eyebrow">The newest chapter</p>
            <h2 className="h2">Benny &amp; Penny&apos;s Adventures.</h2>
          </div>
          <div>
            <p className="lede">
              My own imprint: an original children&apos;s medical book series created with my wife, the author.
              It&apos;s the namesake of this studio and the venture I&apos;m building from the ground up.
            </p>
            <div className="buttonRow">
              <Link className="button" href="/families">Explore the imprint</Link>
              <Link className="button button--light" href="/work-with-us">Work with me</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
