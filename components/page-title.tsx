import { Home } from "lucide-react";
import Link from "next/link";

type Props = {
  isLink?: boolean;
  isMainHeading?: boolean;
};

export default function PageTitle({ isLink, isMainHeading }: Props) {
  return isLink ? (
    <Link href="/" className="group block">
      <Title isLink={isLink} isMainHeading={isMainHeading} />
    </Link>
  ) : (
    <Title isLink={isLink} isMainHeading={isMainHeading} />
  );
}

function Title({ isLink, isMainHeading }: Props) {
  const Tag = isMainHeading ? "h1" : "div";
  return (
    <Tag className="mb-8 flex items-center justify-center gap-4 text-4xl font-bold text-accent-foreground md:text-5xl">
      {isLink && <Home className="h-8 w-8 md:h-10 md:w-10" />}
      <div className="group-hover:underline">Diversequality</div>
    </Tag>
  );
}
