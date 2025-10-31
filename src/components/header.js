import Link from "next/link";

export function Header() {
  return (
    <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
      <h1 className="text-2xl md:text-4xl font-bold">Арвай авто худалдаа</h1>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-lg border border-foreground/20 hover:border-foreground/40 px-4 py-2 text-sm font-semibold transition-colors"
      >
        Нүүр рүү буцах
      </Link>
    </div>
  );
}
