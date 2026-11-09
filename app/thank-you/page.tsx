
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { downloadAuthorizedDocument } from "@/app/services/admissionOptionsService";

export default function ThankYouPage() {
  const [flowMessage, setFlowMessage] = useState(
    "Thank you for your interest in Narayana Schools!",
  );
  const flowStarted = useRef(false);

useEffect(() => {
  if (flowStarted.current) return;
  flowStarted.current = true;

  const processThankYouFlow = async () => {
    const storedData = sessionStorage.getItem("admissionThankYou");

    if (!storedData) {
      setFlowMessage(
        "Thank you for visiting Narayana Schools. Redirecting you home...",
      );

      window.setTimeout(() => {
        window.location.replace("/");
      }, 5000);

      return;
    }

    sessionStorage.removeItem("admissionThankYou");

    try {
      const data = JSON.parse(storedData) as {
        intent?: string;
        downloadUrl?: string;
        downloadFilename?: string;
        redirectUrl?: string;
        sourceUrl?: string;
      };

      if (data.intent === "BROCHURE") {
        if (!data.downloadUrl) {
          setFlowMessage(
            "Your request was received, but the brochure download link is unavailable.",
          );

          window.setTimeout(() => {
            window.location.replace("/");
          }, 4000);

          return;
        }

        setFlowMessage("Thank you! Your brochure is being downloaded...");

        const parsedUrl = new URL(data.downloadUrl);
        const match = parsedUrl.pathname.match(/\/downloads\/([^/]+)\/?$/);

        if (!match?.[1]) {
          throw new Error("Invalid brochure download link.");
        }

        const token = decodeURIComponent(match[1]);

        await downloadAuthorizedDocument(
          token,
          data.downloadFilename || "brochure.pdf",
        );

        setFlowMessage("Your brochure download has started. Thank you!");

        window.setTimeout(() => {
          window.location.replace("/");
        }, 2000);

        return;
      }

      if (data.intent === "ENQUIRY") {
        setFlowMessage("Thank you! Your enquiry has been submitted.");

        window.setTimeout(() => {
          window.location.replace("/");
        }, 4000);

        return;
      }

      if (data.intent === "FEES") {
  if (data.redirectUrl) {
    window.location.replace(data.redirectUrl);
    return;
  }

  setFlowMessage(
    "Fee structure link is currently unavailable. Please try again later.",
  );

  window.setTimeout(() => {
    window.location.replace("/");
  }, 4000);

  return;
}

      // Do not implement FEES until its backend outcome is configured.
      setFlowMessage("Thank you. Redirecting you home...");
      window.setTimeout(() => {
        window.location.replace("/");
      }, 4000);
    } catch (error: unknown) {
      console.error("Thank You flow error:", error);

      setFlowMessage(
        "Your request was received, but the brochure could not be downloaded. Please try again later.",
      );

      window.setTimeout(() => {
        window.location.replace("/");
      }, 5000);
    }
  };

  void processThankYouFlow();
}, []);

  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#15366f]">
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-12px) rotate(2deg); }
        }

        @keyframes pop {
          0% { transform: scale(0.65); opacity: 0; }
          70% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes sparkle {
          0%, 100% { opacity: 0.35; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        .student-float {
          animation: float 4s ease-in-out infinite;
        }

        .success-pop {
          animation: pop 0.7s ease-out both;
        }

        .sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }

        .fade-up {
          animation: fadeUp 0.8s ease-out both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .student-float, .success-pop, .sparkle, .fade-up {
            animation: none !important;
          }
        }
      `}</style>

      
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#f5faff] via-white to-[#f0f7ff]">
        <div className="pointer-events-none absolute -left-20 top-24 h-64 w-64 rounded-full bg-sky-100/70 blur-2xl" />
        <div className="pointer-events-none absolute -right-20 top-16 h-72 w-72 rounded-full bg-amber-100/60 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-2 lg:gap-8 lg:px-12 lg:py-20">
          {/* Student illustration */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-x-5 bottom-3 top-8 rounded-[45%] bg-gradient-to-br from-sky-100 to-blue-50" />

            <span className="sparkle absolute left-8 top-12 text-3xl text-amber-400">
              ✦
            </span>
            <span className="sparkle absolute right-8 top-20 text-2xl text-pink-400">
              ✦
            </span>
            <span className="sparkle absolute bottom-20 left-3 text-2xl text-sky-500">
              ✧
            </span>
            <span className="absolute right-1 top-5 rotate-12 text-4xl text-blue-500">
              ➤
            </span>

            <div className="student-float relative flex min-h-[300px] items-center justify-center sm:min-h-[390px]">
              <div className="flex h-64 w-64 flex-col items-center justify-center rounded-full border-8 border-white/80 bg-gradient-to-br from-[#d8ecff] to-[#b5d9ff] shadow-inner sm:h-80 sm:w-80">
                <div className="mb-3 text-8xl sm:text-9xl">🎓</div>
                <div className="text-7xl sm:text-8xl">🧑‍🎓</div>
                <div className="mt-3 rounded-full bg-white/90 px-5 py-2 text-sm font-bold text-[#15366f] shadow-sm">
                  Bright Future Ahead!
                </div>
              </div>
            </div>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-2xl border border-white bg-white/90 px-5 py-3 shadow-lg">
              <p className="whitespace-nowrap text-sm font-semibold text-[#15366f]">
                ✨ Every dream starts with learning
              </p>
            </div>
          </div>

          {/* Thank you message */}
          <div className="relative text-center lg:text-left fade-up">
            <div className="success-pop mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-600 ring-8 ring-emerald-50 lg:mx-0">
              ✓
            </div>

            <div className="mb-3 flex items-center justify-center gap-3 lg:justify-start">
              <span className="text-3xl text-amber-400">✦</span>
              <span className="rounded-full bg-blue-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-800">
                Submission Successful
              </span>
              <span className="text-3xl text-amber-400">✦</span>
            </div>

            <h1 className="font-serif text-5xl font-bold italic leading-tight tracking-tight text-[#173d7c] sm:text-6xl lg:text-7xl">
              Thank You!
            </h1>

            <div className="mx-auto mt-3 h-1.5 w-40 rounded-full bg-amber-400 lg:mx-0" />

            <h2 className="mt-7 text-xl font-extrabold leading-snug text-[#15366f] sm:text-2xl">
              Your Interest Means a Lot to Us!
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-slate-600 sm:text-lg lg:mx-0">
              {flowMessage}
            </p>

            <div className="mx-auto mt-7 flex max-w-lg items-center gap-4 rounded-3xl border border-blue-100 bg-[#eaf4ff] px-5 py-4 text-left lg:mx-0">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-2xl text-blue-600 shadow-sm">
                ♡
              </div>
              <p className="text-sm font-medium leading-6 text-[#244b83] sm:text-base">
                Together, let’s shape a brighter future for your child!
              </p>
            </div>

            <div className="mt-8">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#173d7c] px-7 py-3.5 font-bold text-white shadow-lg shadow-blue-900/15 transition duration-300 hover:-translate-y-1 hover:bg-[#2456a0] focus:outline-none focus:ring-4 focus:ring-blue-200"
              >
                Back to Home <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Warm closing section */}
      <section className="relative overflow-hidden bg-[#edf6ff]">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-5 py-12 text-center sm:px-8 sm:py-16">
          <div className="flex items-center gap-4 text-3xl text-amber-500">
            <span>✦</span>
            <span className="text-5xl">📚</span>
            <span>✦</span>
          </div>

          <h2 className="font-serif text-2xl font-bold italic text-[#173d7c] sm:text-4xl">
            Thank You for Choosing Narayana Schools!
          </h2>

          <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            We’re excited to be a part of your child’s learning journey.
            Here’s to new possibilities, growing confidence and a brighter tomorrow.
          </p>

          <div className="flex items-center gap-3 text-xl text-[#173d7c]">
            <span className="h-px w-12 bg-blue-300" />
            <span aria-hidden="true">♥</span>
            <span className="h-px w-12 bg-blue-300" />
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 right-6 hidden text-7xl opacity-20 md:block">
          🏫
        </div>
        <div className="pointer-events-none absolute bottom-0 left-6 hidden text-6xl opacity-20 md:block">
          ✏️
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#17345f] px-5 py-5 text-center text-xs text-blue-100 sm:text-sm">
        <p className="font-medium tracking-wide">
          Narayana Schools
          <span className="mx-3 text-amber-400">|</span>
          Excellence in Education
          <span className="mx-3 text-amber-400">|</span>
          A Brighter Future
        </p>
      </footer>
    </main>
  );
}
