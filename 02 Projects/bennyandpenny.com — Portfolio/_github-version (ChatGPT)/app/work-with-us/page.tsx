import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Work with Hamilton Pinto Jr. — software architecture, API integration, creative technology, brand and web, and publishing engagements.",
};

const engagements = [
  "Software architecture and custom platform builds",
  "API integration and systems / business intelligence",
  "Brand, visual identity, and web",
  "Go-to-market and launch systems",
  "Publishing, imprint, and production-pipeline projects",
];

export default function ContactPage() {
  return (
    <>
      <section className="pageHero">
        <div className="shell">
          <p className="eyebrow">Contact</p>
          <h1 className="display">Let&apos;s build the next one.</h1>
          <p className="lede">
            I take on a small number of aligned engagements across software, brand, and publishing.
            Tell me what you&apos;re building.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell contactGrid">
          <div className="contactPanel contactPanel--dark">
            <p className="eyebrow">What I take on</p>
            <h2 className="h2">Where I can help most.</h2>
            <ul className="contactList">
              {engagements.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
          <div className="contactPanel">
            <p className="eyebrow">Start here</p>
            <h2 className="h2">Tell me about the project.</h2>
            <p className="lede">
              Send a brief note with your name, company, the problem you&apos;re solving, timeline, and the
              best way to reach you.
            </p>
            <a className="button" href="mailto:hello@bennyandpenny.com?subject=Project%20Inquiry%20—%20Benny%20%26%20Penny%27s">
              Email me
            </a>
            <p className="note">
              A contact form can route to a CRM later; for now, direct email keeps every inquiry personal and reliable.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="shell pageIntro">
          <div>
            <p className="eyebrow">What to expect</p>
            <h2 className="h2">Straight answers, then a clear plan.</h2>
          </div>
          <p className="lede">
            I&apos;ll listen for the heart of the project first, then tell you honestly whether there&apos;s a
            strong, aligned way to build it together.
          </p>
        </div>
      </section>
    </>
  );
}
