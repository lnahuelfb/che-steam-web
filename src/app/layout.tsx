import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components";


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
    <html lang="en">
      <body >
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
