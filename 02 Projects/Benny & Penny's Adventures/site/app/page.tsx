/*
  Benny & Penny's Adventures — Homepage
  --------------------------------------
  WHERE THIS GOES:
    • Plain Next.js:      src/app/page.tsx  (or app/page.tsx)
    • Payload + Next.js:  src/app/(frontend)/page.tsx
  FONTS (add once):
    In globals.css add:
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Dancing+Script:wght@600;700&family=Nunito:wght@400;500;600;700&display=swap');
    In tailwind.config.ts, extend theme.fontFamily:
      serif: ['"Playfair Display"', 'serif'],
      sans:  ['Nunito', 'sans-serif'],
  IMAGES (drop in later): public/images/
      hero-family.png, author-michelle.png,
      michelle.png, hamilton.png, charlie.png, mary.png, penelope.png, benjamin.png
    Once an image is added, delete the matching <div className="absolute inset-0 ...">
    placeholder overlay so the real art shows through.
*/

import Header from "./components/Header";

const familyMembers = [
  { name: "Michelle", role: "Nurse. Mom. Writer.", image: "/images/michelle.png" },
  { name: "Hamilton", role: "Dev. Dad. Publisher.", image: "/images/hamilton.png" },
  { name: "Charlie", role: "Lead Adventurer", image: "/images/charlie.png" },
  { name: "Mary", role: "Lead Adventurer", image: "/images/mary.png" },
  { name: "Penelope", role: "The Real Penny", image: "/images/penelope.png" },
  { name: "Benjamin", role: "The Real Benny", image: "/images/benjamin.png" },
];

