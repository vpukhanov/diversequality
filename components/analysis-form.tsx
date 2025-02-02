"use client";

import { useActionState } from "react";

import { requestAnalysis } from "@/lib/actions/request-analysis";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export default function AnalysisForm() {
  const [state, action, pending] = useActionState(requestAnalysis, {
    errors: {},
  });

  return (
    <form action={action} className="space-y-2 font-sans">
      <Textarea
        name="text"
        minLength={100}
        maxLength={10000}
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
      <div aria-live="polite">
        {state?.errors.text && (
          <p className="text-center text-sm text-red-600">
            {state.errors.text}
          </p>
        )}
      </div>
    </form>
  );
}
