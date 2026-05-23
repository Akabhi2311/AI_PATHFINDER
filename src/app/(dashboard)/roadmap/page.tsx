"use client";

import {
  useState,
} from "react";

import axios from "axios";

export default function RoadmapPage() {
  const [role, setRole] =
    useState("");

  const [skills, setSkills] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [roadmap, setRoadmap] =
    useState("");

  const generateRoadmap =
    async () => {
      if (!role || !skills)
        return;

      try {
        setLoading(true);

        const res =
          await axios.post(
            "/api/ai-roadmap",
            {
              role,
              skills,
            }
          );

        setRoadmap(
          res.data.roadmap
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="max-w-6xl mx-auto p-10">

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-5xl font-bold">
          AI Roadmap Generator
        </h1>

        <p className="text-zinc-500 mt-3 text-lg">
          Generate a personalized
          AI career roadmap based
          on your target role and
          current skills.
        </p>

      </div>

      {/* FORM */}
      <div className="space-y-6">

        {/* ROLE */}
        <input
          type="text"

          placeholder="Target Role (e.g. AI Engineer)"

          value={role}

          onChange={(e) =>
            setRole(
              e.target.value
            )
          }

          className="w-full border rounded-2xl p-4"
        />

        {/* SKILLS */}
        <textarea
          placeholder="Current Skills (React, Node.js, Python...)"

          value={skills}

          onChange={(e) =>
            setSkills(
              e.target.value
            )
          }

          className="w-full border rounded-2xl p-4 h-40"
        />

        {/* BUTTON */}
        <button
          onClick={
            generateRoadmap
          }

          className="bg-black text-white px-6 py-3 rounded-xl"
        >
          {loading
            ? "Generating..."
            : "Generate Roadmap"}
        </button>

      </div>

      {/* RESULT */}
      {roadmap && (
        <div className="mt-12 border rounded-3xl p-8 shadow-sm bg-white dark:bg-zinc-900">

          <h2 className="text-3xl font-bold mb-6">
            Your AI Career Roadmap
          </h2>

          <div className="whitespace-pre-wrap leading-8 text-zinc-700 dark:text-zinc-300">
            {roadmap}
          </div>

        </div>
      )}

    </div>
  );
}