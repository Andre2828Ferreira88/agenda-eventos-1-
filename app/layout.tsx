import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "Agenda de Eventos",
  description: "Calendário público de eventos — clean, rápido e profissional."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main className="pb-16">{children}</main>
      </body>
    </html>
  );
}
