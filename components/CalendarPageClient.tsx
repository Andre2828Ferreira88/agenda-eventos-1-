"use client";

import { useState } from "react";
import { UiEvent } from "@/lib/types";
import FiltersBar from "@/components/FiltersBar";
import CalendarClient from "@/components/CalendarClient";
import EventCard from "@/components/EventCard";

export default function CalendarPageClient({ initial }: { initial: UiEvent[] }) {
  const [filtered, setFiltered] = useState<UiEvent[]>(initial);

  return (
    <div className="mt-6 flex flex-col gap-4">
      <FiltersBar items={initial} onChange={setFiltered} />
      <CalendarClient events={filtered} />

      <div id="agenda" className="mt-2">
        <div className="flex items-end justify-between">
          <h2 className="text-lg font-black">Agenda (lista)</h2>
          <span className="text-sm font-bold" style={{ color:"var(--muted)" }}>{filtered.length} eventos</span>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {filtered.map(ev => <EventCard key={ev.id} ev={ev} />)}
          {!filtered.length && (
            <div className="card p-6 text-sm" style={{ color:"var(--muted)" }}>
              Nenhum evento com esses filtros.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
