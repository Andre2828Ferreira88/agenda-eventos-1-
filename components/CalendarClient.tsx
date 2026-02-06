"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { UiEvent } from "@/lib/types";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

export default function CalendarClient({ events }: { events: UiEvent[] }) {
  const router = useRouter();

  const fcEvents = useMemo(() => events.map(ev => ({
    id: ev.id, title: ev.title, start: ev.start, end: ev.end, extendedProps: ev
  })), [events]);

  return (
    <div className="card p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{ left:"prev,next today", center:"title", right:"dayGridMonth,timeGridWeek,listWeek" }}
        height="auto"
        events={fcEvents}
        eventClick={(info)=> router.push(`/evento/${info.event.id}`)}
        eventTimeFormat={{ hour:"2-digit", minute:"2-digit", hour12:false }}
        nowIndicator
        dayMaxEventRows={3}
      />
    </div>
  );
}
