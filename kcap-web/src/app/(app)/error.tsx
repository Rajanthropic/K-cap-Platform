"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App Error Caught:", error);
  }, [error]);

  return (
    <div className="flex h-[80vh] w-full flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="max-w-md w-full p-6 bg-red-500/10 border border-red-500/50 rounded-xl space-y-4">
        <h2 className="text-xl font-bold text-red-600">App Error Occurred</h2>
        <div className="bg-black/80 text-red-400 p-4 rounded-lg font-mono text-xs overflow-auto max-h-64">
          <p className="font-bold border-b border-red-500/30 pb-2 mb-2">Message:</p>
          {error.message || "Unknown error"}
          <p className="font-bold border-b border-red-500/30 pb-2 mb-2 mt-4">Digest:</p>
          {error.digest || "No digest"}
          <p className="font-bold border-b border-red-500/30 pb-2 mb-2 mt-4">Stack:</p>
          {error.stack || "No stack"}
        </div>
        <Button onClick={() => reset()} className="w-full">
          Try again
        </Button>
      </div>
    </div>
  );
}