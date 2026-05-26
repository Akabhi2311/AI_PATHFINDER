import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

export const aiChats =
  pgTable(
    "ai_chats",
    {

      id:
        integer("id")
          .primaryKey()
          .generatedAlwaysAsIdentity(),

      chatId:
        text("chat_id"),

      role:
        text("role"),

      message:
        text("message"),

      createdBy:
        text("created_by"),

      createdAt:
        timestamp("created_at")
          .defaultNow(),
    }
  );

export const resumeAnalysis =
  pgTable(
    "resume_analysis",
    {
      id: uuid("id")
        .defaultRandom()
        .primaryKey(),

      resumeUrl:
        text("resume_url"),

      aiAnalysis:
        text("ai_analysis"),

      atsScore:
        text("ats_score"),

      extractedSkills:
        text(
          "extracted_skills"
        ),
      
      createdBy: text("created_by")
      .notNull(),

      createdAt:
        timestamp(
          "created_at"
        ).defaultNow(),
    }
  );

  export const roadmaps =
  pgTable(
    "roadmaps",
    {

      id:
        integer("id")
          .primaryKey()
          .generatedAlwaysAsIdentity(),

      role:
        text("role"),

      level:
        text("level"),

      skills:
        text("skills"),

      roadmap:
        text("roadmap"),

      createdBy:
        text("created_by"),

      createdAt:
        timestamp("created_at")
          .defaultNow(),
    }
  );

  export const roadmapProgress =
  pgTable(
    "roadmap_progress",
    {
      id: uuid("id")
        .defaultRandom()
        .primaryKey(),

      roadmapId:
        text("roadmap_id")
          .notNull(),

      step:
        text("step")
          .notNull(),

      completed:
        boolean(
          "completed"
        ).default(false),

      createdAt:
        timestamp(
          "created_at"
        ).defaultNow(),
    }
  );

  export const weeklyPlanners =
  pgTable(
    "weekly_planners",
    {

      id:
        integer("id")
          .primaryKey()
          .generatedAlwaysAsIdentity(),

      role:
        text("role"),

      roadmap:
        text("roadmap"),

      planner:
        text("planner"),

      createdBy:
        text("created_by"),

      createdAt:
        timestamp("created_at")
          .defaultNow(),
    }
  );

export const skillGapReports =
  pgTable(
    "skill_gap_reports",
    {

      id:
        integer("id")
          .primaryKey()
          .generatedAlwaysAsIdentity(),

      targetRole:
        text("target_role"),

      currentSkills:
        text("current_skills"),

      missingSkills:
        text("missing_skills"),

      roadmap:
        text("roadmap"),

      projects:
        text("projects"),

      jobPrep:
        text("job_prep"),

      createdBy:
        text("created_by"),

      createdAt:
        timestamp("created_at")
          .defaultNow(),
    }
  );

export const mockInterviews =
  pgTable(
    "mock_interviews",
    {

      id:
        integer("id")
          .primaryKey()
          .generatedAlwaysAsIdentity(),

      role:
        text("role"),

      level:
        text("level"),

      interviewGuide:
        text("interview_guide"),

      createdBy:
        text("created_by"),

      createdAt:
        timestamp("created_at")
          .defaultNow(),
    }
  );