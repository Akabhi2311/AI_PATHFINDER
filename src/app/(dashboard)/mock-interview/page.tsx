"use client";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

interface InterviewHistory {
  id: number;

  role: string;

  level: string;

  interviewGuide: string;

  createdAt: string;
}

export default function MockInterviewPage() {

  const [role, setRole] =
    useState("");

  const [level, setLevel] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [
    interviewGuide,
    setInterviewGuide,
  ] = useState("");

  const [history, setHistory] =
    useState<
      InterviewHistory[]
    >([]);

  /* FETCH HISTORY */

  const fetchHistory =
    async () => {

      try {

        const res =
          await axios.get(
            "/api/mock-interview-history"
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

  /* GENERATE */

  const generateInterview =
    async () => {

      if (!role || !level)
        return;

      try {

        setLoading(true);

        const res =
          await axios.post(
            "/api/mock-interview",
            {
              role,
              level,
            }
          );

        setInterviewGuide(
          res.data
            ?.interviewGuide ||
            ""
        );

        fetchHistory();

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

  return (

    <div className="max-w-7xl mx-auto p-10">

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="text-5xl font-bold">
          AI Mock Interview
        </h1>

        <p className="text-zinc-500 mt-3 text-lg">

          Practice interviews with AI-powered guidance.

        </p>

      </div>

      {/* FORM */}

      <div className="space-y-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8">

        <input
          type="text"
          placeholder="Target Role"
          value={role}
          onChange={(e) =>
            setRole(
              e.target.value
            )
          }
          className="w-full border rounded-2xl p-4 bg-zinc-50 dark:bg-zinc-950"
        />

        <select
          value={level}
          onChange={(e) =>
            setLevel(
              e.target.value
            )
          }
          className="w-full border rounded-2xl p-4 bg-zinc-50 dark:bg-zinc-950"
        >

          <option value="">
            Select Level
          </option>

          <option value="Beginner">
            Beginner
          </option>

          <option value="Intermediate">
            Intermediate
          </option>

          <option value="Advanced">
            Advanced
          </option>

        </select>

        <button
          onClick={
            generateInterview
          }
          disabled={loading}
          className="bg-black text-white px-6 py-4 rounded-2xl"
        >

          {loading
            ? "Generating..."
            : "Generate Mock Interview"}

        </button>

      </div>

      {/* RESULT */}

      {interviewGuide && (

        <div className="mt-10 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 bg-white dark:bg-zinc-900">

          <h2 className="text-3xl font-bold mb-6">

            AI Interview Guide

          </h2>

          <div className="whitespace-pre-wrap leading-8 text-zinc-600 dark:text-zinc-400">

            {interviewGuide}

          </div>

        </div>
      )}

      {/* HISTORY */}

      {history.length > 0 && (

        <div className="mt-20">

          <h2 className="text-4xl font-bold mb-10">

            Recent Mock Interviews

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

                    <p className="text-zinc-500 mt-2">

                      {item.level}

                    </p>

                  </div>

                  <p className="text-sm text-zinc-500">

                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}

                  </p>

                </div>

                <p className="text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap line-clamp-6 leading-8">

                  {item.interviewGuide}

                </p>

              </div>
            ))}

          </div>

        </div>
      )}

    </div>
  );
}