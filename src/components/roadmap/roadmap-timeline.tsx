"use client";

import { useState } from "react";

import axios from "axios";

import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";

import {
  CheckCircle2,
  PlayCircle,
  BookOpen,
  FolderGit2,
  Globe,
} from "lucide-react";

interface Props {
  roadmap: string;
  roadmapId?: string;
}

export default function RoadmapTimeline({
  roadmap,
  roadmapId,
}: Props) {
  // SPLIT ONLY MAJOR PHASES
  const phases = roadmap
    .split("\n")
    .filter((line) => line.trim() !== "");


  const [
    completedSteps,
    setCompletedSteps,
  ] = useState<string[]>(
    []
  );

  const toggleStep =
    async (
      step: string
    ) => {
      const completed =
        !completedSteps.includes(
          step
        );

      try {
        await axios.post(
          "/api/roadmap-progress",
          {
            roadmapId,
            step,
            completed,
          }
        );

        if (completed) {
          setCompletedSteps(
            [
              ...completedSteps,
              step,
            ]
          );
        } else {
          setCompletedSteps(
            completedSteps.filter(
              (s) =>
                s !== step
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

  const progress =
    Math.round(
      (completedSteps.length /
        phases.length) *
        100
    ) || 0;

  return (
    <div
      id="roadmap-content"
      className="space-y-10"
    >
      {/* PROGRESS */}
      <div>

        <div className="flex items-center justify-between mb-4">

          <h2 className="text-3xl font-bold">
            Progress Tracking
          </h2>

          <span className="font-bold text-xl">
            {progress}%
          </span>

        </div>

        <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-4 overflow-hidden">

          <div
            className="bg-green-500 h-full transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

      {/* TIMELINE */}
      <div className="space-y-10">

        {phases.map(
          (
            phase,
            index
          ) => {
            const completed =
              completedSteps.includes(
                phase
              );

            return (
              <div
                key={index}
                className="flex gap-6"
              >
                {/* LEFT TIMELINE */}
                <div className="flex flex-col items-center">

                  <button
                    onClick={() =>
                      toggleStep(
                        phase
                      )
                    }
                    className={`rounded-full p-3 transition-all ${
                      completed
                        ? "bg-green-500 text-white"
                        : "bg-black text-white"
                    }`}
                  >
                    <CheckCircle2
                      size={22}
                    />
                  </button>

                  {index !==
                    phases.length -
                      1 && (
                    <div className="w-[2px] flex-1 bg-zinc-300 dark:bg-zinc-700 mt-3" />
                  )}

                </div>

                {/* CONTENT */}
                <div
                  className={`flex-1 border rounded-3xl p-8 shadow-sm transition-all ${
                    completed
                      ? "bg-green-50 dark:bg-green-950 border-green-300 dark:border-green-800"
                      : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                  }`}
                >

                  {/* MARKDOWN */}
                  <div className="prose prose-lg dark:prose-invert max-w-none">

                    <ReactMarkdown
                      remarkPlugins={[
                        remarkGfm,
                      ]}
                      components={{
                        a: ({
                          node,
                          ...props
                        }) => (
                          <a
                            {...props}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline break-all"
                          />
                        ),

                        h1: ({
                          node,
                          ...props
                        }) => (
                          <h1
                            className="text-4xl font-bold mb-6"
                            {...props}
                          />
                        ),

                        h2: ({
                          node,
                          ...props
                        }) => (
                          <h2
                            className="text-3xl font-semibold mt-6 mb-4"
                            {...props}
                          />
                        ),

                        h3: ({
                          node,
                          ...props
                        }) => (
                          <h3
                            className="text-2xl font-semibold mt-4 mb-3"
                            {...props}
                          />
                        ),

                        li: ({
                          node,
                          ...props
                        }) => (
                          <li
                            className="mb-2 leading-8"
                            {...props}
                          />
                        ),

                        p: ({
                          node,
                          ...props
                        }) => (
                          <p
                            className="leading-8"
                            {...props}
                          />
                        ),
                      }}
                    >
                      {phase}
                    </ReactMarkdown>

                  </div>

                  {/* RESOURCE TAGS */}
                  <div className="flex flex-wrap gap-3 mt-6">

                    {phase
                      .toLowerCase()
                      .includes(
                        "youtube"
                      ) && (
                      <div className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium">

                        <PlayCircle
                          size={16}
                        />

                        YouTube

                      </div>
                    )}

                    {phase
                      .toLowerCase()
                      .includes(
                        "github"
                      ) && (
                      <div className="flex items-center gap-2 bg-zinc-200 dark:bg-zinc-800 px-4 py-2 rounded-full text-sm font-medium">

                        <FolderGit2
                          size={16}
                        />

                        GitHub

                      </div>
                    )}

                    {phase
                      .toLowerCase()
                      .includes(
                        "documentation"
                      ) && (
                      <div className="flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">

                        <BookOpen
                          size={16}
                        />

                        Docs

                      </div>
                    )}

                    {phase
                      .toLowerCase()
                      .includes(
                        "course"
                      ) && (
                      <div className="flex items-center gap-2 bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium">

                        <Globe
                          size={16}
                        />

                        Course

                      </div>
                    )}

                  </div>

                </div>

              </div>
            );
          }
        )}

      </div>

    </div>
  );
}