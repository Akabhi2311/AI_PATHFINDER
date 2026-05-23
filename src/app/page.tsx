"use client";

import Link from "next/link";

import {
  ArrowRight,
  Brain,
  FileText,
  MessageSquare,
  Mic,
  Route,
} from "lucide-react";

import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

const features = [
  {
    title: "AI Resume Analyzer",
    description:
      "Get ATS scoring, keyword optimization, and AI-powered resume feedback.",
    icon: FileText,
  },

  {
    title: "Skill Gap Analysis",
    description:
      "Compare your current skills against industry requirements.",
    icon: Brain,
  },

  {
    title: "AI Career Chat",
    description:
      "Talk with your AI career mentor and get real-time guidance.",
    icon: MessageSquare,
  },

  {
    title: "Roadmap Generator",
    description:
      "Generate personalized learning roadmaps for your dream role.",
    icon: Route,
  },

  {
    title: "Mock Interview",
    description:
      "Practice technical, HR, and system design interviews with AI.",
    icon: Mic,
  },
];

export default function HomePage() {

  const { isSignedIn } =
    useUser();

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">

      {/* NAVBAR */}
      <nav className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          AI Pathfinder
        </h1>

        <div className="flex items-center gap-4">

          {!isSignedIn ? (
            <>

              <SignInButton mode="modal">

                <button className="px-5 py-2 rounded-xl border border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all">

                  Sign In

                </button>

              </SignInButton>

              <SignUpButton mode="modal">

                <button className="px-5 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black font-semibold">

                  Get Started

                </button>

              </SignUpButton>

            </>
          ) : (

            <div className="flex items-center gap-4">

              <Link
                href="/dashboard"
                className="px-5 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black"
              >
                Dashboard
              </Link>

              <UserButton />

            </div>
          )}

        </div>

      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-8 py-20">

        <div className="max-w-4xl">

          <div className="inline-flex items-center gap-2 border border-zinc-800 rounded-full px-4 py-2 text-sm mb-8">

            <span>
              🚀
            </span>

            AI-Powered Career Intelligence Platform

          </div>

          <h1 className="text-7xl font-bold leading-tight">

            Build Your
            <span className="block">
              Future with AI
            </span>

          </h1>

          <p className="text-zinc-500 text-xl mt-8 leading-9 max-w-3xl">

            AI Pathfinder helps students and professionals
            analyze resumes, identify skill gaps, prepare for
            interviews, and generate career roadmaps using
            local AI models powered by Ollama.

          </p>

          <div className="flex gap-5 mt-12">

  {!isSignedIn ? (

    <>

      <SignInButton mode="modal">

        <button className="bg-black dark:bg-white dark:text-black text-white px-8 py-4 rounded-2xl flex items-center gap-3 text-lg font-medium">

          Get Started

          <ArrowRight size={20} />

        </button>

      </SignInButton>

      <SignInButton mode="modal">

        <button className="border border-zinc-700 px-8 py-4 rounded-2xl text-lg">

          Analyze Resume

        </button>

      </SignInButton>

    </>

  ) : (

    <>

      <Link
        href="/dashboard"
        className="bg-black dark:bg-white dark:text-black text-white px-8 py-4 rounded-2xl flex items-center gap-3 text-lg font-medium"
      >

        Get Started

        <ArrowRight size={20} />

      </Link>

      <Link
        href="/resume-analyzer"
        className="border border-zinc-700 px-8 py-4 rounded-2xl text-lg"
      >

        Analyze Resume

      </Link>

    </>

  )}

</div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-8 pb-28">

        <div className="mb-16">

          <h2 className="text-5xl font-bold">
            Powerful AI Features
          </h2>

          <p className="text-zinc-500 text-lg mt-4">
            Everything you need to accelerate your career.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {features.map((feature) => {

            const Icon =
              feature.icon;

            return (

              <div
                key={feature.title}
                className="border border-zinc-800 rounded-3xl p-8 bg-zinc-50 dark:bg-zinc-950 hover:scale-[1.02] transition-all"
              >

                <div className="bg-black dark:bg-white dark:text-black text-white w-fit p-4 rounded-2xl mb-6">

                  <Icon size={28} />

                </div>

                <h3 className="text-2xl font-bold mb-4">
                  {feature.title}
                </h3>

                <p className="text-zinc-500 leading-8">
                  {feature.description}
                </p>

              </div>
            );
          })}

        </div>

      </section>

      {/* CTA */}
      <section className="border-t border-zinc-800">

        <div className="max-w-5xl mx-auto px-8 py-28 text-center">

          <h2 className="text-6xl font-bold leading-tight">

            Ready to accelerate
            your career?

          </h2>

          <p className="text-zinc-500 text-xl mt-8 leading-9">

            Start using AI Pathfinder today and unlock
            personalized career intelligence powered by AI.

          </p>

          {!isSignedIn ? (

  <SignInButton mode="modal">

    <button className="inline-flex items-center gap-3 mt-12 bg-black dark:bg-white dark:text-black text-white px-10 py-5 rounded-2xl text-lg font-medium">

      Launch Dashboard

      <ArrowRight size={22} />

    </button>

  </SignInButton>

) : (

  <Link
    href="/dashboard"
    className="inline-flex items-center gap-3 mt-12 bg-black dark:bg-white dark:text-black text-white px-10 py-5 rounded-2xl text-lg font-medium"
  >

    Launch Dashboard

    <ArrowRight size={22} />

  </Link>

)}

        </div>

      </section>

    </div>
  );
}