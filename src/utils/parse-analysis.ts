export function parseAnalysis(
  text: string
) {
  const sections = {
    ats: "",

    strengths: "",

    missing: "",

    improvements: "",

    career: "",
  };

  const lower =
    text.toLowerCase();

  // strengths
  const strengthsIndex =
    lower.indexOf(
      "key strengths"
    );

  // missing
  const missingIndex =
    lower.indexOf(
      "missing skills"
    );

  // improvements
  const improvementsIndex =
    lower.indexOf(
      "resume improvements"
    );

  // career
  const careerIndex =
    lower.indexOf(
      "career suggestions"
    );

  if (
    strengthsIndex !== -1 &&
    missingIndex !== -1
  ) {
    sections.strengths =
      text.slice(
        strengthsIndex,
        missingIndex
      );
  }

  if (
    missingIndex !== -1 &&
    improvementsIndex !== -1
  ) {
    sections.missing =
      text.slice(
        missingIndex,
        improvementsIndex
      );
  }

  if (
    improvementsIndex !== -1 &&
    careerIndex !== -1
  ) {
    sections.improvements =
      text.slice(
        improvementsIndex,
        careerIndex
      );
  }

  if (careerIndex !== -1) {
    sections.career =
      text.slice(careerIndex);
  }

  return sections;
}