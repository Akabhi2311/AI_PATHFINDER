interface Props {
  skill: string;
}

export default function SkillBadge({
  skill,
}: Props) {
  return (
    <div className="px-4 py-2 rounded-full bg-black text-white text-sm font-medium">
      {skill}
    </div>
  );
}