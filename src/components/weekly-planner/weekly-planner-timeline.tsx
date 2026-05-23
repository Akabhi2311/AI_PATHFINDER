"use client";

interface Props {
  planner: string;
}

export default function WeeklyPlannerTimeline({
  planner,
}: Props) {

  const sections =
    planner
      .split("\n")
      .filter(
        (line) =>
          line.trim() !== ""
      );

  return (

    <div className="space-y-6">

      {sections.map(
        (
          section,
          index
        ) => {

          const isHeading =
            section.startsWith(
              "#"
            );

          const isTask =
            section.startsWith(
              "-"
            );

          return (

            <div
              key={index}
              className={`
                rounded-3xl
                border
                border-zinc-200
                dark:border-zinc-800
                bg-white
                dark:bg-zinc-900
                p-6
                transition-all
                hover:shadow-lg

                ${
                  isHeading
                    ? "font-bold text-2xl"
                    : ""
                }

                ${
                  isTask
                    ? "text-zinc-700 dark:text-zinc-300 leading-8"
                    : ""
                }
              `}
            >

              {section
                .replaceAll(
                  "#",
                  ""
                )
                .replaceAll(
                  "*",
                  ""
                )}

            </div>
          );
        }
      )}

    </div>
  );
}