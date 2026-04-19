import type { Metadata } from "next";
import { DM_Serif_Display, Outfit } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const outfit = Outfit({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FlashMind AI — Study Smarter, Not Harder",
    template: "%s | FlashMind AI",
  },
  description:
    "Paste your notes, get AI-generated flashcards instantly. Study for exams, remember more, stress less. Free for students.",
  keywords: ["AI flashcards", "study tool", "exam preparation", "BCA", "student app"],
  authors: [{ name: "FlashMind" }],
  openGraph: {
    title: "FlashMind AI — Study Smarter, Not Harder",
    description: "Paste your notes, get AI-generated flashcards instantly.",
    url: "https://flashmind.vercel.app",
    siteName: "FlashMind AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlashMind AI",
    description: "Paste your notes, get AI-generated flashcards instantly.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSerif.variable} ${outfit.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-midnight text-cream">
        {children}
      </body>
    </html>
  );
}