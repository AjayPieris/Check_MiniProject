import React, { useEffect, useMemo, useState } from "react";
import { deleteDispute, getAllDisputes, updateDispute } from "../../api/distipute";
import Reveal from "../motion/Reveal1";

function StatusDot({ status = "open" }) {
  const map = {
    open: "bg-amber-500",
    resolved: "bg-emerald-600",
    escalated: "bg-rose-600",
  };
  return <span className={`inline-block h-2.5 w-2.5 rounded-full ${map[status] || "bg-neutral-400"}`} />;
}

export default function DisputesPanel() {
  const [disputes, setDisputes] = useState([]); // always an array
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAllDisputes(q ? `q=${encodeURIComponent(q)}` : "");
      setDisputes(Array.isArray(data) ? data : []); // guard
    } catch (e) {
      console.error(e);
      setError(e.message || "Failed to load disputes");
      setDisputes([]); // ensure array to avoid .map crash
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearch = () => load();

  const setStatus = async (id, status) => {
    try {
      await updateDispute(id, { status });
      // Optimistic update
      setDisputes((prev) =>
        prev.map((d) => (d._id === id || d.id === id ? { ...d, status } : d))
      );
    } catch (e) {
      alert(e.message || "Failed to update status");
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this dispute?")) return;
    try {
      await deleteDispute(id);
      setDisputes((prev) => prev.filter((d) => !(d._id === id || d.id === id)));
    } catch (e) {
      alert(e.message || "Failed to delete dispute");
    }
  };

  // Final guard before render
  const list = useMemo(() => (Array.isArray(disputes) ? disputes : []), [disputes]);

  return (
    <div className="mt-6">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xl font-extrabold text-neutral-900">Disputes</h3>
        <div className="flex items-center gap-2">
          <input
            placeholder="Search disputes..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-400/40"
          />
          <button onClick={onSearch} className="rounded-lg bg-neutral-900 px-3 py-2 text-sm font-semibold text-white">
            Search
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-3 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-neutral-500">Loading...</div>
      ) : list.length === 0 ? (
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-neutral-500">No disputes.</div>
      ) : (
        <div className="space-y-4">
          {list.map((d) => {
            const id = d._id || d.id;
            const status = d.status || "open";
            return (
              <Reveal key={id}>
                <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <StatusDot status={status} />
                        <span className="font-medium capitalize">{status}</span>
                      </div>
                      <div className="mt-1 text-base font-semibold text-neutral-900">
                        {d.title || d.subject || "Dispute"}
                      </div>
                      <div className="mt-1 text-sm text-neutral-700">
                        {d.message || d.description || "-"}
                      </div>
                      <div className="mt-2 text-xs text-neutral-500">
                        Opened: {d.createdAt ? new Date(d.createdAt).toLocaleString() : "-"}
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      {status !== "resolved" && (
                        <button
                          onClick={() => setStatus(id, "resolved")}
                          className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white"
                        >
                          Mark resolved
                        </button>
                      )}
                      <button
                        onClick={() => remove(id)}
                        className="rounded-lg bg-rose-600 px-3 py-2 text-sm font-semibold text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      )}
    </div>
  );
}