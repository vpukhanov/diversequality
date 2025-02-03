"use client";

import { Share2 } from "lucide-react";
import { useState } from "react";

import { Button } from "./ui/button";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if ("share" in navigator) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
        return;
      } catch (error) {
        // AbortError is thrown when the user cancels the share dialog
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
        console.error("Failed to share", error);
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy link", error);
    }
  };

  return (
    <Button
      onClick={handleShare}
      className="bg-[#9A8C98] px-4 py-2 font-sans text-lg text-white transition-colors duration-300 hover:bg-[#4A4E69]"
    >
      <Share2 className="mr-1" />
      {copied ? "Copied link!" : "Share"}
    </Button>
  );
}
