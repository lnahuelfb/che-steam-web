import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import "./globals.css";

export const metadata: Metadata = {
  title: "Che Steam!",
  description: "Web para el bot de Discord Che Steam!",
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
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
