import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Rehman Farouq",
  "url": "https://rehmanfarouq.site",
  "image": "https://rehmanfarouq.site/images/profile'photo.jpeg",
  "sameAs": [
    "https://github.com/Rehman532",
    "https://www.linkedin.com/in/rehman-farouq-93727526b",
    "https://x.com/RehmanFarouq"
  ],
  "jobTitle": "Flutter & Next.js Developer",
  "worksFor": {
    "@type": "Organization",
    "name": "Freelance"
  },
  "knowsAbout": [
    "Flutter",
    "Next.js",
    "React Native",
    "TypeScript",
    "Tailwind CSS",
    "Firebase",
    "Mobile App Development",
    "Web Development",
    "UI/UX Design"
  ],
  "offers": {
    "@type": "Service",
    "serviceType": "Mobile and Web Development",
    "description": "Full-stack development services specializing in Flutter and Next.js applications"
  }
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rehman Farouq - Flutter & Next.js Developer | Portfolio",
  description: "Portfolio of Rehman Farouq, a Flutter and Next.js developer specializing in modern mobile and web applications. Expert in cross-platform development, UI/UX design, and full-stack solutions.",
  keywords: [
    "Flutter Developer",
    "Next.js Developer", 
    "Mobile App Development",
    "Web Development",
    "React Native",
    "TypeScript",
    "Tailwind CSS",
    "Firebase",
    "Full Stack Developer",
    "UI/UX Design",
    "Cross Platform",
    "Portfolio",
    "Rehman Farouq"
  ],
  authors: [{ name: "Rehman Farouq" }],
  creator: "Rehman Farouq",
  publisher: "Rehman Farouq",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://rehmanfarouq.site"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Rehman Farouq - Flutter & Next.js Developer",
    description: "Portfolio of Rehman Farouq, a Flutter and Next.js developer specializing in modern mobile and web applications.",
    url: "https://rehmanfarouq.site",
    siteName: "Rehman Farouq Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rehman Farouq - Flutter & Next.js Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rehman Farouq - Flutter & Next.js Developer",
    description: "Portfolio of Rehman Farouq, a Flutter and Next.js developer specializing in modern mobile and web applications.",
    images: ["/images/og-image.jpg"],
    creator: "@rehmanfarouq",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "Af031QRH-FLO9XpOc3-tLuG5Cfl66H05TS98FE9gaiQ",
    yandex: "35172ef26395dce4",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300`}
      >
        <ThemeProvider>
          {children}
          <ThemeToggle />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
