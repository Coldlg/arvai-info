import Link from "next/link";
import { useRouter } from "next/router";

export function Header() {
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between">
        {/* Logo Area */}
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => router.push("/")}>
          <div className="bg-white/20 rounded-xl backdrop-blur-sm group-hover:bg-white/30 transition-all shadow-lg border border-white/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 text-white drop-shadow-md"
            >
              <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z" />
              <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725H15.75z" />
              <path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-text-main tracking-tight drop-shadow-md">
              <span className="text-tertiary">Арвай</span> Авто худалдаа
            </h1>
            <p className="text-tertiary text-[10px] md:text-xs font-medium tracking-widest uppercase opacity-90">
              Баталгаатай • Найдвартай
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
