import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Adventures",
  description:
    "Benny & Penny's Adventures — an original children's medical book series and the self-owned publishing imprint behind Benny & Penny's, A Tech Company.",
};

const highlights = [
  {
    title: "A children's medical book series",
    text: "Care-centered stories that help young readers feel prepared and brave for medical experiences—written by the author, produced end to end in-house.",
  },
  {
    title: "A self-owned imprint",
    text: "Brand, web storefront, digital delivery, and a full print/e-book/audio production pipeline, built and operated as our own publishing venture.",
  },
  {
    title: "Part of the studio",
    text: "The imprint is the namesake and creative heart of Benny & Penny's—proof of the same build-it-right discipline applied to my own work.",
  },
];

export default function AdventuresPage() {
  return (
    <>
      <section className="pageHero">
        <div className="shell">
          <p className="eyebrow">Featured imprint</p>
          <h1 className="display">Benny &amp; Penny&apos;s Adventures.</h1>
          <p className="lede">
            The publishing imprint at the heart of the studio: an original children&apos;s medical book
            series, with its own brand, storefront, and production pipeline.
          </p>
          <div className="buttonRow">
            <a className="button" href="https://www.bennyandpennyadventures.com/" target="_blank" rel="noopener">
              Visit the storefront →
            </a>
            <Link className="button button--light" href="/our-work">Back to all work</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="resourceGrid">
            {highlights.map((h) => (
              <article className="card resourceCard" key={h.title}>
                <div className="iconBadge" aria-hidden="true">♥</div>
                <h3>{h.title}</h3>
                <p>{h.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="shell pageIntro">
          <div>
            <p className="eyebrow">Where to find it</p>
            <h2 className="h2">The books live at bennyandpennyadventures.com.</h2>
          </div>
          <div>
            <p className="lede">
              The full catalog, digital library, and ordering experience are handled by the dedicated
              storefront. This page is the imprint&apos;s home within the studio portfolio.
            </p>
            <div className="buttonRow">
              <a className="button" href="https://www.bennyandpennyadventures.com/" target="_blank" rel="noopener">
                Go to the storefront →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
