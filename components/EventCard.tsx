import Link from "next/link";
import { UiEvent } from "@/lib/types";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("pt-BR", { day:"2-digit", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit" });
}

export default function EventCard({ ev }: { ev: UiEvent }) {
  return (
    <Link href={`/evento/${ev.id}`} className="card block p-5 transition hover:-translate-y-0.5 hover:shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-black">{ev.title}</div>
          <div className="mt-1 text-xs" style={{ color:"var(--muted)" }}>
            {formatDate(ev.start)} {ev.location ? `• ${ev.location}` : ""}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {ev.marca && <span className="badge">Marca: {ev.marca}</span>}
            {ev.categoria && <span className="badge">Categoria: {ev.categoria}</span>}
            {ev.cidade && <span className="badge">Cidade: {ev.cidade}</span>}
          </div>
        </div>

        <div className="shrink-0">
          <div className="h-10 w-10 rounded-2xl flex items-center justify-center"
            style={{ background:"var(--panel)", border:"1px solid var(--border)" }}>
            <span className="text-lg">📅</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
