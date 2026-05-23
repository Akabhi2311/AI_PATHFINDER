"use client";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

interface ResumeHistory {
  id: number;

  atsScore: string;

  resumeUrl: string;

  aiAnalysis: string;

  createdAt: string;
}

export default function ResumeHistory() {

  const [history, setHistory] =
    useState<
      ResumeHistory[]
    >([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchHistory =
      async () => {

        try {

          const res =
            await axios.get(
              "/api/resume-history"
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

    fetchHistory();

  }, []);

  if (loading) {
    return (
      <p className="mt-10">
        Loading history...
      </p>
    );
  }

  if (history.length === 0) {
    return (
      <div className="mt-14 border border-zinc-800 rounded-3xl p-10 text-center">

        <h2 className="text-2xl font-bold">
          No Resume History
        </h2>

        <p className="text-zinc-500 mt-4">

          Upload your first resume analysis.

        </p>

      </div>
    );
  }

  return (

    <div className="mt-16">

      <div className="mb-8">

        <h2 className="text-4xl font-bold">

          Recent Resume Analyses

        </h2>

        <p className="text-zinc-500 mt-3">

          Your latest AI-powered ATS reports

        </p>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {history.map((item) => (

          <div
            key={item.id}
            className="border border-zinc-800 rounded-3xl p-8"
          >

            <div className="flex items-center justify-between mb-6">

              <div>

                <p className="text-zinc-500">
                  ATS Score
                </p>

                <h2 className="text-5xl font-bold mt-2">

                  {item.atsScore}%

                </h2>

              </div>

              <a
                href={item.resumeUrl}
                target="_blank"
                className="bg-white text-black px-5 py-3 rounded-2xl font-semibold"
              >

                View Resume

              </a>

            </div>

            <div>

              <h3 className="text-xl font-bold mb-4">

                AI Analysis

              </h3>

              <p className="text-zinc-400 leading-8 line-clamp-6">

                {item.aiAnalysis}

              </p>

            </div>

            <p className="text-sm text-zinc-500 mt-6">

              {new Date(
                item.createdAt
              ).toLocaleDateString()}

            </p>

          </div>
        ))}

      </div>

    </div>
  );
}