"use client";

import {
  useState,
} from "react";

import axios from "axios";

import {
  Brain,
  Sparkles,
  Upload,
} from "lucide-react";

import SkillGapHistory from "@/components/skill-gap/skill-gap-history";

export default function SkillGapPage() {

  const [
    targetRole,
    setTargetRole,
  ] = useState("");

  const [
    skills,
    setSkills,
  ] = useState("");

  const [file, setFile] =
    useState<File | null>(null);

  const [
    analysis,
    setAnalysis,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const analyzeSkillGap =
    async () => {

      if (!targetRole) {

        alert(
          "Please enter target role"
        );

        return;
      }

      if (
        !skills &&
        !file
      ) {

        alert(
          "Enter skills or upload resume"
        );

        return;
      }

      try {

        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "targetRole",
          targetRole
        );

        formData.append(
          "skills",
          skills
        );

        if (file) {

          formData.append(
            "file",
            file
          );
        }

        const res =
          await axios.post(
            "/api/skill-gap",
            formData
          );

        setAnalysis(
          res.data.analysis
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to analyze skill gap"
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

          <Brain size={40} />

          <h1 className="text-5xl font-bold">

            AI Skill Gap Analyzer

          </h1>

        </div>

        <p className="text-zinc-500 text-lg">

          Analyze missing skills for your dream role using your skills or resume.

        </p>

      </div>

      {/* FORM */}
      <div className="space-y-6 mb-10 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8">

        {/* TARGET ROLE */}
        <input
          type="text"
          placeholder="Target Role (Example: AI Engineer)"
          value={targetRole}
          onChange={(e) =>
            setTargetRole(
              e.target.value
            )
          }
          className="w-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 rounded-2xl p-4 outline-none"
        />

        {/* SKILLS */}
        <textarea
          placeholder="Enter your current skills (Example: React, Node.js, Python)"
          value={skills}
          onChange={(e) =>
            setSkills(
              e.target.value
            )
          }
          rows={6}
          className="w-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 rounded-2xl p-4 outline-none resize-none"
        />

        {/* DIVIDER */}
        <div className="flex items-center gap-4">

          <div className="h-px bg-zinc-800 flex-1" />

          <p className="text-zinc-500">
            OR
          </p>

          <div className="h-px bg-zinc-800 flex-1" />

        </div>

        {/* RESUME UPLOAD */}
        <label className="border-2 border-dashed border-zinc-700 rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-white transition-all">

          <Upload size={40} />

          <p className="mt-4 text-lg font-semibold">

            Upload Resume

          </p>

          <p className="text-zinc-500 mt-2">

            PDF only

          </p>

          <input
            type="file"
            accept=".pdf"
            hidden
            onChange={(e) =>
              setFile(
                e.target.files?.[0] ||
                  null
              )
            }
          />

        </label>

        {/* FILE NAME */}
        {file && (

          <div className="border border-zinc-800 rounded-2xl p-4">

            <p className="font-semibold">

              {file.name}

            </p>

          </div>
        )}

        {/* BUTTON */}
        <button
          onClick={
            analyzeSkillGap
          }
          disabled={loading}
          className="bg-black text-white px-6 py-4 rounded-2xl flex items-center gap-3 hover:opacity-90 transition-all disabled:opacity-50"
        >

          <Sparkles size={18} />

          {loading
            ? "Analyzing..."
            : "Analyze Skill Gap"}

        </button>

      </div>

      {/* RESULT */}
      {analysis && (

        <div className="border border-zinc-800 rounded-3xl p-8 whitespace-pre-wrap leading-8 bg-white dark:bg-zinc-900">

          <h2 className="text-3xl font-bold mb-6">

            Skill Gap Analysis

          </h2>

          <p className="text-zinc-400">

            {analysis}

          </p>

        </div>
      )}

      {/* HISTORY */}
      <SkillGapHistory />

    </div>
  );
}