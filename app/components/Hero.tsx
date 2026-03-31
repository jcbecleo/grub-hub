"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const MARQUEE_ITEMS = [
  "instant noodles again?",
  "sad rice + soy sauce",
  "cereal for dinner",
  "toast... just toast",
  "ketchup sandwich era",
  "microwave everything",
  "expired yogurt vibes",
  "hot dog no bun",
];

export default function Hero() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center px-5 overflow-hidden">
      {/* Main content */}
      <div
        className={`relative z-10 flex max-w-lg flex-col items-center gap-6 text-center transition-all duration-500 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        {/* Badge */}
        <div className="rounded-full border-2 border-border bg-yellow px-5 py-2 shadow-brutal-sm">
          <span className="text-sm font-black uppercase tracking-wider">
            AI-Powered Recipes
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-black leading-[1.1] tracking-tight text-text-primary sm:text-6xl">
          Turn your{" "}
          <span className="relative inline-block">
            <span className="relative z-10">struggle meal</span>
            <span className="absolute bottom-1 left-0 -z-0 h-4 w-full -rotate-1 bg-accent/30 sm:h-5" />
          </span>{" "}
          into something{" "}
          <span className="text-accent">actually good</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-md text-lg font-medium leading-relaxed text-text-secondary">
          Dump your random pantry ingredients, tell us the vibe, and let AI
          figure out dinner for you.
        </p>

        {/* CTA */}
        <Link
          href="/cook"
          className="btn-brutal mt-4 flex items-center gap-2 rounded-xl border-3 border-border bg-accent px-8 py-4 font-black text-lg text-white shadow-brutal-lg"
        >
          Let&apos;s Cook 🍳
        </Link>
      </div>

      {/* Marquee ticker */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-y-3 border-border bg-yellow py-2.5">
        <div className="animate-marquee flex w-max gap-8">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="whitespace-nowrap text-sm font-bold uppercase tracking-wide text-text-primary"
            >
              {item} <span className="mx-2 text-accent">///</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
