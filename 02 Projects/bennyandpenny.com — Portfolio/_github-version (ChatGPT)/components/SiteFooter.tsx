import Link from "next/link";

const ventures = [
  { label: "ACC", url: "https://acc.capital/" },
  { label: "Advantage First Financial", url: "https://www.advantagefirst.com/" },
  { label: "Benny & Penny's Adventures", url: "https://www.bennyandpennyadventures.com/" },
  { label: "XBeton", url: "https://www.xbeton.com/" },
  { label: "Mercury Call Desk", url: "https://mercurycalldesk.com/" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="siteFooter">
      <div className="shell footerGrid">
        <div>
          <p className="eyebrow">Benny &amp; Penny&apos;s — A Tech Company</p>
          <p className="footerMission">
            The technology and creative studio of Hamilton Pinto Jr. — software architecture,
            creative technology, and publishing for brands, platforms, and ventures.
          </p>
        </div>
        <div className="footerLinks">
          <Link href="/our-work">Work</Link>
          <Link href="/families">Adventures</Link>
          <Link href="/about">About</Link>
          <Link href="/work-with-us">Contact</Link>
        </div>
        <div className="footerContact">
          <a href="mailto:hello@bennyandpenny.com">hello@bennyandpenny.com</a>
          <p className="footerVenturesLabel">Ventures</p>
          <div className="footerVentures">
            {ventures.map((v) => (
              <a key={v.label} href={v.url} target="_blank" rel="noopener">
                {v.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="shell footerBottom">
        <span>© {year} Benny &amp; Penny&apos;s — A Tech Company. All rights reserved.</span>
        <span>Southern California</span>
      </div>
    </footer>
  );
}
