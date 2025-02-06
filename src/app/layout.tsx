import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Che Steam",
  description: "Web para el bot de Discord Che Steam!",
  authors: [{ name: "Nahuel Fernandez Beschtedt" }],
  icons: {
    icon: "/CheSteam.png",
    shortcut: "/CheSteam.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Header />
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
