"use client";

import { useState } from "react";
import Link from "next/link";

interface RedFlag {
  label: string;
  excerpt: string;
  explanation: string;
}

const RED_FLAG_RULES: {
  keywords: string[];
  label: string;
  explanation: string;
}[] = [
  {
    keywords: ["unlimited liability", "unlimited", "liability"],
    label: "Unlimited liability",
    explanation:
      "This clause exposes you to uncapped financial risk. Most contracts cap liability at the value of the contract or a fixed multiple.",
  },
  {
    keywords: ["auto-renew", "automatically renew", "auto renewal", "automatic renewal"],
    label: "Auto-renewal trap",
    explanation:
      "The contract renews itself unless you cancel within a narrow window. Easy to miss, expensive to forget.",
  },
  {
    keywords: [
      "intellectual property",
      "ip transfer",
      "assign all",
      "transfer of ip",
      "work product",
      "assigns to",
      "all rights",
      "ownership of all",
    ],
    label: "IP transfer",
    explanation:
      "You may be signing away ownership of work you create. Make sure the scope is limited to deliverables under this contract.",
  },
];

function detectRedFlags(text: string): RedFlag[] {
  const lower = text.toLowerCase();
  const lines = text.split(/[.!?\n]+/).map((l) => l.trim()).filter(Boolean);
  const flags: RedFlag[] = [];

  for (const rule of RED_FLAG_RULES) {
    for (const kw of rule.keywords) {
      if (lower.includes(kw)) {
        const matchLine = lines.find((l) => l.toLowerCase().includes(kw)) ?? "";
        flags.push({
          label: rule.label,
          excerpt: matchLine.length > 200 ? matchLine.slice(0, 200) + "..." : matchLine,
          explanation: rule.explanation,
        });
        break;
      }
    }
  }

  return flags;
}

export default function TryPage() {
  const [contractText, setContractText] = useState("");
  const [flags, setFlags] = useState<RedFlag[] | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!contractText.trim()) return;
    setFlags(detectRedFlags(contractText));
  }

  function handleReset() {
    setContractText("");
    setFlags(null);
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-zinc-500" />
          Signoff
        </Link>
        <Link
          href="/#waitlist"
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          Get early access
        </Link>
      </nav>

      <div className="mx-auto max-w-2xl px-6 py-12">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
            Contract scanner
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">
            Paste a contract. See the red flags.
          </h1>
        </div>

        {flags === null ? (
          <form onSubmit={handleSubmit}>
            <textarea
              value={contractText}
              onChange={(e) => setContractText(e.target.value)}
              placeholder="Paste your contract text here..."
              rows={12}
              className="w-full rounded-2xl border border-neutral-300 bg-white p-4 text-sm leading-relaxed placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10 resize-y"
            />
            <button
              type="submit"
              disabled={!contractText.trim()}
              className="mt-4 w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-neutral-700 disabled:opacity-40"
            >
              Scan for red flags
            </button>
          </form>
        ) : (
          <div>
            {flags.length === 0 ? (
              <div className="rounded-3xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
                <p className="text-lg font-semibold text-neutral-900">No red flags detected</p>
                <p className="mt-2 text-sm text-neutral-600">
                  The keywords we scan for (unlimited liability, auto-renewal, IP transfer) were not
                  found. This does not mean the contract is safe — always have a lawyer review
                  important agreements.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {flags.map((flag, i) => (
                  <div
                    key={i}
                    className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
                  >
                    <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-red-600">
                      Red flag — {flag.label}
                    </div>
                    {flag.excerpt && (
                      <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm italic text-red-900">
                        &ldquo;{flag.excerpt}&rdquo;
                      </div>
                    )}
                    <div className="mt-4 rounded-xl bg-zinc-50 p-4 text-sm leading-relaxed text-zinc-800">
                      <div className="text-xs font-semibold uppercase tracking-wider text-zinc-600">
                        What this means
                      </div>
                      <p className="mt-1">{flag.explanation}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={handleReset}
                className="rounded-full bg-neutral-900 px-7 py-3.5 font-medium text-white transition hover:bg-neutral-700"
              >
                Scan another contract
              </button>
              <Link
                href="/#waitlist"
                className="rounded-full border border-neutral-300 px-7 py-3.5 text-center font-medium text-neutral-900 transition hover:border-neutral-900"
              >
                Get early access
              </Link>
            </div>
          </div>
        )}

        <p className="mt-6 text-center text-xs text-neutral-400">
          This is a v0 preview with keyword-based detection.{" "}
          <Link href="/#waitlist" className="underline hover:text-neutral-600">
            Join the waitlist
          </Link>{" "}
          for full AI-powered contract analysis.
        </p>
      </div>
    </div>
  );
}
