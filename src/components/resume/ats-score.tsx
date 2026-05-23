"use client";

import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

interface Props {
  score: number;
}

export default function ATSScore({
  score,
}: Props) {
  return (
    <div className="w-56 h-56">

      <CircularProgressbar
        value={score}

        text={`${score}%`}

        styles={buildStyles({
          pathColor:
            score >= 80
              ? "#22c55e"
              : score >= 60
              ? "#eab308"
              : "#ef4444",

          textColor: "#000",

          trailColor: "#e5e7eb",
        })}
      />

      <p className="text-center mt-5 font-medium text-lg">
        ATS Compatibility
      </p>

    </div>
  );
}