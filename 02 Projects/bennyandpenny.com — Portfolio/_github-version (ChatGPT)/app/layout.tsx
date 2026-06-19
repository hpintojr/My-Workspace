import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

const siteUrl = "https://bennyandpenny.com";
const description =
  "Benny & Penny's is the technology and creative studio of Hamilton Pinto Jr. — software architect, creative technologist, and publisher. Two decades building the systems behind brands, platforms, and ventures including XBeton, Advantage First Financial, Benny & Penny's Adventures, and Mercury Call Desk.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Benny & Penny's — A Tech Company | Hamilton Pinto Jr., Software Architect & Creative Technologist",
    template: "%s | Benny & Penny's",
  },
  description,
  keywords: [
    "Hamilton Pinto",
    "Hamilton Pinto Jr",
    "software architect",
    "creative technologist",
    "publisher",
    "portfolio",
    "XBeton",
    "Advantage First Financial",
    "Benny & Penny's Adventures",
    "Mercury Call Desk",
    "Southern California",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Benny & Penny's — A Tech Company",
    title: "Benny & Penny's — A Tech Company | Hamilton Pinto Jr.",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Benny & Penny's — A Tech Company | Hamilton Pinto Jr.",
    description,
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Hamilton Pinto Jr.",
  url: siteUrl,
  email: "hello@bennyandpenny.com",
  jobTitle: "Software Architect, Creative Technologist & Publisher",
  description,
  worksFor: {
    "@type": "Organization",
    name: "Benny & Penny's — A Tech Company",
    url: siteUrl,
  },
  knowsAbout: [
    "Software architecture",
    "API integration",
    "Brand and design",
    "Publishing",
    "Business intelligence",
  ],
  sameAs: [
    "https://acc.capital/",
    "https://www.advantagefirst.com/",
    "https://www.bennyandpennyadventures.com/",
    "https://www.xbeton.com/",
    "https://mercurycalldesk.com/",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
