import { Home } from "lucide-react";
import Link from "next/link";

type Props = {
  isLink?: boolean;
  isH1?: boolean;
};

export default function Header({ isLink, isH1 }: Props) {
  const TitleTag = isH1 ? "h1" : "div";

  const titleContent = (
    <TitleTag
      className={
        "flex items-center gap-2 text-3xl font-bold text-accent-foreground"
      }
    >
      {isLink && <Home className="h-6 w-6" />}
      <div className="group-hover:underline">Diversequality</div>
    </TitleTag>
  );

  return (
    <header className="mb-8 flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      {isLink ? (
        <Link href="/" className="group">
          {titleContent}
        </Link>
      ) : (
        titleContent
      )}

      <nav>
        <ul className="flex items-center gap-4">
          <li>
            <Link
              href="/digests"
              className="text-muted-foreground underline transition-colors hover:text-accent-foreground"
            >
              Digests
            </Link>
          </li>
          <li>
            <Link
              href="/latest"
              className="text-muted-foreground underline transition-colors hover:text-accent-foreground"
            >
              Latest
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
