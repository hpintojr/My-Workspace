import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Hamilton Pinto Jr. — software architect, creative technologist, and publisher. BA in Visual Communications, owner of Pinto Design Group and Pinto Consulting, 60+ establishments launched across Southern California.",
};

const stats = [
  { num: "60+", label: "Establishments launched" },
  { num: "20yr", label: "Architecture & design" },
  { num: "8+", label: "National brands served" },
];

export default function AboutPage() {
  return (
    <>
      <section className="pageHero">
        <div className="shell">
          <p className="eyebrow">About</p>
          <h1 className="display">The big picture, executed at the technical level.</h1>
          <p className="lede">
            Benny &amp; Penny&apos;s is named for my children and serves as the banner for my work as a
            software architect, creative technologist, and publisher.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell featureSplit">
          <div className="featureArtwork" aria-hidden="true">
            <div className="characterPair" style={{ justifyContent: "center", marginTop: "6rem" }}>
              <div className="character character--penny">P</div>
              <div className="character character--benny">B</div>
            </div>
          </div>
          <div>
            <p className="eyebrow">Hamilton Pinto Jr.</p>
            <h2 className="h2">A disciplined problem solver with a designer&apos;s eye.</h2>
            <p className="lede">
              My traditional training began at Westwood College of Technology, where I studied Graphic
              Design and Multimedia, and I hold a BA in Visual Communications. It is the craft foundation
              beneath everything that followed.
            </p>
            <p className="note">
              I architect and build custom solutions, integrate third-party and proprietary APIs, and
              implement systems that improve operational efficiency, data flow, and business intelligence—
              aligning creative execution with business objectives.
            </p>
            <p className="note">
              As owner of Pinto Design Group and Pinto Consulting, I&apos;ve opened and supported 60+
              establishments across financial services, restaurants, law, medicine, and professional
              services throughout Southern California. My studies also include certifications from Point
              Loma Nazarene University and advanced work in blockchain and cryptocurrency applications
              through UC Berkeley&apos;s Haas School of Business.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="shell">
          <p className="eyebrow">By the numbers</p>
          <h2 className="h2">Execution, at scale.</h2>
          <div className="statRow">
            {stats.map((s) => (
              <div className="statCard" key={s.label}>
                <div className="statNum">{s.num}</div>
                <div className="statLabel">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--blush">
        <div className="shell callout">
          <div className="calloutInner">
            <p className="eyebrow">Let&apos;s build the next one</p>
            <h2 className="h2">Bring me the big picture. I&apos;ll handle the technical level.</h2>
            <div className="buttonRow">
              <Link className="button" href="/our-work">See the work</Link>
              <Link className="button button--light" href="/work-with-us">Get in touch</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
