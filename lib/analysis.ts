import "server-only";

import { storeAnalysis } from "./db/mutations";

export function analyseAndSave(text: string) {
  return storeAnalysis({
    title: "Tech Company Announces $50M Investment in Diversity Initiatives",
    text,
    summary:
      "Major tech company announces $50M investment in diversity initiatives and STEM education programs for underserved communities.",
    impact: [
      "Increases access to tech education for marginalized communities",
      "Creates new job opportunities and career pathways",
      "Sets precedent for corporate investment in DEI",
      "Demonstrates tangible commitment to systemic change",
    ],
    score: 75,
  });
}
