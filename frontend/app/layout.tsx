import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NTT DATA — AXET-NEURALGRAPH-3D",
  description: "Plataforma Neural 3D e RAG Corporativo de Conhecimento Interconectado",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
