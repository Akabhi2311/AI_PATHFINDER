"use client";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  Route,
  Calendar,
  Trash2,
} from "lucide-react";

interface Roadmap {
  id: string;

  role: string;

  level: string;

  roadmap: string;

  createdAt?: string;
}

export default function RoadmapHistoryPage() {
  const [history, setHistory] =
    useState<Roadmap[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory =
    async () => {
      try {
        const res =
          await axios.get(
            "/api/roadmap-history"
          );

        setHistory(
          res.data
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const deleteRoadmap =
    async (id: string) => {
      try {
        await axios.delete(
          "/api/roadmap-history",
          {
            data: { id },
          }
        );

        setHistory((prev) =>
          prev.filter(
            (item) =>
              item.id !== id
          )
        );
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="max-w-7xl mx-auto p-10">

      {/* HEADER */}
      <div className="mb-10">

        <div className="flex items-center gap-3 mb-4">

          <Route size={40} />

          <h1 className="text-5xl font-bold">
            Roadmap History
          </h1>

        </div>

        <p className="text-zinc-500 text-lg">
          View all your AI-generated career roadmaps.
        </p>

      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-zinc-500">
          Loading roadmap history...
        </div>
      )}

      {/* EMPTY */}
      {!loading &&
        history.length === 0 && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-10 text-center">

            <h2 className="text-2xl font-bold mb-3">
              No Roadmaps Yet
            </h2>

            <p className="text-zinc-500">
              Generate your first AI roadmap to see it here.
            </p>

          </div>
        )}

      {/* HISTORY */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {history.map(
          (item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm"
            >

              {/* TOP */}
              <div className="flex items-start justify-between mb-6">

                <div>

                  <h2 className="text-2xl font-bold">
                    {item.role}
                  </h2>

                  <p className="text-zinc-500 mt-2">
                    {item.level}
                  </p>

                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-3">

                  <button
                    onClick={() =>
                      deleteRoadmap(
                        item.id
                      )
                    }
                    className="bg-red-500 text-white p-3 rounded-2xl hover:bg-red-600 transition-all"
                  >
                    <Trash2 size={20} />
                  </button>

                  <div className="bg-black text-white p-3 rounded-2xl">

                    <Route size={24} />

                  </div>

                </div>

              </div>

              {/* DATE */}
              <div className="flex items-center gap-2 text-sm text-zinc-500 mb-6">

                <Calendar size={16} />

                {item.createdAt
                  ? new Date(
                      item.createdAt
                    ).toLocaleDateString()
                  : "No date"}

              </div>

              {/* ROADMAP */}
              <div className="whitespace-pre-wrap line-clamp-6 text-zinc-700 dark:text-zinc-300 leading-7">

                {item.roadmap}

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}