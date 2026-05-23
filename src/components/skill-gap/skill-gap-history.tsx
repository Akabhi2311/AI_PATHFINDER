"use client";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

interface SkillGapHistory {
  id: number;

  currentSkills: string;

  targetRole: string;

  missingSkills: string;

  roadmap: string;

  createdAt: string;
}

export default function SkillGapHistory() {

  const [history, setHistory] =
    useState<
      SkillGapHistory[]
    >([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchHistory =
      async () => {

        try {

          const res =
            await axios.get(
              "/api/skill-gap-history"
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

      <div className="mt-16 border border-zinc-800 rounded-3xl p-10 text-center">

        <h2 className="text-2xl font-bold">

          No Skill Gap Reports

        </h2>

        <p className="text-zinc-500 mt-4">

          Generate your first skill gap analysis.

        </p>

      </div>
    );
  }

  return (

    <div className="mt-16">

      <div className="mb-8">

        <h2 className="text-4xl font-bold">

          Recent Skill Gap Reports

        </h2>

        <p className="text-zinc-500 mt-3">

          Your latest AI-generated skill gap analyses

        </p>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {history.map((item) => (

          <div
            key={item.id}
            className="border border-zinc-800 rounded-3xl p-8"
          >

            <div className="mb-6">

              <p className="text-zinc-500">

                Career Transition

              </p>

              <h2 className="text-3xl font-bold mt-2">

                {item.currentSkills}

              </h2>

              <p className="text-zinc-500 mt-2">

                to

              </p>

              <h2 className="text-3xl font-bold mt-2">

                {item.targetRole}

              </h2>

            </div>

            <div className="mb-6">

              <h3 className="text-xl font-bold mb-3">

                Missing Skills

              </h3>

              <p className="text-zinc-400 leading-8 line-clamp-5">

                {item.missingSkills}

              </p>

            </div>

            <div>

              <h3 className="text-xl font-bold mb-3">

                Learning Roadmap

              </h3>

              <p className="text-zinc-400 leading-8 line-clamp-5">

                {item.roadmap}

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