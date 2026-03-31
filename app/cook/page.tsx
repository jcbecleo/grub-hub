import Link from "next/link";
import PantryManager from "@/app/components/PantryManager";

export default function CookPage() {
  return (
    <div className="flex flex-col items-center bg-grid min-h-full px-5 py-10 sm:py-16">
      {/* Back nav */}
      <div className="w-full max-w-md mb-6">
        <Link
          href="/"
          className="btn-brutal inline-flex items-center gap-2 rounded-xl border-2 border-border bg-card px-4 py-2 text-sm font-bold shadow-brutal-sm"
        >
          &larr; Back
        </Link>
      </div>

      {/* Heading */}
      <div className="mb-8 flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-black tracking-tight text-text-primary sm:text-4xl">
          What&apos;s in your kitchen? 🛒
        </h1>
        <p className="max-w-sm text-base font-medium text-text-secondary">
          Add whatever you&apos;ve got. No judgement.
        </p>
      </div>

      {/* Pantry card */}
      <div className="w-full max-w-md rounded-2xl border-3 border-border bg-card p-6 shadow-brutal-xl sm:p-8">
        <PantryManager />
      </div>
    </div>
  );
}
