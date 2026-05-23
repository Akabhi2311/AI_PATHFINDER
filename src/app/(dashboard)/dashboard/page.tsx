"use client";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import AnalyticsChart from "@/components/dashboard/analytics-chart";

import {
  Brain,
  FileText,
  Mic,
  Route,
  MessageSquare,
  TrendingUp,
  CalendarDays,
} from "lucide-react";

const features = [
  {
    title:
      "AI Resume Analyzer",

    description:
      "ATS scoring, keyword optimization, and resume intelligence.",

    icon: FileText,
  },

  {
    title:
      "Skill Gap Analysis",

    description:
      "Compare current skills with industry requirements.",

    icon: Brain,
  },

  {
    title:
      "AI Career Chat",

    description:
      "Get instant career guidance powered by local AI.",

    icon: MessageSquare,
  },

  {
    title:
      "Roadmap Generator",

    description:
      "Generate learning roadmaps tailored to your career goals.",

    icon: Route,
  },

  {
    title:
      "Mock Interview",

    description:
      "Practice technical, HR, and system design interviews.",

    icon: Mic,
  },
];

export default function DashboardPage() {

  const [stats, setStats] =
    useState({

      resumeAnalyses: 0,

      skillReports: 0,

      roadmaps: 0,

      aiChats: 0,

      mockInterviews: 0,

      weeklyPlanners: 0,

    });

  useEffect(() => {

    const fetchStats =
      async () => {

        try {

          const res =
            await axios.get(
              "/api/dashboard-stats"
            );

          setStats(
            res.data
          );

        } catch (error) {

          console.log(error);

        }
      };

    fetchStats();

  }, []);

  const statsCards = [
    {
      title:
        "Resume Analyses",

      value:
        stats.resumeAnalyses,

      icon: FileText,
    },

    {
      title:
        "Skill Reports",

      value:
        stats.skillReports,

      icon: Brain,
    },

    {
      title:
        "Roadmaps Generated",

      value:
        stats.roadmaps,

      icon: Route,
    },

    {
      title:
        "AI Chats",

      value:
        stats.aiChats,

      icon: MessageSquare,
    },

    {
      title:
        "Mock Interviews",

      value:
        stats.mockInterviews,

      icon: Mic,
    },

    {
      title:
        "Weekly Planners",

      value:
        stats.weeklyPlanners,

      icon: CalendarDays,
    },
  ];

  const analyticsData = [
    {
      name: "Resumes",
      value:
        stats.resumeAnalyses,
    },

    {
      name: "Roadmaps",
      value:
        stats.roadmaps,
    },

    {
      name: "Chats",
      value:
        stats.aiChats,
    },

    {
      name: "Skills",
      value:
        stats.skillReports,
    },

    {
      name: "Planners",
      value:
        stats.weeklyPlanners,
    },

    {
      name: "Interviews",
      value:
        stats.mockInterviews,
    },
  ];

  return (
    <div className="p-10">

      {/* HEADER */}
      <div className="mb-12">

        <h1 className="text-5xl font-bold">
          Welcome to AI Pathfinder
        </h1>

        <p className="text-zinc-500 mt-4 text-lg">
          Your AI-powered career intelligence platform.
        </p>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">

        {statsCards.map(
          (item) => {

            const Icon =
              item.icon;

            return (

              <div
                key={item.title}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm"
              >

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-zinc-500">
                      {item.title}
                    </p>

                    <h2 className="text-4xl font-bold mt-3">
                      {item.value}
                    </h2>

                  </div>

                  <div className="bg-black text-white p-4 rounded-2xl">

                    <Icon size={28} />

                  </div>

                </div>

              </div>
            );
          }
        )}

      </div>

      {/* ANALYTICS */}
      <div className="mb-12">

        <AnalyticsChart
          data={analyticsData}
        />

      </div>

      {/* FEATURES */}
      <div>

        <div className="flex items-center gap-3 mb-8">

          <TrendingUp />

          <h2 className="text-3xl font-bold">
            Platform Features
          </h2>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {features.map(
            (feature) => {

              const Icon =
                feature.icon;

              return (

                <div
                  key={feature.title}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all"
                >

                  <div className="bg-black text-white w-fit p-4 rounded-2xl mb-6">

                    <Icon size={28} />

                  </div>

                  <h3 className="text-2xl font-bold mb-4">
                    {feature.title}
                  </h3>

                  <p className="text-zinc-500 leading-7">
                    {feature.description}
                  </p>

                </div>
              );
            }
          )}

        </div>

      </div>

    </div>
  );
}