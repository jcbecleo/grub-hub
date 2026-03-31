import PantryManager from "@/app/components/PantryManager";

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col items-center px-5 py-12 font-sans sm:py-20 bg-grid overflow-hidden">
      {/* Decorative floating shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float absolute top-16 left-[8%] h-16 w-16 rounded-full bg-yellow border-2 border-border opacity-60" />
        <div className="animate-float-slow absolute top-40 right-[10%] h-12 w-12 rounded-lg bg-pink border-2 border-border opacity-50 rotate-12" />
        <div className="animate-float absolute bottom-32 left-[15%] h-10 w-10 rounded-full bg-green border-2 border-border opacity-40" />
        <div className="animate-float-slow absolute top-[60%] right-[20%] h-14 w-14 rounded-lg bg-purple border-2 border-border opacity-30 -rotate-6" />
        <div className="animate-float absolute bottom-20 right-[8%] h-8 w-8 rounded-full bg-blue border-2 border-border opacity-50" />
      </div>

      <main className="relative z-10 w-full max-w-md flex flex-col gap-8">
        {/* Hero */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="animate-wiggle inline-block text-4xl">🍳</span>
            <h1 className="text-4xl font-black tracking-tight text-text-primary">
              Grub Hub
            </h1>
          </div>
          <p className="text-lg leading-relaxed text-text-secondary font-medium">
            Toss in what you&apos;ve got, tell us what you&apos;re craving, and
            let AI cook up something amazing.
          </p>
        </div>

        {/* Pantry section */}
        <div className="rounded-2xl bg-card border-3 border-border p-6 shadow-brutal-lg">
          <h2 className="mb-4 text-xs font-black uppercase tracking-widest text-text-secondary">
            Your Ingredients
          </h2>
          <PantryManager />
        </div>
      </main>
    </div>
  );
}
