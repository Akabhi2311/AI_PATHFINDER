interface Props {
  title: string;

  content: string;
}

export default function AnalysisCard({
  title,
  content,
}: Props) {
  return (
    <div className="border rounded-2xl p-6 bg-white dark:bg-zinc-900 shadow-sm">

      <h2 className="text-xl font-bold mb-4">
        {title}
      </h2>

      <p className="text-zinc-600 dark:text-zinc-300 whitespace-pre-wrap leading-7">
        {content}
      </p>

    </div>
  );
}