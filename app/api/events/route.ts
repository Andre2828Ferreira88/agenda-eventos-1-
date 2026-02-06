import { NextResponse } from "next/server";
import { mapGoogleToUi } from "@/lib/google";
import { toLowerSafe } from "@/lib/parse";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const key = process.env.GOOGLE_API_KEY;
  const calId = process.env.GOOGLE_CALENDAR_ID;

  if (!key || !calId) {
    return NextResponse.json(
      { error: "Config faltando. Defina GOOGLE_API_KEY e GOOGLE_CALENDAR_ID no .env.local" },
      { status: 500 }
    );
  }

  const timeMin = searchParams.get("timeMin") || new Date().toISOString();
  const timeMax = searchParams.get("timeMax") || "";
  const marca = searchParams.get("marca") || "";
  const categoria = searchParams.get("categoria") || "";
  const q = searchParams.get("q") || "";

  const base = "https://www.googleapis.com/calendar/v3/calendars";
  const url = new URL(`${base}/${encodeURIComponent(calId)}/events`);
  url.searchParams.set("key", key);
  url.searchParams.set("singleEvents", "true");
  url.searchParams.set("orderBy", "startTime");
  url.searchParams.set("timeMin", timeMin);
  if (timeMax) url.searchParams.set("timeMax", timeMax);
  url.searchParams.set("maxResults", "250");

  const res = await fetch(url.toString(), { next: { revalidate: 60 } });

  if (!res.ok) {
    const txt = await res.text();
    return NextResponse.json({ error: "Falha ao buscar eventos", details: txt }, { status: 500 });
  }

  const data = await res.json();
  const itemsRaw = (data.items || []) as any[];

  const items = itemsRaw
    .map(mapGoogleToUi)
    .filter((ev: any) => {
      const okMarca = !marca || ev.marca === marca;
      const okCat = !categoria || ev.categoria === categoria;

      if (!q) return okMarca && okCat;

      const blob = toLowerSafe(`${ev.title} ${ev.description || ""} ${ev.location || ""} ${ev.marca || ""} ${ev.categoria || ""} ${ev.cidade || ""}`);
      const okQ = blob.includes(toLowerSafe(q));
      return okMarca && okCat && okQ;
    });

  return NextResponse.json({ items });
}
