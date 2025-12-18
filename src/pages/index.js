import { Header } from "@/components/header";
import { LotteryCard } from "@/components/LotteryCard";
import prisma from "@/lib/prisma";

export default function Home({ lotteries }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-to-r from-secondary to-primary text-text-main py-10 px-6">
        <Header />
      </header>
      <main className="max-w-7xl mx-auto py-8 px-6 ">
        {/* <h2 className="text-3xl font-bold mb-8 text-foreground">
          Available Lotteries
        </h2> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lotteries.map((lottery) => (
            <LotteryCard key={lottery.id} lottery={lottery} />
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const lotteries = await prisma.lottery.findMany();

  const now = new Date();

  // Serialize dates to strings (JSON)
  const serializedLotteries = lotteries.map((lottery) => ({
    ...lottery,
    drawDate: lottery.drawDate.toISOString(),
  }));

  // Sort lotteries: active ones first (by drawDate ascending), expired ones last
  serializedLotteries.sort((a, b) => {
    const aExpired = new Date(a.drawDate) <= now;
    const bExpired = new Date(b.drawDate) <= now;

    // If one is expired and one is not, expired goes last
    if (aExpired && !bExpired) return 1;
    if (!aExpired && bExpired) return -1;

    // If both are same status, sort by drawDate (sooner first for active, recent first for expired)
    if (aExpired) {
      // Both expired: most recently expired first
      return new Date(b.drawDate) - new Date(a.drawDate);
    } else {
      // Both active: soonest deadline first
      return new Date(a.drawDate) - new Date(b.drawDate);
    }
  });

  return {
    props: {
      lotteries: serializedLotteries,
    },
    revalidate: 10,
  };
}
