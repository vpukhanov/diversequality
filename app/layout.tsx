import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Diversequality",
  description:
    "Look at the global events through the lens of diversity and inclusion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
