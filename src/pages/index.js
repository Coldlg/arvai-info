import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-blue-600/20 via-transparent to-purple-600/20" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Арвай Авто худалдаа
          </h1>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <button
              onClick={() => router.push("/lotteries")}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold transition-colors w-full sm:w-auto"
            >
              Сугалаа үзэх
            </button>
            <button
              onClick={() => router.push("/cars")}
              className="inline-flex items-center justify-center rounded-lg border border-foreground/20 hover:border-foreground/40 px-6 py-3 font-semibold transition-colors w-full sm:w-auto"
            >
              Машин үзэх
            </button>
          </div>

          {/* <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div className="rounded-xl border border-foreground/10 p-5 bg-white/60 dark:bg-black/30 backdrop-blur">
              <h3 className="font-bold mb-1">Том шагнал</h3>
              <p className="text-sm opacity-75">
                Өндөр үнэтэй автомашинуудыг шангандаа бэлдсэн — шударга, ил тод
                зарчим.
              </p>
            </div>
            <div className="rounded-xl border border-foreground/10 p-5 bg-white/60 dark:bg-black/30 backdrop-blur">
              <h3 className="font-bold mb-1">Шууд худалдаа</h3>
              <p className="text-sm opacity-75">
                Баталгаатай шалгасан тээврийн хэрэгслүүд — бодит үнэ, тодорхой
                мэдээлэл.
              </p>
            </div>
          </div> */}
        </div>
      </main>
    </div>
  );
}
