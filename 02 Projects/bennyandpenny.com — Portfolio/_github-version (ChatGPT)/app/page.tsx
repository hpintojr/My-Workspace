import Link from "next/link";

const capabilities = [
  {
    icon: "✦",
    title: "Software architecture",
    text: "Custom platforms, API integration, and systems that improve operational efficiency, data flow, and business intelligence.",
  },
  {
    icon: "◆",
    title: "Creative technology",
    text: "The eye of a designer with the discipline of an architect—brand systems, web, and digital experiences built to perform.",
  },
  {
    icon: "♥",
    title: "Brand & publishing",
    text: "From go-to-market systems to an original children's book imprint, ideas taken from concept to launch.",
  },
];

const ventures = [
  {
    title: "XBeton",
    eyebrow: "Construction Technology",
    text: "Commerce and agent-onboarding platform for an AAC and nano-graphene building-systems company. Architecture, API integration, and go-to-market systems.",
    url: "https://www.xbeton.com/",
  },
  {
    title: "Advantage First Financial",
    eyebrow: "Financial Services",
    text: "Lead-capture, compliance, and sales-performance infrastructure for a debt-resolution firm, built and supported end to end.",
    url: "https://www.advantagefirst.com/",
  },
  {
    title: "Benny & Penny's Adventures",
    eyebrow: "Publishing Imprint",
    text: "An original children's medical book series and a self-owned publishing imprint. Brand, web, and production pipeline.",
    url: "https://www.bennyandpennyadventures.com/",
  },
  {
    title: "Mercury Call Desk",
    eyebrow: "Communications",
    text: "AI-powered communications platform. Pricing, quoting, telephony, and billing systems for high-volume outbound teams.",
    url: "https://mercurycalldesk.com/",
  },
  {
    title: "60+ Establishments",
    eyebrow: "Brand & Launch",
    text: "Restaurants, law firms, medical practices, and professional-service organizations opened and supported across Southern California.",
    url: null,
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="shell heroGrid">
          <div className="heroCopy">
            <p className="eyebrow">Software Architect · Creative Technologist · Publisher</p>
            <h1 className="display">Vision, translated into real-world solutions.</h1>
            <p className="lede">
              For two decades I&apos;ve built the systems behind brands, platforms, and ventures—pairing
              the eye of a designer with the discipline of a software architect. Benny &amp; Penny&apos;s is
              the studio where that work, and my own, comes together. Now I&apos;m building my own.
            </p>
            <div className="buttonRow">
              <Link className="button" href="/our-work">View my work</Link>
              <Link className="button button--light" href="/work-with-us">Work with me</Link>
            </div>
          </div>
          <div className="heroVisual" aria-label="Benny and Penny brand mark">
            <div className="storyWindow">
              <div className="characterPair" aria-hidden="true">
                <div className="character character--penny">P</div>
                <div className="character character--benny">B</div>
              </div>
            </div>
            <div className="visualTag">A technology &amp; creative studio with heart at the center.</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="sectionHead">
            <div>
              <p className="eyebrow">What I do</p>
              <h2 className="h2">One discipline, many registers.</h2>
            </div>
            <p className="lede">
              From construction-tech platforms to a children&apos;s book imprint, the common thread is execution.
            </p>
          </div>
          <div className="pillarGrid">
            {capabilities.map((c) => (
              <article className="card pillarCard" key={c.title}>
                <div className="iconBadge" aria-hidden="true">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="shell">
          <div className="sectionHead">
            <div>
              <p className="eyebrow">Selected ventures</p>
              <h2 className="h2">The work speaks.</h2>
            </div>
            <Link className="textLink" href="/our-work">See all work</Link>
          </div>
          <div className="workGrid">
            {ventures.map((v) => (
              <article className="card workCard ventureCard" key={v.title}>
                <span className="kicker">{v.eyebrow}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
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

      <section className="section section--blush">
        <div className="shell callout">
          <div className="calloutInner">
            <p className="eyebrow">Let&apos;s build the next one</p>
            <h2 className="h2">Have a platform, brand, or product that needs to get built right?</h2>
            <p className="lede">
              I take on a small number of aligned software, brand, and publishing engagements.
            </p>
            <div className="buttonRow">
              <Link className="button" href="/work-with-us">Start a conversation</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
