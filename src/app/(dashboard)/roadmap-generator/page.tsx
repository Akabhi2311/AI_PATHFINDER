"use client";

import {
  useState,
} from "react";
import jsPDF from "jspdf";
import {
  Download,
} from "lucide-react";
import axios from "axios";

import {
  Route,
  Sparkles,
  Loader2,
} from "lucide-react";
import RoadmapTimeline from "@/components/roadmap/roadmap-timeline";
export default function RoadmapPage() {
  const [role, setRole] =
    useState("");

  const [level, setLevel] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [roadmap, setRoadmap] =
    useState("");

  const generateRoadmap =
  async () => {
    try {
      setLoading(true);

      const res =
        await axios.post(
          "/api/roadmap-generator",
          {
            role,
            level,
          }
        );

      console.log(
        res.data
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

  const downloadPDF = () => {
    if (!roadmap) return;

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
        "AI Pathfinder Roadmap",
        20,
        20
    );

    doc.setFontSize(12);

    const splitText =
        doc.splitTextToSize(
        roadmap,
        170
        );

    doc.text(
        splitText,
        20,
        40
    );

    doc.save(
        `${role}-roadmap.pdf`
    );
    };


  const exportPDF = async () => {
  const element =
    document.getElementById(
      "roadmap-content"
    );

  if (!element) return;

  const html2pdf =
    (
      await import(
        "html2pdf.js"
      )
    ).default;

  html2pdf(element, {
    margin: 10,
    filename:
      "AI-Pathfinder-Roadmap.pdf",

    image: {
      type: "jpeg",
      quality: 1,
    },

    html2canvas: {
      scale: 2,
    },

    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation:
        "portrait",
    },
  });
};

  return (
    <div className="max-w-6xl mx-auto p-10">

      {/* HEADER */}
      <div className="mb-10">

        <div className="flex items-center gap-3 mb-4">

          <Route size={40} />

          <h1 className="text-5xl font-bold">
            AI Roadmap Generator
          </h1>

        </div>

        <p className="text-zinc-500 text-lg">
          Generate personalized AI-powered career roadmaps.
        </p>

      </div>

      {/* FORM */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm mb-10">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* ROLE */}
          <input
            type="text"
            placeholder="Target Role (e.g. Full Stack Developer)"
            value={role}
            onChange={(e) =>
              setRole(
                e.target.value
              )
            }
            className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-black dark:text-white rounded-2xl p-4 outline-none"
          />

          {/* LEVEL */}
          <select
            value={level}
            onChange={(e) =>
              setLevel(
                e.target.value
              )
            }
            className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-black dark:text-white rounded-2xl p-4 outline-none"
          >
            <option
            value=""
            className="bg-white text-black dark:bg-zinc-950 dark:text-white"
            >
            Select Experience Level
            </option>

            <option
            value="Beginner"
            className="bg-white text-black dark:bg-zinc-950 dark:text-white"
            >
            Beginner
            </option>

            <option
            value="Intermediate"
            className="bg-white text-black dark:bg-zinc-950 dark:text-white"
            >
            Intermediate
            </option>

            <option
            value="Advanced"
            className="bg-white text-black dark:bg-zinc-950 dark:text-white"
            >
            Advanced
            </option>

          </select>

        </div>

        {/* BUTTON */}
        <button
          onClick={
            generateRoadmap
          }
          disabled={loading}
          className="mt-6 bg-black text-white px-6 py-4 rounded-2xl flex items-center gap-3"
        >
          {loading ? (
            <>
              <Loader2
                className="animate-spin"
                size={20}
              />

              Generating...
            </>
          ) : (
            <>
              <Sparkles size={20} />

              Generate Roadmap
            </>
          )}
        </button>

      </div>

      {/* RESULT */}
      {roadmap && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-10 shadow-sm">

          <h2 className="text-3xl font-bold mb-8">
            Your AI Career Roadmap
          </h2>

          <div className="flex justify-end mb-6">

        <button
            onClick={downloadPDF}
            className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-2xl"
        >

            <Download size={18} />

            Export PDF

        </button>

        </div>

          {roadmap && (
  <RoadmapTimeline
    roadmap={roadmap}
  />
)}
        </div>
      )}

    </div>
  );
}