import { UiEvent } from "@/lib/types";
import { getBaseUrl } from "@/lib/baseUrl";
import CalendarPageClient from "@/components/CalendarPageClient";

async function getEvents(): Promise<UiEvent[]> {
  const base = getBaseUrl();
  const url = new URL(`${base}/api/events`);
  const d = new Date();
  d.setMonth(d.getMonth() - 2);
  url.searchParams.set("timeMin", d.toISOString());
  const res = await fetch(url.toString(), { cache: "no-store" });
  const data = await res.json();
  return data.items || [];
}

export default async function CalendarPage() {
  const items = await getEvents();

  return (
    <div className="container-max pt-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-black">Calendário</h1>
        <p className="text-sm" style={{ color:"var(--muted)" }}>
          Filtre por marca/categoria e clique em um evento para ver detalhes.
        </p>
      </div>

      <CalendarPageClient initial={items} />
    </div>
  );
}
