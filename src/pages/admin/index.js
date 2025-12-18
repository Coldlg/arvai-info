import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [lotteries, setLotteries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLotteries();
  }, []);

  const fetchLotteries = async () => {
    try {
      const res = await fetch("/api/admin/lotteries");
      const data = await res.json();
      setLotteries(data.lotteries || []);
    } catch (error) {
      console.error("Error fetching lotteries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Энэ сугалааг устгах уу? Бүх тасалбарууд устах болно!")) return;

    try {
      const res = await fetch(`/api/admin/lotteries/${id}`, { method: "DELETE" });
      if (res.ok) {
        setLotteries(lotteries.filter((l) => l.id !== id));
      }
    } catch (error) {
      console.error("Error deleting lottery:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-secondary to-primary text-text-main py-6 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-white bg-primary hover:bg-primary/50 hover:text-white px-4 py-2 rounded-lg transition-colors"
            >
              ← Нүүр
            </Link>
            <h1 className="text-2xl font-bold">🛠️ Админ Панел</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-primary to-secondary border border-tertiary/50 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-1">Нийт сугалаа</p>
            <p className="text-3xl font-bold text-text-main">{lotteries.length}</p>
          </div>
          <div className="bg-gradient-to-br from-primary to-secondary border border-tertiary/50 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-1">Идэвхтэй</p>
            <p className="text-3xl font-bold text-green-400">
              {lotteries.filter((l) => new Date(l.drawDate) > new Date()).length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary to-secondary border border-tertiary/50 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-1">Нийт тасалбар</p>
            <p className="text-3xl font-bold text-accent">
              {lotteries.reduce((acc, l) => acc + l.ticketsSold, 0).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Lotteries Section */}
        <div className="bg-gradient-to-br from-primary to-secondary border border-tertiary/50 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-tertiary/30 flex items-center justify-between">
            <h2 className="text-xl font-bold text-text-main">🎰 Сугалаанууд</h2>
            <Link
              href="/admin/lotteries/new"
              className="bg-gradient-to-r from-tertiary to-accent hover:from-accent hover:to-tertiary text-white px-4 py-2 rounded-lg font-semibold transition-all active:scale-[0.98]"
            >
              + Шинэ сугалаа
            </Link>
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-400">Уншиж байна...</div>
          ) : lotteries.length === 0 ? (
            <div className="p-8 text-center text-gray-400">Сугалаа олдсонгүй</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black/20">
                  <tr className="text-left text-gray-400 text-sm">
                    <th className="px-6 py-4 font-medium">ID</th>
                    <th className="px-6 py-4 font-medium">Нэр</th>
                    <th className="px-6 py-4 font-medium">Үнэ</th>
                    <th className="px-6 py-4 font-medium">Тасалбар</th>
                    <th className="px-6 py-4 font-medium">Дуусах огноо</th>
                    <th className="px-6 py-4 font-medium">Үйлдэл</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-tertiary/20">
                  {lotteries.map((lottery) => (
                    <tr key={lottery.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-gray-400">#{lottery.id}</td>
                      <td className="px-6 py-4 text-text-main font-medium">{lottery.title}</td>
                      <td className="px-6 py-4 text-accent font-semibold">{lottery.price.toLocaleString()}₮</td>
                      <td className="px-6 py-4">
                        <span className="text-text-main">{lottery.ticketsSold}</span>
                        <span className="text-gray-500">/{lottery.maximumTickets}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-400">
                        {new Date(lottery.drawDate).toLocaleDateString("mn-MN")}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/lotteries/${lottery.id}`}
                            className="text-cyan-400 bg-cyan-500/20 hover:bg-cyan-500/30 hover:text-cyan-300 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
                          >
                            Засах
                          </Link>
                          <Link
                            href={`/admin/lotteries/${lottery.id}/tickets`}
                            className="text-green-400 bg-green-500/20 hover:bg-green-500/30 hover:text-green-300 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
                          >
                            Тасалбар
                          </Link>
                          <button
                            onClick={() => handleDelete(lottery.id)}
                            className="text-red-400 bg-red-500/20 hover:bg-red-500/30 hover:text-red-300 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
                          >
                            Устгах
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
