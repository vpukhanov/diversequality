import { notFound } from "next/navigation";
import { z } from "zod";

import { getDigestForUi } from "@/lib/db/queries";

export type Props = {
  params: Promise<{ id: string }>;
};

const schema = z.object({
  id: z.string().uuid(),
});

export async function getDigest(params: Props["params"]) {
  // Make sure the id is a valid uuid
  const validatedParams = schema.safeParse(await params);
  if (!validatedParams.success) {
    return notFound();
  }

  // Make sure the digest exists
  return getDigestForUi(validatedParams.data.id);
}
