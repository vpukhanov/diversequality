"use client";

import { useActionState } from "react";

import { requestAnalysis } from "@/lib/analysis";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export default function AnalysisForm() {
  const [, action, pending] = useActionState(requestAnalysis, null);

  return (
    <form action={action} className="space-y-2 font-sans">
      <Textarea
        name="text"
        placeholder="Paste your article or describe the event here..."
        className="min-h-[200px] bg-white"
        required
      />
      <Button
        type="submit"
        disabled={pending}
        className="w-full bg-[#9A8C98] px-6 py-2 text-lg text-white transition-colors duration-300 hover:bg-[#4A4E69]"
      >
        Analyze
      </Button>
    </form>
  );
}
