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
  name: "Rehman Farouq",
  url: "https://rehmanfarouq.site",
  image: "https://rehmanfarouq.site/images/profile'photo.jpeg",
  sameAs: [
    "https://github.com/Rehman532",
    "https://www.linkedin.com/in/rehman-farouq-93727526b",
    "https://x.com/RehmanFarouq",
  ],
  jobTitle: "Flutter & Next.js Developer",
  worksFor: {
    "@type": "Organization",
    name: "Freelance",
  },
  knowsAbout: [
    "Flutter",
    "Next.js",
    "React Native",
    "TypeScript",
    "Tailwind CSS",
    "Firebase",
    "Mobile App Development",
    "Web Development",
    "UI/UX Design",
  ],
  offers: {
    "@type": "Service",
    serviceType: "Mobile and Web Development",
    description:
      "Full-stack development services specializing in Flutter and Next.js applications",
  },
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
  description:
    "Portfolio of Rehman Farouq, a Flutter and Next.js developer specializing in modern mobile and web applications. Expert in cross-platform development, UI/UX design, and full-stack solutions.",
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
    "React Developer",
    "JavaScript Developer",
    "TypeScript Developer",
    "Frontend Developer",
    "Backend Developer",
    "Freelance Developer",
    "Software Engineer",
    "Web Application Developer",
    "Mobile App Programmer",
    "Cross Platform Development",
    "UI UX Designer",
    "Firebase Developer",
    "Dart Programmer",
    "Next.js Expert",
    "React TypeScript Developer",
    "Freelance Full Stack Developer",
    "Modern Web Development",
    "Mobile Web Development",
    "Responsive Web Design",
    "Progressive Web Apps",
    "Single Page Applications",
    "API Development",
    "REST API Development",
    "GraphQL Developer",
    "Database Development",
    "PostgreSQL Developer",
    "MongoDB Developer",
    "Cloud Development",
    "AWS Developer",
    "Google Cloud Developer",
    "Azure Developer",
    "DevOps Engineer",
    "Git Version Control",
    "GitHub Developer",
    "GitLab Developer",
    "Agile Development",
    "Scrum Master",
    "Software Architecture",
    "Microservices Developer",
    "Serverless Development",
    "JAMstack Developer",
    "MERN Stack Developer",
    "MEAN Stack Developer",
    "LAMP Stack Developer",
    "WordPress Developer",
    "Shopify Developer",
    "E-commerce Development",
    "Fintech Developer",
    "Healthcare App Developer",
    "Education App Developer",
    "Real Estate App Developer",
    "Social Media App Developer",
    "Gaming App Developer",
    "Productivity Apps",
    "Business Applications",
    "Enterprise Software",
    "Startup Developer",
    "MVP Development",
    "Prototype Development",
    "Software Consulting",
    "Code Review",
    "Technical Writing",
    "Programming Tutorials",
    "Coding Bootcamp",
    "Online Courses",
    "Tech Blog",
    "Programming Resources",
    "Developer Community",
    "Open Source Contributor",
    "Software Testing",
    "QA Engineer",
    "Performance Optimization",
    "SEO Specialist",
    "Web Accessibility",
    "WCAG Compliance",
    "Responsive Design",
    "Mobile First Design",
    "Progressive Web Apps",
    "PWA Developer",
    "Service Worker",
    "Web Manifest",
    "Push Notifications",
    "Offline First Development",
    "Rehman Farouq",
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
    description:
      "Portfolio of Rehman Farouq, a Flutter and Next.js developer specializing in modern mobile and web applications.",
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
    description:
      "Portfolio of Rehman Farouq, a Flutter and Next.js developer specializing in modern mobile and web applications.",
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
  other: {
    "og:locale": "en_US",
    "article:author": "Rehman Farouq",
    "theme-color": "#000000",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#000000",
    "msapplication-config": "/browserconfig.xml",
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
        {/* Essential Meta Tags */}
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes"
        />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

        {/* Theme and App Meta Tags */}
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Rehman Farouq" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#000000" />

        {/* SEO Meta Tags */}
        <meta name="language" content="en-US" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="Rehman Farouq" />
        <meta name="email" content="rehmanfarouq9@gmail.com" />
        <meta
          name="copyright"
          content="© 2024-2026 Rehman Farouq. All rights reserved."
        />

        {/* Preconnect to External Resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://cdn.vercel-analytics.com" />

        {/* Icon Links */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://rehmanfarouq.site" />

        {/* Structured Data */}
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
