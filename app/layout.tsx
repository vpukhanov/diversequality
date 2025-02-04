import Link from "next/link";

import "./globals.css";
import { PostHogProvider } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-serif antialiased">
        <PostHogProvider>
          <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-between px-6 py-16">
            {children}
            <footer className="mt-8 text-center text-sm text-muted-foreground">
              <div className="space-x-4">
                <a
                  href="https://github.com/vpukhanov/diversequality"
                  target="_blank"
                  className="underline hover:text-foreground"
                >
                  Source Code
                </a>
                <span>·</span>
                <Link
                  href="/privacy"
                  className="underline hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </div>
            </footer>
          </div>
        </PostHogProvider>
      </body>
    </html>
  );
}
