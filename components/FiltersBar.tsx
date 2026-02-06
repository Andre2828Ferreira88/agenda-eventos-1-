"use client";

import { useMemo, useState } from "react";
import { UiEvent } from "@/lib/types";

type Props = { items: UiEvent[]; onChange: (filtered: UiEvent[]) => void; };

function uniqSorted(arr: string[]) {
  return Array.from(new Set(arr.filter(Boolean))).sort((a,b)=>a.localeCompare(b));
}

export default function FiltersBar({ items, onChange }: Props) {
  const marcas = useMemo(() => uniqSorted(items.map(i => i.marca || "")), [items]);
  const cats   = useMemo(() => uniqSorted(items.map(i => i.categoria || "")), [items]);

  const [q, setQ] = useState("");
  const [marca, setMarca] = useState("");
  const [cat, setCat] = useState("");

  function apply(nextQ=q, nextMarca=marca, nextCat=cat) {
    const qq = nextQ.toLowerCase().trim();
    const filtered = items.filter(ev => {
      const okMarca = !nextMarca || ev.marca === nextMarca;
      const okCat = !nextCat || ev.categoria === nextCat;
      const blob = `${ev.title} ${ev.description||""} ${ev.location||""} ${ev.marca||""} ${ev.categoria||""} ${ev.cidade||""}`.toLowerCase();
      const okQ = !qq || blob.includes(qq);
      return okMarca && okCat && okQ;
    });
    onChange(filtered);
  }

  return (
    <div className="card p-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <div className="md:col-span-2">
          <label className="text-xs font-bold" style={{ color:"var(--muted)" }}>Buscar</label>
          <input
            value={q}
            onChange={(e)=>{ setQ(e.target.value); apply(e.target.value, marca, cat); }}
            placeholder="Ex: treinamento, barueri, bosch..."
            className="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none"
            style={{ borderColor:"var(--border)" }}
          />
        </div>

        <div>
          <label className="text-xs font-bold" style={{ color:"var(--muted)" }}>Marca</label>
          <select
            value={marca}
            onChange={(e)=>{ setMarca(e.target.value); apply(q, e.target.value, cat); }}
            className="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none"
            style={{ borderColor:"var(--border)" }}
          >
            <option value="">Todas</option>
            {marcas.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        <div>
          <label className="text-xs font-bold" style={{ color:"var(--muted)" }}>Categoria</label>
          <select
            value={cat}
            onChange={(e)=>{ setCat(e.target.value); apply(q, marca, e.target.value); }}
            className="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none"
            style={{ borderColor:"var(--border)" }}
          >
            <option value="">Todas</option>
            {cats.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button className="btn btn-ghost" onClick={()=>{ setQ(""); setMarca(""); setCat(""); onChange(items); }}>
          Limpar filtros
        </button>
        <span className="text-xs" style={{ color:"var(--muted)" }}>
          Dica: na descrição do evento use “Marca: X” e “Categoria: Y”.
        </span>
      </div>
    </div>
  );
}
