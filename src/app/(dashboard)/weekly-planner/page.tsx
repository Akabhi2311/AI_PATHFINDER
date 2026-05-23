"use client";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  CalendarDays,
  Sparkles,
} from "lucide-react";

import WeeklyPlannerTimeline from "@/components/weekly-planner/weekly-planner-timeline";

interface PlannerHistory {
  id: number;

  role: string;

  roadmap: string;

  planner: string;

  createdAt: string;
}

export default function WeeklyPlannerPage() {

  const [role, setRole] =
    useState("");

  const [
    roadmap,
    setRoadmap,
  ] = useState("");

  const [
    planner,
    setPlanner,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [history, setHistory] =
    useState<
      PlannerHistory[]
    >([]);

  // FETCH HISTORY
  const fetchHistory =
    async () => {

      try {

        const res =
          await axios.get(
            "/api/weekly-planner-history"
          );

        setHistory(
          res.data
        );

      } catch (error) {

        console.log(error);

      }
    };

  useEffect(() => {

    fetchHistory();

  }, []);

  // GENERATE PLANNER
  const generatePlanner =
    async () => {

      if (
        !role ||
        !roadmap
      ) {

        alert(
          "Please enter role and roadmap"
        );

        return;
      }

      try {

        setLoading(true);

        const res =
          await axios.post(
            "/api/weekly-planner",
            {
              role,
              roadmap,
            }
          );

        setPlanner(
          res.data.planner
        );

        // REFRESH HISTORY
        fetchHistory();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to generate planner"
        );

      } finally {

        setLoading(false);

      }
    };

  return (

    <div className="max-w-7xl mx-auto p-10">

      {/* HEADER */}
      <div className="mb-10">

        <div className="flex items-center gap-3 mb-4">

          <CalendarDays size={40} />

          <h1 className="text-5xl font-bold">

            AI Weekly Planner

          </h1>

        </div>

        <p className="text-zinc-500 text-lg">

          Convert your roadmap into actionable weekly learning plans.

        </p>

      </div>

      {/* FORM */}
      <div className="space-y-6 mb-10 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8">

        {/* ROLE */}
        <input
          type="text"
          placeholder="Target Role"
          value={role}
          onChange={(e) =>
            setRole(
              e.target.value
            )
          }
          className="w-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 rounded-2xl p-4 outline-none"
        />

        {/* ROADMAP */}
        <textarea
          placeholder="Paste roadmap here..."
          value={roadmap}
          onChange={(e) =>
            setRoadmap(
              e.target.value
            )
          }
          rows={14}
          className="w-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 rounded-2xl p-4 outline-none resize-none"
        />

        {/* BUTTON */}
        <button
          onClick={
            generatePlanner
          }
          disabled={loading}
          className="bg-black text-white px-6 py-4 rounded-2xl flex items-center gap-3 hover:opacity-90 transition-all disabled:opacity-50"
        >

          <Sparkles size={18} />

          {loading
            ? "Generating..."
            : "Generate Weekly Planner"}

        </button>

      </div>

      {/* RESULT */}
      {planner && (

        <div className="mt-10">

          <WeeklyPlannerTimeline
            planner={planner}
          />

        </div>
      )}

      {/* HISTORY */}
      {history.length > 0 && (

        <div className="mt-20">

          <h2 className="text-4xl font-bold mb-10">

            Recent Weekly Planners

          </h2>

          <div className="space-y-6">

            {history.map((item) => (

              <div
                key={item.id}
                className="border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 bg-white dark:bg-zinc-900"
              >

                <div className="flex items-center justify-between mb-6">

                  <div>

                    <h3 className="text-2xl font-bold">

                      {item.role}

                    </h3>

                    <p className="text-zinc-500 mt-3 line-clamp-3">

                      {item.roadmap}

                    </p>

                  </div>

                  <p className="text-sm text-zinc-500">

                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}

                  </p>

                </div>

                <p className="whitespace-pre-wrap line-clamp-6 leading-8 text-zinc-600 dark:text-zinc-400">

                  {item.planner}

                </p>

              </div>
            ))}

          </div>

        </div>
      )}

    </div>
  );
}