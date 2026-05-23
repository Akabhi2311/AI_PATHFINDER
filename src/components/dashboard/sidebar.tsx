"use client";

import Link from "next/link";

import {
  LayoutDashboard,
  FileText,
  Brain,
  MessageSquare,
  Route,
  Mic,
  CalendarDays,
  History,
  Settings,
  Menu,
  X,
} from "lucide-react";

import {
  UserButton,
} from "@clerk/nextjs";

import {
  useState,
} from "react";

const links = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    label: "Resume Analyzer",
    href: "/resume-analyzer",
    icon: FileText,
  },

  {
    label: "AI Career Chat",
    href: "/ai-tools/ai-chat",
    icon: MessageSquare,
  },

  {
    label: "Skill Gap",
    href: "/skill-gap",
    icon: Brain,
  },

  {
    label: "Roadmap Generator",
    href: "/roadmap-generator",
    icon: Route,
  },

  {
    label: "Roadmap History",
    href: "/roadmap-history",
    icon: History,
  },

  {
    label: "Mock Interview",
    href: "/mock-interview",
    icon: Mic,
  },

  {
    label: "Weekly Planner",
    href: "/weekly-planner",
    icon: CalendarDays,
  },

  
];

export default function Sidebar() {

  const [
    open,
    setOpen,
  ] = useState(false);

  return (
    <>

      {/* MOBILE TOPBAR */}

      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black border-b border-zinc-800 px-5 py-4 flex items-center justify-between">

        <h1 className="text-white text-2xl font-bold">
          AI Pathfinder
        </h1>

        <button
          onClick={() =>
            setOpen(!open)
          }
          className="text-white"
        >

          {open ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}

        </button>

      </div>

      {/* OVERLAY */}

      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() =>
            setOpen(false)
          }
        />
      )}

      {/* SIDEBAR */}

      <div
        className={`
          fixed top-0 left-0 z-50
          h-screen w-[300px]
          bg-black text-white
          border-r border-zinc-800
          flex flex-col justify-between
          transition-transform duration-300
          overflow-y-auto

          ${open
            ? "translate-x-0"
            : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >

        <div>

          {/* LOGO */}

          <div className="p-8 border-b border-zinc-800">

            <h1 className="text-4xl font-bold">
              AI Pathfinder
            </h1>

            <p className="text-zinc-500 mt-3">
              AI Career Intelligence
            </p>

          </div>

          {/* LINKS */}

          <div className="p-6 space-y-3">

            {links.map((link) => {

              const Icon =
                link.icon;

              return (

                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() =>
                    setOpen(false)
                  }
                  className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-zinc-900 transition-all"
                >

                  <Icon size={22} />

                  <span className="text-lg">
                    {link.label}
                  </span>

                </Link>
              );
            })}

          </div>

        </div>

        {/* USER */}

        <div className="p-6 border-t border-zinc-800 flex items-center justify-between">

          <div>

            <h2 className="font-semibold">
              AI Pathfinder
            </h2>

            <p className="text-zinc-500 text-sm mt-1">
              Powered by Ollama + AI
            </p>

          </div>

          <UserButton />

        </div>

      </div>

    </>
  );
}
