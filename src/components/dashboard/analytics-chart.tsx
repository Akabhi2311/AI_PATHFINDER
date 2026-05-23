"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";

interface Props {
  data: {
    name: string;
    value: number;
  }[];
}

export default function AnalyticsChart({
  data,
}: Props) {

  return (

    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 h-[400px]">

      <h2 className="text-3xl font-bold mb-8">
        Platform Analytics
      </h2>

      <ResponsiveContainer
        width="100%"
        height="100%"
      >

        <BarChart data={data}>

          <XAxis dataKey="name" />

          <Tooltip />

          <Bar
            dataKey="value"
            radius={[10, 10, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}