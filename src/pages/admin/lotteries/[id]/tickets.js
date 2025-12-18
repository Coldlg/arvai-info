import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function LotteryTickets() {
  const router = useRouter();
  const { id } = router.query;
  const [lottery, setLottery] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // New ticket form
  const [showForm, setShowForm] = useState(false);
  const [newTicket, setNewTicket] = useState({
    phone_number: "",
    amount_paid: "",
  });
  const [saving, setSaving] = useState(false);

  // Edit modal
  const [editingTicket, setEditingTicket] = useState(null);

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id, page]);

  const fetchData = async (ticketsOnly = false) => {
    if (ticketsOnly) {
      setTableLoading(true);
    } else {
      setLoading(true);
    }
    try {
      if (!ticketsOnly) {
        const lotteryRes = await fetch(`/api/admin/lotteries/${id}`);
        const lotteryData = await lotteryRes.json();
        if (lotteryRes.ok) setLottery(lotteryData.lottery);
      }

      const ticketsRes = await fetch(`/api/admin/tickets?lotteryId=${id}&page=${page}&limit=50`);
      const ticketsData = await ticketsRes.json();

      if (ticketsRes.ok) {
        setTickets(ticketsData.tickets || []);
        setTotalPages(ticketsData.totalPages || 1);
        setTotal(ticketsData.total || 0);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
      setTableLoading(false);
    }
  };

  const fetchTicketsOnly = () => fetchData(true);

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const ticketPrice = lottery?.price || 25000;
      const amountPaid = parseFloat(newTicket.amount_paid) || ticketPrice;
      const ticketCount = Math.floor(amountPaid / ticketPrice);

      if (ticketCount < 1) {
        alert(`Төлсөн дүн хамгийн багадаа ${ticketPrice.toLocaleString()}₮ байх ёстой`);
        setSaving(false);
        return;
      }

      // Get the highest ticket number from the API to avoid conflicts
      const maxRes = await fetch(`/api/admin/tickets?lotteryId=${id}&page=1&limit=1`);
      const maxData = await maxRes.json();
      let nextNumber = maxData.total + 1;

      // Create multiple tickets
      const pricePerTicket = amountPaid / ticketCount;

      for (let i = 0; i < ticketCount; i++) {
        const res = await fetch("/api/admin/tickets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lottery_id: id,
            ticket_number: nextNumber + i,
            phone_number: newTicket.phone_number,
            amount_paid: pricePerTicket,
          }),
        });

        if (!res.ok) {
          const data = await res.json();
          console.error("Error creating ticket:", data.error);
        }
      }

      setNewTicket({ phone_number: "", amount_paid: "" });
      setShowForm(false);
      fetchTicketsOnly();

      if (ticketCount > 1) {
        alert(`${ticketCount} тасалбар амжилттай нэмэгдлээ!`);
      }
    } catch (err) {
      console.error("Error creating ticket:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateTicket = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/tickets/${editingTicket.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_number: editingTicket.phone_number,
          amount_paid: editingTicket.amount_paid,
          is_winner: editingTicket.is_winner,
        }),
      });

      if (res.ok) {
        setEditingTicket(null);
        fetchTicketsOnly();
      }
    } catch (err) {
      console.error("Error updating ticket:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTicket = async (ticketId) => {
    if (!confirm("Энэ тасалбарыг устгах уу?")) return;

    try {
      const res = await fetch(`/api/admin/tickets/${ticketId}`, { method: "DELETE" });
      if (res.ok) {
        fetchTicketsOnly();
      }
    } catch (err) {
      console.error("Error deleting ticket:", err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-to-r from-secondary to-primary text-text-main py-6 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="text-white bg-primary hover:bg-primary/50 hover:text-white px-4 py-2 rounded-lg transition-colors"
            >
              ← Буцах
            </Link>
            <h1 className="text-2xl font-bold">🎫 {lottery?.title || "..."} - Тасалбарууд</h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-tertiary to-accent hover:from-accent hover:to-tertiary text-white px-4 py-2 rounded-lg font-semibold transition-all"
          >
            {showForm ? "✕ Хаах" : "+ Шинэ тасалбар"}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-primary to-secondary border border-tertiary/50 rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-1">Нийт</p>
            <p className="text-2xl font-bold text-text-main">{total}</p>
          </div>
          <div className="bg-gradient-to-br from-primary to-secondary border border-tertiary/50 rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-1">Үнэ</p>
            <p className="text-2xl font-bold text-accent">{lottery?.price?.toLocaleString()}₮</p>
          </div>
          <div className="bg-gradient-to-br from-primary to-secondary border border-tertiary/50 rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-1">Нийт орлого</p>
            <p className="text-2xl font-bold text-green-400">
              {tickets.reduce((acc, t) => acc + t.amount_paid, 0).toLocaleString()}₮
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary to-secondary border border-tertiary/50 rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-1">Хуудас</p>
            <p className="text-2xl font-bold text-text-main">
              {page}/{totalPages}
            </p>
          </div>
        </div>

        {/* New Ticket Form */}
        {showForm && (
          <form
            onSubmit={handleCreateTicket}
            className="bg-gradient-to-br from-primary to-secondary border border-tertiary/50 rounded-xl p-6 mb-6"
          >
            <h3 className="text-lg font-bold text-text-main mb-4">Шинэ тасалбар нэмэх</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Утасны дугаар *"
                value={newTicket.phone_number}
                onChange={(e) => setNewTicket({ ...newTicket, phone_number: e.target.value })}
                required
                className="bg-black/30 border border-tertiary/50 rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-tertiary"
              />
              <input
                type="number"
                placeholder={`Төлсөн дүн (${lottery?.price})`}
                value={newTicket.amount_paid}
                onChange={(e) => setNewTicket({ ...newTicket, amount_paid: e.target.value })}
                className="bg-black/30 border border-tertiary/50 rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-tertiary"
              />
              <button
                type="submit"
                disabled={saving}
                className="bg-gradient-to-r from-tertiary to-accent text-white py-3 rounded-lg font-bold transition-all disabled:opacity-50"
              >
                {saving ? "Нэмж байна..." : "Нэмэх"}
              </button>
            </div>
          </form>
        )}

        {/* Tickets Table */}
        <div className="bg-gradient-to-br from-primary to-secondary border border-tertiary/50 rounded-xl overflow-hidden">
          {/* Top Pagination */}
          {totalPages > 1 && (
            <div className="p-4 border-b border-tertiary/20 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1 || tableLoading}
                className="px-4 py-2 rounded-lg bg-black/30 text-gray-400 hover:text-white disabled:opacity-50 transition-colors"
              >
                ← Өмнөх
              </button>
              <div className="flex items-center gap-2 px-2">
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={page}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (val >= 1 && val <= totalPages) {
                      setPage(val);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const val = parseInt(e.target.value);
                      if (val >= 1 && val <= totalPages) {
                        setPage(val);
                      }
                    }
                  }}
                  disabled={tableLoading}
                  className="w-16 bg-black/30 border border-tertiary/50 rounded-lg px-2 py-1 text-text-main text-center focus:outline-none focus:border-tertiary disabled:opacity-50"
                />
                <span className="text-gray-400">/ {totalPages}</span>
              </div>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages || tableLoading}
                className="px-4 py-2 rounded-lg bg-black/30 text-gray-400 hover:text-white disabled:opacity-50 transition-colors"
              >
                Дараах →
              </button>
            </div>
          )}

          {loading ? (
            <div className="p-8 text-center text-gray-400">Уншиж байна...</div>
          ) : tickets.length === 0 ? (
            <div className="p-8 text-center text-gray-400">Тасалбар олдсонгүй</div>
          ) : (
            <>
              <div className={`overflow-x-auto ${tableLoading ? "opacity-50 pointer-events-none" : ""}`}>
                <table className="w-full">
                  <thead className="bg-black/20">
                    <tr className="text-left text-gray-400 text-sm">
                      <th className="px-4 py-3 font-medium">#</th>
                      <th className="px-4 py-3 font-medium">Утас</th>
                      <th className="px-4 py-3 font-medium">Төлсөн</th>
                      <th className="px-4 py-3 font-medium">Огноо</th>
                      <th className="px-4 py-3 font-medium">Хожил</th>
                      <th className="px-4 py-3 font-medium">Үйлдэл</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-tertiary/20">
                    {tickets.map((ticket) => (
                      <tr key={ticket.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-4 py-3 text-accent font-bold">#{ticket.ticket_number}</td>
                        <td className="px-4 py-3 text-text-main">{ticket.phone_number}</td>
                        <td className="px-4 py-3 text-green-400">{ticket.amount_paid.toLocaleString()}₮</td>
                        <td className="px-4 py-3 text-gray-400 text-sm">
                          {new Date(ticket.created_at).toLocaleString("mn-MN", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="px-4 py-3">
                          {ticket.is_winner ? (
                            <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs font-bold">
                              🏆 ХОЖИГЧ
                            </span>
                          ) : (
                            <span className="text-gray-500 text-xs">-</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditingTicket(ticket)}
                              className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
                            >
                              Засах
                            </button>
                            <button
                              onClick={() => handleDeleteTicket(ticket.id)}
                              className="text-red-400 hover:text-red-300 text-sm transition-colors"
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

              {/* Bottom Pagination */}
              {totalPages > 1 && (
                <div className="p-4 border-t border-tertiary/20 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1 || tableLoading}
                    className="px-4 py-2 rounded-lg bg-black/30 text-gray-400 hover:text-white disabled:opacity-50 transition-colors"
                  >
                    ← Өмнөх
                  </button>
                  <span className="text-gray-400 px-4">
                    {page} / {totalPages}
                  </span>
                  <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages || tableLoading}
                    className="px-4 py-2 rounded-lg bg-black/30 text-gray-400 hover:text-white disabled:opacity-50 transition-colors"
                  >
                    Дараах →
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Edit Modal */}
        {editingTicket && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <form
              onSubmit={handleUpdateTicket}
              className="bg-gradient-to-br from-primary to-secondary border border-tertiary/50 rounded-xl p-6 w-full max-w-md space-y-4"
            >
              <h3 className="text-lg font-bold text-text-main">Тасалбар #{editingTicket.ticket_number} засах</h3>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Утасны дугаар</label>
                <input
                  type="text"
                  value={editingTicket.phone_number}
                  onChange={(e) => setEditingTicket({ ...editingTicket, phone_number: e.target.value })}
                  className="w-full bg-black/30 border border-tertiary/50 rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-tertiary"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Төлсөн дүн</label>
                <input
                  type="number"
                  value={editingTicket.amount_paid}
                  onChange={(e) => setEditingTicket({ ...editingTicket, amount_paid: parseFloat(e.target.value) })}
                  className="w-full bg-black/30 border border-tertiary/50 rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-tertiary"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="is_winner"
                  checked={editingTicket.is_winner}
                  onChange={(e) => setEditingTicket({ ...editingTicket, is_winner: e.target.checked })}
                  className="w-5 h-5 rounded border-tertiary/50"
                />
                <label htmlFor="is_winner" className="text-text-main">
                  🏆 Хожигч болгох
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingTicket(null)}
                  className="flex-1 bg-black/30 text-gray-400 py-3 rounded-lg font-semibold transition-colors hover:bg-black/50"
                >
                  Болих
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-gradient-to-r from-tertiary to-accent text-white py-3 rounded-lg font-bold transition-all disabled:opacity-50"
                >
                  {saving ? "..." : "Хадгалах"}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
