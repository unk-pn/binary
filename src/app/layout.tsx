import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "@/components/Header/Header";
import { ClientI18nProvider } from "@/components/ClientI18nProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Binary Game",
  description: "A fun and challenging binary game mode by @unk-pn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientI18nProvider>
      <ClerkProvider>
        <html lang="en">
          <head>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function() {
                    const theme = localStorage.getItem('theme') || 'dark';
                    document.documentElement.classList.toggle('dark', theme === 'dark');
                  })();
                `,
              }}
            />
          </head>
          <body className={`${geistSans.variable} ${geistMono.variable}`}>
            <Header />
            <main>{children}</main>
          </body>
        </html>
      </ClerkProvider>
    </ClientI18nProvider>
  );
}
