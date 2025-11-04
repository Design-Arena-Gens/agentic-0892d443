import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ГОСТ 19.701-90 Flowcharts",
  description:
    "Набор блок-схем по ГОСТ 19.701-90 (ИСО 5807-85) для функций программы с нисходящей структурой."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <main className="app-shell">{children}</main>
      </body>
    </html>
  );
}
