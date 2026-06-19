import Link from "next/link";

export default function NotFound() {
  return (
    <section className="pageHero">
      <div className="shell">
        <p className="eyebrow">Page not found</p>
        <h1 className="display">This little page has wandered off.</h1>
        <p className="lede">
          Let&apos;s take you back to the Benny &amp; Penny story.
        </p>
        <div className="buttonRow">
          <Link className="button" href="/">Return home</Link>
          <Link className="button button--light" href="/work-with-us">Work with us</Link>
        </div>
      </div>
    </section>
  );
}
