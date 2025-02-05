import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-8 space-y-2 text-center text-sm text-muted-foreground">
      <div>AI makes mistakes. Please verify any facts independently.</div>
      <div className="space-x-4">
        <a
          href="https://github.com/vpukhanov/diversequality"
          target="_blank"
          className="underline hover:text-foreground"
        >
          Source Code
        </a>
        <span>·</span>
        <Link href="/privacy" className="underline hover:text-foreground">
          Privacy Policy
        </Link>
      </div>
      <div>
        Made by{" "}
        <a
          href="https://pukhanov.ru"
          target="_blank"
          className="underline hover:text-foreground"
        >
          Vyacheslav Pukhanov
        </a>
      </div>
    </footer>
  );
}
