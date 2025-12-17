import { Header } from "@/components/header";
import { LotteryCard } from "@/components/LotteryCard";
import prisma from "@/lib/prisma";

export default function Lotteries({ lotteries }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-10 px-6">
        <Header />
      </header>
      <main className="max-w-7xl mx-auto py-12 px-6 ">
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

export async function getServerSideProps() {
  const lotteries = await prisma.lottery.findMany();

  // Serialize dates to strings (JSON)
  const serializedLotteries = lotteries.map((lottery) => ({
    ...lottery,
    drawDate: lottery.drawDate.toISOString(),
  }));

  return {
    props: {
      lotteries: serializedLotteries,
    },
  };
}
