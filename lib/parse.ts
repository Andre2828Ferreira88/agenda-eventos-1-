export function pickTag(desc: string | undefined, key: string): string | undefined {
  if (!desc) return undefined;
  const re = new RegExp(`^\s*${key}\s*:\s*(.+)\s*$`, "im");
  const m = desc.match(re);
  return m?.[1]?.trim();
}
export function normalizeTitle(title: string): string {
  return (title || "").trim().replace(/\s+/g, " ");
}
export function toLowerSafe(s?: string) { return (s || "").toLowerCase(); }
