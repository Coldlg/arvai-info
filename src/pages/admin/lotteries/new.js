import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function NewLottery() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    maximumTickets: "",
    drawDate: "",
    images: "",
    accountNumber: "",
    accountName: "",
    bankName: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/lotteries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          images: form.images.split("\n").filter((url) => url.trim()),
        }),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        const data = await res.json();
        setError(data.error || "Алдаа гарлаа");
      }
    } catch (err) {
      setError("Сүлжээний алдаа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-to-r from-secondary to-primary text-text-main py-6 px-6 shadow-lg">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Link href="/admin" className="text-gray-400 hover:text-white transition-colors">
            ← Буцах
          </Link>
          <h1 className="text-2xl font-bold">🎰 Шинэ сугалаа үүсгэх</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto py-8 px-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="bg-red-500/20 border border-red-500/50 text-red-300 rounded-xl p-4">{error}</div>}

          <div className="bg-gradient-to-br from-primary to-secondary border border-tertiary/50 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-text-main mb-4">Үндсэн мэдээлэл</h2>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Нэр *</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full bg-black/30 border border-tertiary/50 rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-tertiary"
                placeholder="жишээ: LC300 Сугалаа"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Тайлбар</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full bg-black/30 border border-tertiary/50 rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-tertiary resize-none"
                placeholder="Сугалааны тухай товч тайлбар..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Тасалбарын үнэ (₮) *</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/30 border border-tertiary/50 rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-tertiary"
                  placeholder="25000"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Хамгийн их тасалбар *</label>
                <input
                  type="number"
                  name="maximumTickets"
                  value={form.maximumTickets}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/30 border border-tertiary/50 rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-tertiary"
                  placeholder="5000"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Дуусах огноо *</label>
              <input
                type="datetime-local"
                name="drawDate"
                value={form.drawDate}
                onChange={handleChange}
                required
                className="w-full bg-black/30 border border-tertiary/50 rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-tertiary"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Зургийн URL-ууд (мөр бүр нэг URL)</label>
              <textarea
                name="images"
                value={form.images}
                onChange={handleChange}
                rows={3}
                className="w-full bg-black/30 border border-tertiary/50 rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-tertiary resize-none font-mono text-sm"
                placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
              />
            </div>
          </div>

          {/* Bank Account */}
          <div className="bg-gradient-to-br from-primary to-secondary border border-tertiary/50 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-text-main mb-4">💳 Дансны мэдээлэл</h2>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Банкны нэр</label>
              <input
                type="text"
                name="bankName"
                value={form.bankName}
                onChange={handleChange}
                className="w-full bg-black/30 border border-tertiary/50 rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-tertiary"
                placeholder="Хаан банк"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Дансны дугаар</label>
              <input
                type="text"
                name="accountNumber"
                value={form.accountNumber}
                onChange={handleChange}
                className="w-full bg-black/30 border border-tertiary/50 rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-tertiary"
                placeholder="5000123456"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Дансны эзэмшигч</label>
              <input
                type="text"
                name="accountName"
                value={form.accountName}
                onChange={handleChange}
                className="w-full bg-black/30 border border-tertiary/50 rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-tertiary"
                placeholder="НЭРГҮЙ"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-tertiary to-accent hover:from-accent hover:to-tertiary text-white py-4 rounded-xl font-bold text-lg transition-all disabled:opacity-50 active:scale-[0.98]"
          >
            {loading ? "Үүсгэж байна..." : "✨ Сугалаа үүсгэх"}
          </button>
        </form>
      </main>
    </div>
  );
}
