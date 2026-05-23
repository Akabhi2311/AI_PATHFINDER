const COMMON_SKILLS = [
  "React",
  "Next.js",
  "Node.js",
  "MongoDB",
  "PostgreSQL",
  "Express.js",
  "Python",
  "C++",
  "Java",
  "JavaScript",
  "TypeScript",
  "Tailwind",
  "OpenCV",
  "Machine Learning",
  "AI",
  "Git",
  "Docker",
  "AWS",
];

export function extractSkills(
  text: string
) {
  return COMMON_SKILLS.filter(
    (skill) =>
      text
        .toLowerCase()
        .includes(
          skill.toLowerCase()
        )
  );
}