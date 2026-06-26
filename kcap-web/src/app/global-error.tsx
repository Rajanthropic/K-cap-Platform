"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-black text-white p-4">
          <div className="max-w-md w-full p-6 bg-red-900/50 border border-red-500 rounded-xl space-y-4">
            <h2 className="text-xl font-bold text-red-400">CRITICAL GLOBAL ERROR</h2>
            <div className="bg-black text-red-300 p-4 rounded-lg font-mono text-xs overflow-auto max-h-64">
              <p className="font-bold border-b border-red-500/30 pb-2 mb-2">Message:</p>
              {error.message || "Unknown error"}
              <p className="font-bold border-b border-red-500/30 pb-2 mb-2 mt-4">Digest:</p>
              {error.digest || "No digest"}
              <p className="font-bold border-b border-red-500/30 pb-2 mb-2 mt-4">Stack:</p>
              {error.stack || "No stack"}
            </div>
            <button onClick={() => reset()} className="w-full bg-red-500 text-white p-2 rounded">
              Force Reload
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}