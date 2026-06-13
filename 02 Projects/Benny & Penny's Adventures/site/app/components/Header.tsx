"use client";

/*
  Responsive site header with a working mobile menu.
  Place at: src/app/components/Header.tsx  (imported by page.tsx)
  Breakpoints: nav + CTA show inline on lg (≥1024px); below that a hamburger
  toggles a stacked menu.
*/

import { useState } from "react";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#author" },
  { label: "Our Characters", href: "/#family" },
  { label: "Books", href: "/books" },
  { label: "For Parents", href: "/for-parents" },
  { label: "Contact", href: "/contact" },
];

const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" /></svg>
);

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="mx-auto max-w-7xl px-5 py-5 sm:px-6 sm:py-6">
      <div className="relative flex items-start justify-between gap-3 lg:items-center">
        {/* Brand */}
        <div className="min-w-0 flex-1 text-center leading-none lg:flex-none lg:text-left">
          <div className="font-serif text-2xl font-bold text-[#064852] sm:text-4xl md:text-5xl">Benny &amp; Penny&rsquo;s</div>
          <div className="text-center font-serif text-2xl italic text-[#e7646c] sm:text-4xl md:text-5xl">
            <span className="align-middle text-2xl sm:text-4xl md:text-5xl">♥</span> Adventures <span className="align-middle text-2xl sm:text-4xl md:text-5xl">♥</span>
          </div>
          <p className="mt-2 text-[10px] font-bold uppercase tracking-widest sm:text-xs">Medical Books for Brave Little Hearts</p>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-[#102f35] lg:flex xl:gap-7">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="hover:text-[#e7646c]">{l.label}</a>
          ))}
        </nav>

        <a href="#community" className="hidden rounded-full bg-[#e7646c] px-6 py-3 font-serif text-lg text-white shadow-sm transition hover:bg-[#d95660] lg:inline-flex">
          Join Our Journey ♥
        </a>

        <a href="/cart" aria-label="Cart" className="absolute right-[60px] top-7 text-[#064852] hover:text-[#e7646c] lg:static lg:right-auto lg:top-auto">
          <CartIcon />
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="absolute right-[5px] top-6 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#e8cfae] bg-white/70 text-xl leading-none text-[#064852] lg:static lg:right-auto lg:top-auto lg:hidden"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="mt-4 flex flex-col gap-1 rounded-2xl border border-[#e8cfae] bg-white/70 p-3 text-center lg:hidden">
          {links.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-4 py-2 font-medium text-[#102f35] hover:bg-[#fde4de]">{l.label}</a>
          ))}
          <a href="/cart" onClick={() => setOpen(false)} className="rounded-lg px-4 py-2 font-medium text-[#102f35] hover:bg-[#fde4de]">Cart</a>
          <a href="#community" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-[#e7646c] px-6 py-3 font-serif text-lg text-white">Join Our Journey ♥</a>
        </nav>
      )}
    </header>
  );
}
