import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://sanketsaraf.dev"),
  title: "Sanket Rajiv Saraf | AI Engineer · Data Scientist · SDE",
  description:
    "Portfolio of Sanket Rajiv Saraf — AI Engineer, Data Scientist & Software Developer. CGPA 9.2 · 2 Published Research Papers · LLM Agents, RAG, Edge AI, Full-Stack. Open to MLE, SDE & AI Engineer roles.",
  keywords: [
    "AI Engineer", "Machine Learning Engineer", "Data Scientist", "Software Developer",
    "LLM Engineer", "RAG", "LangChain", "Edge AI", "Raspberry Pi AI", "Generative AI",
    "AI Agents", "Python Developer", "Data Science Portfolio", "Research Paper AI",
    "Sanket Saraf", "Sanket Rajiv Saraf", "KJ Somaiya AI", "MLE intern",
    "AI internship India", "NLP", "Deep Learning", "MLOps",
  ],
  authors: [{ name: "Sanket Rajiv Saraf" }],
  creator: "Sanket Rajiv Saraf",
  openGraph: {
    title: "Sanket Rajiv Saraf | AI Engineer · Data Scientist · SDE",
    description: "Building AI systems that ship — LLM agents, RAG pipelines, edge inference on Raspberry Pi. CGPA 9.2 · 2 Research Papers · Open to MLE / SDE / AI Engineer roles.",
    url: "https://sanketsaraf.dev",
    siteName: "Sanket Rajiv Saraf",
    images: [{ url: "/images/sanket-main.jpg", width: 1200, height: 630, alt: "Sanket Rajiv Saraf — AI Engineer & Data Scientist" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanket Rajiv Saraf | AI Engineer · Data Scientist · SDE",
    description: "LLM agents, RAG, edge AI, published researcher. CGPA 9.2 · Open to MLE / SDE roles.",
    images: ["/images/sanket-main.jpg"],
    creator: "@sanketsaraf",
  },
  icons: { icon: "/images/favicon.png", apple: "/images/favicon.png" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        {/* ── Fontshare: Clash Display & Satoshi ── */}
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&f[]=satoshi@500,700&display=swap" rel="stylesheet" />

        {/* ── Google Fonts: Inter + Cormorant Garamond + JetBrains Mono ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Cormorant+Garamond:ital,wght@1,300;1,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {/* ── GSAP + ScrollTrigger (CDN) ── */}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" strategy="beforeInteractive" />
        <meta name="theme-color" content="#E8EBF0" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="antialiased bg-[#E8EBF0] text-[#0F172A]">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
