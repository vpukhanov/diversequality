import { Home } from "lucide-react";
import Link from "next/link";

type Props = {
  isLink?: boolean;
  isMainHeading?: boolean;
};

export default function Header({ isLink, isMainHeading }: Props) {
  const TitleTag = isMainHeading ? "h1" : "div";

  const titleContent = (
    <TitleTag
      className={
        "flex items-center text-2xl font-bold text-accent-foreground md:text-3xl"
      }
    >
      {isLink && <Home className="h-6 w-6" />}
      <div className="group-hover:underline">Diversequality</div>
    </TitleTag>
  );

  return (
    <header className="mb-8 flex w-full items-center justify-between">
      {isLink ? (
        <Link href="/" className="group">
          {titleContent}
        </Link>
      ) : (
        titleContent
      )}

      <nav>
        <ul className="flex items-center gap-6">
          <li>
            <Link
              href="/latest"
              className="text-muted-foreground transition-colors hover:text-accent-foreground"
            >
              Latest
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
