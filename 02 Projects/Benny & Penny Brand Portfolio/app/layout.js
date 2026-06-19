import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://bennyandpenny.com"),
  title: {
    default: "Benny & Penny's — Hamilton Pinto Jr. | Software Architect & Creative Technologist",
    template: "%s | Benny & Penny's",
  },
  description:
    "Hamilton Pinto Jr. — software architect, creative technologist, and publisher. Two decades building the systems behind brands, platforms, and ventures including XBeton, Advantage First Financial, Benny & Penny's Adventures, and Mercury Call Desk.",
  keywords: [
    "Hamilton Pinto",
    "software architect",
    "creative technologist",
    "publisher",
    "XBeton",
    "Advantage First Financial",
    "Benny & Penny's Adventures",
    "Mercury Call Desk",
    "Southern California",
  ],
  authors: [{ name: "Hamilton Pinto Jr." }],
  openGraph: {
    title: "Benny & Penny's — Hamilton Pinto Jr.",
    description:
      "Vision, translated into real-world solutions. Software architecture, creative technology, and publishing.",
    url: "https://bennyandpenny.com",
    siteName: "Benny & Penny's",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Benny & Penny's — Hamilton Pinto Jr.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Benny & Penny's — Hamilton Pinto Jr.",
    description:
      "Vision, translated into real-world solutions. Software architecture, creative technology, and publishing.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
