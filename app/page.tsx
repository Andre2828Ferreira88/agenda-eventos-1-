import EventCard from "@/components/EventCard";
import Link from "next/link";
import { UiEvent } from "@/lib/types";
import { getBaseUrl } from "@/lib/baseUrl";

async function getEvents(): Promise<UiEvent[]> {
  const base = getBaseUrl();
  const url = new URL(`${base}/api/events`);
  url.searchParams.set("timeMin", new Date().toISOString());
  const res = await fetch(url.toString(), { cache: "no-store" });
  const data = await res.json();
  return data.items || [];
}

export default async function HomePage() {
  const items = await getEvents();
  const next3 = items.slice(0, 3);

  return (
    <div className="container-max">
      <section className="pt-10">
        <div className="card p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="badge">Agenda pública</div>
              <h1 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">Agenda de Eventos</h1>
              <p className="mt-2 max-w-xl text-sm" style={{ color:"var(--muted)" }}>
                Visual clean, rápido e organizado. Filtre por marca e categoria e compartilhe o link com qualquer pessoa.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link className="btn btn-primary" href="/calendario">Abrir calendário</Link>
                <a className="btn btn-ghost" href="#proximos">Ver próximos</a>
              </div>
            </div>

            <div className="md:w-[360px]">
              <div className="rounded-2xl p-5" style={{ background:"var(--panel)", border:"1px solid var(--border)" }}>
                <div className="text-xs font-black">Dica de cadastro</div>
                <p className="mt-2 text-sm" style={{ color:"var(--muted)" }}>
                  Na descrição do evento, use linhas assim:
                  <br /><span className="font-semibold" style={{ color:"var(--text)" }}>Marca:</span> Bosch
                  <br /><span className="font-semibold" style={{ color:"var(--text)" }}>Categoria:</span> Treinamento
                  <br /><span className="font-semibold" style={{ color:"var(--text)" }}>Cidade:</span> Barueri
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="proximos" className="mt-8">
        <div className="flex items-end justify-between">
          <h2 className="text-lg font-black">Próximos eventos</h2>
          <Link href="/calendario" className="text-sm font-bold" style={{ color:"var(--brand)" }}>Ver tudo →</Link>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {next3.map(ev => <EventCard key={ev.id} ev={ev} />)}
          {!next3.length && (
            <div className="card p-6 text-sm" style={{ color:"var(--muted)" }}>
              Nenhum evento encontrado. Crie eventos no Google Calendar e recarregue.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
