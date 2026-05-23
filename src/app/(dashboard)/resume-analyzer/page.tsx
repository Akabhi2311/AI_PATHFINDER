"use client";

import {
  useState,
} from "react";

import axios from "axios";

import ResumeUpload from "@/components/resume/resume-upload";

import ATSScore from "@/components/resume/ats-score";

import AnalysisCard from "@/components/resume/analysis-card";

import SkillBadge from "@/components/resume/skill-badge";

import ResumeHistory from "@/components/resume/resume-history";

import { parseAnalysis } from "@/utils/parse-analysis";

import { extractSkills } from "@/utils/extract-skills";

export default function ResumePage() {

  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [analysis, setAnalysis] =
    useState("");

  const [score, setScore] =
    useState(0);

  const [resumeUrl, setResumeUrl] =
    useState("");

  // PARSED ANALYSIS
  const parsed =
    parseAnalysis(analysis);

  // EXTRACTED SKILLS
  const skills =
    extractSkills(analysis);

  const handleAnalyze =
    async () => {

      if (!file) return;

      try {

        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        const res =
          await axios.post(
            "/api/ai-resume-agent",
            formData
          );

        setAnalysis(
          res.data.analysis
        );

        setScore(
          Number(
            res.data.atsScore
          )
        );

        setResumeUrl(
          res.data.resumeUrl
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

  return (

    <div className="p-10 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-5xl font-bold">

          AI Resume Analyzer

        </h1>

        <p className="text-zinc-500 mt-3 text-lg">

          Upload your resume and
          get AI-powered ATS
          insights.

        </p>

      </div>

      {/* UPLOAD */}
      <ResumeUpload
        onFileSelect={setFile}
      />

      {/* FILE INFO */}
      {file && (

        <div className="mt-6 flex items-center justify-between border border-zinc-800 rounded-2xl p-5 bg-white dark:bg-zinc-900 shadow-sm">

          <div>

            <p className="font-semibold text-lg">

              {file.name}

            </p>

            <p className="text-sm text-zinc-500">

              Ready for analysis

            </p>

          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="bg-white text-black px-6 py-3 rounded-xl hover:opacity-90 transition font-semibold"
          >

            {loading
              ? "Analyzing..."
              : "Analyze Resume"}

          </button>

        </div>
      )}

      {/* RESULTS */}
      {analysis && (

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT PANEL */}
          <div className="flex flex-col items-center border border-zinc-800 rounded-3xl p-10 shadow-sm bg-white dark:bg-zinc-900 h-fit">

            <ATSScore
              score={score}
            />

            <div className="mt-8 text-center">

              <p className="font-semibold text-lg">

                ATS Score

              </p>

              <p className="text-zinc-500 mt-2">

                Your resume ATS
                compatibility score

              </p>

            </div>

            <a
              href={resumeUrl}
              target="_blank"
              className="mt-8 text-blue-500 hover:underline"
            >

              View Uploaded Resume

            </a>

          </div>

          {/* RIGHT PANEL */}
          <div className="lg:col-span-2 space-y-6">

            {/* SKILLS */}
            <div className="border border-zinc-800 rounded-2xl p-6 bg-white dark:bg-zinc-900 shadow-sm">

              <h2 className="text-2xl font-bold mb-5">

                Extracted Skills

              </h2>

              <div className="flex flex-wrap gap-3">

                {skills.map(
                  (skill) => (

                    <SkillBadge
                      key={skill}
                      skill={skill}
                    />

                  )
                )}

              </div>

            </div>

            {/* STRENGTHS */}
            <AnalysisCard
              title="Key Strengths"
              content={
                parsed.strengths
              }
            />

            {/* MISSING */}
            <AnalysisCard
              title="Missing Skills"
              content={
                parsed.missing
              }
            />

            {/* IMPROVEMENTS */}
            <AnalysisCard
              title="Resume Improvements"
              content={
                parsed.improvements
              }
            />

            {/* CAREER */}
            <AnalysisCard
              title="Career Suggestions"
              content={
                parsed.career
              }
            />

          </div>

        </div>
      )}

      {/* HISTORY SECTION */}
      <ResumeHistory />

    </div>
  );
}