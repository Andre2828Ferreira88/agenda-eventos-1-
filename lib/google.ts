import { UiEvent } from "./types";
import { normalizeTitle, pickTag } from "./parse";

type GoogleEvent = {
  id: string;
  summary?: string;
  description?: string;
  location?: string;
  htmlLink?: string;
  updated?: string;
  start?: { dateTime?: string; date?: string };
  end?: { dateTime?: string; date?: string };
};

function isoFromStartEnd(start?: {dateTime?:string; date?:string}, end?: {dateTime?:string; date?:string}) {
  const startIso = start?.dateTime || (start?.date ? new Date(start.date).toISOString() : undefined);
  const endIso = end?.dateTime || (end?.date ? new Date(end.date).toISOString() : undefined);
  return { startIso, endIso };
}

export function mapGoogleToUi(ev: GoogleEvent): UiEvent {
  const title = normalizeTitle(ev.summary || "Evento");
  const { startIso, endIso } = isoFromStartEnd(ev.start, ev.end);

  return {
    id: ev.id,
    title,
    description: ev.description,
    location: ev.location,
    htmlLink: ev.htmlLink,
    updated: ev.updated,
    start: startIso || new Date().toISOString(),
    end: endIso,
    marca: pickTag(ev.description, "Marca"),
    categoria: pickTag(ev.description, "Categoria"),
    cidade: pickTag(ev.description, "Cidade")
  };
}
