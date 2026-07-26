import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Developer Tools | Free Online Utilities | JSON Formatter, Converter Tools, Calculator",
  description:
    "Collection of free developer tools including JSON formatter, Base64 converter, color converter, QR code generator, password generator, unit converter, and more. Useful online utilities for web developers and programmers.",
  keywords:
    "developer tools, free online tools, JSON formatter, Base64 converter, color converter, QR code generator, password generator, unit converter, online utilities, web tools, programmer tools, code formatter, developer utilities, HTML encoder, CSS minifier, JSON validator, code beautifier, online tools, useful tools",
  openGraph: {
    title:
      "Developer Tools | Free Online Utilities | JSON Formatter, Converter Tools, Calculator",
    description:
      "Collection of free developer tools including JSON formatter, Base64 converter, color converter, QR code generator, password generator, and more useful online utilities.",
    url: "https://rehmanfarouq.site/tools",
    type: "website",
    siteName: "Rehman Farouq - Developer Tools",
    images: [
      {
        url: "https://rehmanfarouq.site/images/tools-og.jpg",
        width: 1200,
        height: 630,
        alt: "Developer Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Developer Tools | Free Online Utilities",
    description:
      "Collection of free developer tools including JSON formatter, Base64 converter, color converter, QR code generator, and more useful utilities.",
    images: ["https://rehmanfarouq.site/images/tools-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://rehmanfarouq.site/tools",
  },
  other: {
    "og:locale": "en_US",
    "article:author": "Rehman Farouq",
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
