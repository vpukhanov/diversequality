import Footer from "@/components/footer";

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
            <Footer />
          </div>
        </PostHogProvider>
      </body>
    </html>
  );
}
