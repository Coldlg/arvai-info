import { useState } from "react";
import { Header } from "@/components/header";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default function LotteryTicketSearch({ lottery }) {
  const [phone, setPhone] = useState("");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!phone.trim()) return;

    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const res = await fetch(`/api/tickets/search?lotteryId=${lottery.id}&phone=${encodeURIComponent(phone)}`);
      const data = await res.json();

      if (res.ok) {
        setTickets(data.tickets);
      } else {
        setError(data.error || "Хайлт амжилтгүй боллоо");
      }
    } catch (err) {
      setError("Сүлжээний алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-to-r from-secondary to-primary text-text-main py-10 px-6">
        <Header />
      </header>

      <main className="max-w-2xl mx-auto py-8 px-6">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Буцах
        </Link>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-text-main mb-2">{lottery.title}</h1>
          <p className="text-gray-400">Утасны дугаараар тасалбар хайх</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-3">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Утасны дугаар оруулах..."
              className="flex-1 bg-primary/50 border border-tertiary/50 rounded-xl px-4 py-3 text-text-main placeholder-gray-500 focus:outline-none focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-all"
            />
            <button
              type="submit"
              disabled={loading || !phone.trim()}
              className="bg-gradient-to-r from-tertiary to-accent hover:from-accent hover:to-tertiary text-white px-6 py-3 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {loading ? <span className="inline-block animate-spin">⏳</span> : "🔍 Хайх"}
            </button>
          </div>
        </form>

        {/* Results */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-300 rounded-xl p-4 mb-6 text-center">
            {error}
          </div>
        )}

        {searched && !loading && tickets.length === 0 && !error && (
          <div className="bg-primary/50 border border-tertiary/30 rounded-xl p-8 text-center">
            <p className="text-gray-400 text-lg">😔 Тасалбар олдсонгүй</p>
            <p className="text-gray-500 text-sm mt-2">Утасны дугаараа шалгаад дахин оролдоно уу</p>
          </div>
        )}

        {tickets.length > 0 && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <span className="bg-gradient-to-r from-tertiary to-accent text-white px-4 py-1 rounded-full text-sm font-bold">
                {tickets.length} тасалбар олдлоо
              </span>
            </div>

            <div className="grid gap-3">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-gradient-to-br from-primary to-secondary border border-tertiary/50 rounded-xl p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-tertiary to-accent text-white w-14 h-14 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">
                      #{ticket.ticket_number}
                    </div>
                    <div>
                      <p className="text-text-main font-semibold">Тасалбар #{ticket.ticket_number}</p>
                      <p className="text-gray-400 text-sm">📱 {ticket.phone_number}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-accent font-bold">{ticket.amount_paid.toLocaleString()}₮</p>
                    <p className="text-gray-500 text-xs">{new Date(ticket.created_at).toLocaleDateString("mn-MN")}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  const lotteries = await prisma.lottery.findMany({
    select: { id: true },
  });

  const paths = lotteries.map((lottery) => ({
    params: { id: lottery.id.toString() },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const lottery = await prisma.lottery.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!lottery) {
    return { notFound: true };
  }

  return {
    props: {
      lottery: {
        ...lottery,
        drawDate: lottery.drawDate.toISOString(),
      },
    },
    revalidate: 60,
  };
}
