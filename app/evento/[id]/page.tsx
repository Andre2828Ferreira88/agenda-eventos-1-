import Link from "next/link";
import { UiEvent } from "@/lib/types";
import { getBaseUrl } from "@/lib/baseUrl";

async function getEventById(id: string): Promise<UiEvent | null> {
  const base = getBaseUrl();
  const url = new URL(`${base}/api/events`);
  const d = new Date();
  d.setFullYear(d.getFullYear() - 1);
  url.searchParams.set("timeMin", d.toISOString());

  const res = await fetch(url.toString(), { cache: "no-store" });
  const data = await res.json();
  const items: UiEvent[] = data.items || [];
  return items.find(i => i.id === id) || null;
}

function format(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("pt-BR", { weekday:"short", day:"2-digit", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit" });
}

export default async function EventPage({ params }: { params: { id: string } }) {
  const ev = await getEventById(params.id);

  if (!ev) {
    return (
      <div className="container-max pt-10">
        <div className="card p-8">
          <h1 className="text-xl font-black">Evento não encontrado</h1>
          <p className="mt-2 text-sm" style={{ color:"var(--muted)" }}>Volte ao calendário e tente novamente.</p>
          <Link className="btn btn-primary mt-5" href="/calendario">Voltar</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-max pt-10">
      <div className="card p-8">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            {ev.marca && <span className="badge">Marca: {ev.marca}</span>}
            {ev.categoria && <span className="badge">Categoria: {ev.categoria}</span>}
            {ev.cidade && <span className="badge">Cidade: {ev.cidade}</span>}
          </div>

          <h1 className="mt-3 text-2xl font-black">{ev.title}</h1>

          <div className="mt-2 text-sm" style={{ color:"var(--muted)" }}>
            <div><span className="font-bold" style={{ color:"var(--text)" }}>Quando:</span> {format(ev.start)} {ev.end ? `→ ${format(ev.end)}` : ""}</div>
            {ev.location && <div className="mt-1"><span className="font-bold" style={{ color:"var(--text)" }}>Local:</span> {ev.location}</div>}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link className="btn btn-primary" href="/calendario">Ver calendário</Link>
            {ev.htmlLink && <a className="btn btn-ghost" href={ev.htmlLink} target="_blank" rel="noreferrer">Abrir no Google Calendar</a>}
          </div>

          {ev.description && (
            <div className="mt-8 rounded-2xl p-5" style={{ background:"var(--panel)", border:"1px solid var(--border)" }}>
              <div className="text-sm font-black">Descrição</div>
              <pre className="mt-2 whitespace-pre-wrap text-sm leading-relaxed" style={{ color:"var(--muted)", fontFamily:"inherit" }}>
                {ev.description}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
