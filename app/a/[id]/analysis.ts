import { notFound } from "next/navigation";
import { z } from "zod";

import { getAnalysisForUi } from "@/lib/db/queries";

export type Props = {
  params: Promise<{ id: string }>;
};

const schema = z.object({
  id: z.string().uuid(),
});

export async function getAnalysis(params: Props["params"]) {
  // Make sure the id is a valid uuid
  const validatedParams = schema.safeParse(await params);
  if (!validatedParams.success) {
    return notFound();
  }

  // Make sure the analysis exists
  return getAnalysisForUi(validatedParams.data.id);
}
