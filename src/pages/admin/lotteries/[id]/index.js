import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function EditLottery() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    ticketsSold: "",
    maximumTickets: "",
    drawDate: "",
    images: "",
    accountNumber: "",
    accountName: "",
    bankName: "",
    isHidden: false,
  });

  useEffect(() => {
    if (id) {
      fetchLottery();
    }
  }, [id]);

  const fetchLottery = async () => {
    try {
      const res = await fetch(`/api/admin/lotteries/${id}`);
      const data = await res.json();

      if (res.ok && data.lottery) {
        const lottery = data.lottery;
        setForm({
          title: lottery.title || "",
          description: lottery.description || "",
          price: lottery.price?.toString() || "",
          ticketsSold: lottery.ticketsSold?.toString() || "0",
          maximumTickets: lottery.maximumTickets?.toString() || "",
          drawDate: lottery.drawDate ? lottery.drawDate.slice(0, 16) : "",
          images: (lottery.images || []).join("\n"),
          accountNumber: lottery.accountNumber || "",
          accountName: lottery.accountName || "",
          bankName: lottery.bankName || "",
          isHidden: lottery.isHidden || false,
        });
      }
    } catch (err) {
      setError("Мэдээлэл ачааллахад алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/lotteries/${id}`, {
        method: "PUT",
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
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-gray-400">Уншиж байна...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-to-r from-secondary to-primary text-text-main py-6 px-6 shadow-lg">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Link
            href="/admin"
            className="text-white bg-primary hover:bg-primary/50 hover:text-white px-4 py-2 rounded-lg transition-colors"
          >
            ← Буцах
          </Link>
          <h1 className="text-2xl font-bold">✏️ Сугалаа засах #{id}</h1>
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
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Үнэ (₮) *</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/30 border border-tertiary/50 rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-tertiary"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Зарагдсан</label>
                <input
                  type="number"
                  name="ticketsSold"
                  value={form.ticketsSold}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-tertiary/50 rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-tertiary"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Хамгийн их *</label>
                <input
                  type="number"
                  name="maximumTickets"
                  value={form.maximumTickets}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/30 border border-tertiary/50 rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-tertiary"
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
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                name="isHidden"
                id="isHidden"
                checked={form.isHidden}
                onChange={handleChange}
                className="w-5 h-5 accent-accent bg-black/30 border border-tertiary/50 rounded"
              />
              <label htmlFor="isHidden" className="text-text-main font-medium cursor-pointer">
                Нийтээс нуух (Hidden)
              </label>
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
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-gradient-to-r from-tertiary to-accent hover:from-accent hover:to-tertiary text-white py-4 rounded-xl font-bold text-lg transition-all disabled:opacity-50 active:scale-[0.98]"
          >
            {saving ? "Хадгалж байна..." : "💾 Хадгалах"}
          </button>
        </form>
      </main>
    </div>
  );
}
