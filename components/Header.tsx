import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b"
      style={{ borderColor:"var(--border)", background:"rgba(255,255,255,0.82)", backdropFilter:"blur(10px)" }}>
      <div className="container-max flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl flex items-center justify-center"
            style={{ background:"var(--brand-soft)", border:"1px solid rgba(31,122,63,0.18)" }}>
            <span className="text-sm font-black" style={{ color:"var(--brand)" }}>AE</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-black">Agenda de Eventos</div>
            <div className="text-xs" style={{ color:"var(--muted)" }}>Calendário público</div>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          <Link className="btn btn-ghost" href="/calendario">Calendário</Link>
          <a className="btn btn-primary" href="/calendario#agenda">Ver agenda</a>
        </nav>
      </div>
    </header>
  );
}
