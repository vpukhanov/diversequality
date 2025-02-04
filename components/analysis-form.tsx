"use client";

import { useContext } from "react";
import { useActionState } from "react";

import { DistinctIdContext } from "@/app/providers";
import { requestAnalysis } from "@/lib/actions/request-analysis";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export default function AnalysisForm() {
  const [state, action, pending] = useActionState(requestAnalysis, {
    errors: {},
  });

  const distinctId = useContext(DistinctIdContext);

  return (
    <form action={action} className="space-y-2 font-sans">
      <Textarea
        name="text"
        minLength={100}
        maxLength={20000}
        placeholder="Paste your article or describe the event here..."
        className="min-h-[200px] bg-white"
        required
      />
      <input type="hidden" name="distinctId" value={distinctId ?? ""} />
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
        {pending && <Loader />}
      </div>
    </form>
  );
}

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-8">
      <div className="relative h-16 w-16">
        <div className="absolute left-0 top-0 h-full w-full">
          <div className="h-16 w-16 rounded-full border-4 border-secondary opacity-20"></div>
        </div>
        <div className="absolute left-0 top-0 h-full w-full">
          <div
            className="h-16 w-16 animate-spin rounded-full border-4 border-t-secondary"
            style={{ animationDuration: "1.5s" }}
          ></div>
        </div>
      </div>
      <p className="text-warm-muted font-serif text-sm">Analyzing content...</p>
    </div>
  );
}
