export function getBaseUrl() {
  if (process.env.NODE_ENV === "development") return "http://localhost:3000";
  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return `https://${vercelUrl}`;
  const explicit = process.env.NEXT_PUBLIC_BASE_URL;
  if (explicit) return explicit;
  return "http://localhost:3000";
}