const pillars = [
  { icon: "💗", title: "Medical Experiences Made Friendly", text: "We turn medical equipment and procedures into characters children can trust." },
  { icon: "🩺", title: "Written by a Registered Nurse", text: "Every book is created with medical knowledge, real experience, and a mother's heart." },
  { icon: "🛡️", title: "Built for Brave Kids", text: "Our stories help children feel informed, confident, and less afraid during medical care." },
  { icon: "👨‍👩‍👧‍👦", title: "Inspired by Real Medical Journeys", text: "Based on our family's experiences with home infusions, PICC lines, ports, and more." },
  { icon: "📖", title: "Education. Comfort. Empowerment.", text: "Because every child deserves to feel brave when facing medical adventures." },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fff6e8] text-[#064852]">
      <Header />
      <Hero />
      <ValuePillars />
      <AuthorSection />
      <FamilySection />
      <CommunitySection />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-8 px-5 pb-10 pt-2 sm:px-6 sm:gap-10 lg:grid-cols-[0.9fr_1.4fr]">
      <div className="text-center lg:text-left">
        <h1 className="font-serif text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
          Helping Children Feel <span className="text-[#e7646c]">Brave</span> About Medical Care
        </h1>
        <div className="my-5 text-5xl text-[#e7646c] sm:my-6 sm:text-6xl">♥</div>
        <p className="mx-auto max-w-md text-base leading-8 text-[#1d3237] sm:text-lg lg:mx-0">
          Benny, Penny, and their medical friends help children understand infusions, PICC lines, ports, pumps, and more through fun, comforting adventures.
        </p>
        <a href="/books" className="mt-7 inline-flex rounded-full bg-[#e7646c] px-7 py-4 font-serif text-lg text-white shadow-sm transition hover:bg-[#d95660] sm:text-xl">
          Explore Our Books ♥
        </a>
      </div>
      <div className="relative order-first min-h-[260px] overflow-hidden rounded-[2rem] border border-[#e8cfae] bg-[#f9ead7] sm:min-h-[340px] lg:order-none lg:min-h-[420px]">
        <img src="/images/hero-family.png" alt="Benny and Penny family illustration" className="h-full w-full object-cover" />
        <div className="absolute inset-0 grid place-items-center bg-[#f9ead7]/80 text-center text-[#064852]">
          <div>
            <p className="font-serif text-3xl">Hero Family Image</p>
            <p className="mt-2 text-sm">Drop image into public/images/hero-family.png</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ValuePillars() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <div className="grid overflow-hidden rounded-3xl border border-[#e8cfae] bg-white/45 md:grid-cols-2 lg:grid-cols-5">
        {pillars.map((pillar) => (
          <div key={pillar.title} className="border-[#e8cfae] p-7 text-center last:border-r-0 lg:my-[22px] lg:border-r lg:px-[18px] lg:py-[10px]">
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl border border-dashed border-[#c9a98c] bg-[#f3e7d3] text-[10px] font-semibold text-[#9c7e5e]">Icon</div>
            <h3 className="font-serif text-2xl leading-tight">{pillar.title}</h3>
            <p className="mt-4 text-sm leading-6 text-[#26383c]">{pillar.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AuthorSection() {
  return (
    <section id="author" className="mx-auto grid max-w-7xl scroll-mt-24 gap-8 px-6 py-10 lg:grid-cols-[1fr_1.2fr_0.9fr]">
      <div className="relative min-h-[360px] overflow-hidden rounded-3xl border border-[#e8cfae] bg-[#f9ead7]">
        <img src="/images/author-michelle.png" alt="Michelle Marie Pinto writing illustration" className="h-full w-full object-cover" />
        <div className="absolute inset-0 grid place-items-center bg-[#f9ead7]/80 text-center">
          <div>
            <p className="font-serif text-3xl">Author Image</p>
            <p className="mt-2 text-sm">public/images/author-michelle.png</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <p className="font-serif text-2xl italic text-[#064852]">Meet the Author ♥</p>
        <h2 className="font-serif text-[35px] font-bold">Michelle Marie Pinto, RN</h2>
        <p className="mt-3 font-serif text-3xl text-[#e7646c]">Nurse. Mom. Writer.</p>
        <p className="mt-6 max-w-xl text-lg leading-8 text-[#1d3237]">
          With over 15 years as a registered nurse and a deep passion for helping children and families, I created Benny &amp; Penny Adventures to make medical experiences less scary and a little more understandable through stories, friendship, and imagination.
        </p>
      </div>
      <div className="mx-auto w-full max-w-lg rounded-3xl border border-[#e8cfae] bg-[#fde4de] p-8 lg:mx-0 lg:max-w-none">
        <h3 className="font-serif text-[27px]">As Seen In My Life ♥</h3>
        <ul className="mt-6 space-y-2.5 text-[17px] text-[#1d3237]">
          <li><span className="align-middle text-[22px] text-[#e7646c]">♥</span> Pediatric Nursing Experience</li>
          <li><span className="align-middle text-[22px] text-[#e7646c]">♥</span> Patient &amp; Family Education</li>
          <li><span className="align-middle text-[22px] text-[#e7646c]">♥</span> Child Development Advocate</li>
          <li><span className="align-middle text-[22px] text-[#e7646c]">♥</span> Amazing Kids Mom</li>
          <li><span className="align-middle text-[22px] text-[#e7646c]">♥</span> Story Lover &amp; Dreamer</li>
        </ul>
      </div>
    </section>
  );
}

function FamilySection() {
  return (
    <section id="family" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-8">
      <h2 className="text-center font-serif text-3xl italic md:text-4xl">♥ Meet the Real Family Behind the Adventures ♥</h2>
      <div className="mt-8 grid grid-cols-2 gap-5 md:flex md:snap-x md:overflow-x-auto md:pb-3 lg:grid lg:grid-cols-6 lg:overflow-visible">
        {familyMembers.map((member) => (
          <div key={member.name} className="overflow-hidden rounded-2xl border border-[#e8cfae] bg-white/45 p-4 text-center md:w-[160px] md:flex-none md:snap-start lg:w-auto">
            <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-[#f9ead7]">
              <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 grid place-items-center bg-[#f9ead7]/80 text-xs">Image</div>
            </div>
            <h3 className="font-serif text-2xl">{member.name}</h3>
            <p className="mt-2 text-sm font-medium text-[#e7646c]">{member.role}</p>
            <div className="mt-3 text-[#e7646c]">♥</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CommunitySection() {
  return (
    <section id="community" className="mt-8 border-t border-[#e8cfae] bg-[#eef2e6] px-6 py-10">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
        <div>
          <h2 className="font-serif text-3xl">Join Our Community ♥</h2>
          <p className="mt-3 leading-7 text-[#1d3237]">Get updates on new books, resources, and helpful tips.</p>
          <form className="mt-5 flex overflow-hidden rounded-full border border-[#e8cfae] bg-white">
            <input type="email" placeholder="Enter your email" className="min-w-0 flex-1 px-5 py-3 outline-none" />
            <button className="bg-[#e7646c] px-5 py-3 font-serif text-white">Sign Me Up ♥</button>
          </form>
        </div>
        <div className="text-center">
          <blockquote className="font-serif text-4xl italic leading-tight text-[#e7646c]">&ldquo;Every child is braver than they believe.&rdquo;</blockquote>
          <p className="mt-4 font-serif text-xl">— Nurse Ivy ♥</p>
        </div>
        <div className="text-center md:text-right">
          <h2 className="font-serif text-3xl">Let&rsquo;s Connect ♥</h2>
          <div className="mt-5 flex justify-center gap-4 md:justify-end">
            <a aria-label="Instagram" href="#" className="grid h-12 w-12 place-items-center rounded-full bg-[#064852] text-white transition hover:bg-[#0a5f68]">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.13 1.38C1.35 2.67.93 3.34.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.8.72 1.47 1.38 2.13.66.66 1.34 1.08 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0z"/><path d="M12 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84M12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4M18.41 4.15a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z"/></svg>
            </a>
            <a aria-label="Facebook" href="#" className="grid h-12 w-12 place-items-center rounded-full bg-[#064852] text-white transition hover:bg-[#0a5f68]">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M24 12a12 12 0 1 0-13.88 11.85v-8.38H7.08V12h3.04V9.36c0-3 1.79-4.67 4.53-4.67 1.31 0 2.68.24 2.68.24v2.95h-1.51c-1.49 0-1.95.92-1.95 1.87V12h3.32l-.53 3.47h-2.79v8.38A12 12 0 0 0 24 12z"/></svg>
            </a>
            <a aria-label="TikTok" href="#" className="grid h-12 w-12 place-items-center rounded-full bg-[#064852] text-white transition hover:bg-[#0a5f68]">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M16.6 5.82a4.28 4.28 0 0 1-1.06-2.82h-3.3v13.2a2.59 2.59 0 1 1-2.59-2.59c.27 0 .53.04.78.12V8.36a5.96 5.96 0 0 0-.78-.05A5.92 5.92 0 1 0 15.57 14.2V8.07a7.55 7.55 0 0 0 4.43 1.42V6.19a4.27 4.27 0 0 1-3.4-.37z"/></svg>
            </a>
            <a aria-label="YouTube" href="#" className="grid h-12 w-12 place-items-center rounded-full bg-[#064852] text-white transition hover:bg-[#0a5f68]">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M23.5 6.2a3 3 0 0 0-2.11-2.13C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.39.52A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.11 2.13c1.89.52 9.39.52 9.39.52s7.5 0 9.39-.52a3 3 0 0 0 2.11-2.13A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg>
            </a>
            <a aria-label="Email" href="#" className="grid h-12 w-12 place-items-center rounded-full bg-[#064852] text-white transition hover:bg-[#0a5f68]">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7L4 7v.6l8 5 8-5V7l-8 5z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#064852] px-6 py-6 text-center text-sm text-white">
      © {new Date().getFullYear()} Benny &amp; Penny&rsquo;s Adventures. All rights reserved.
    </footer>
  );
}
