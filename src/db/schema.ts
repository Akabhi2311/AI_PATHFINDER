import {
  pgTable,
  text,
  timestamp,
  uuid,
  serial,
  boolean,
} from "drizzle-orm/pg-core";

export const aiChats = pgTable(
  "ai_chats",
  {
    id: serial("id").primaryKey(),

    chatId: text("chat_id").notNull(),

    role: text("role").notNull(),

    message: text("message").notNull(),

    createdBy: text("created_by").notNull(),

    createdAt: timestamp("created_at").defaultNow(),
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
  pgTable("roadmaps", {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    role: text("role"),

    level: text("level"),

    roadmap: text("roadmap"),

    createdBy: text(
      "created_by"
    ),

    createdAt: timestamp(
      "created_at"
    ).defaultNow(),
  });

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
        serial("id")
          .primaryKey(),

      role:
        text("role")
          .notNull(),

      roadmap:
        text("roadmap")
          .notNull(),

      planner:
        text("planner")
          .notNull(),

      createdBy:
        text("created_by")
          .notNull(),

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
        serial("id")
          .primaryKey(),

      targetRole:
        text("target_role")
          .notNull(),

      currentSkills:
        text("current_skills")
          .notNull(),

      missingSkills:
        text("missing_skills"),

      roadmap:
        text("roadmap"),

      createdBy:
        text("created_by")
          .notNull(),

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
        serial("id")
          .primaryKey(),

      role:
        text("role")
          .notNull(),

      level:
        text("level")
          .notNull(),

      interviewGuide:
        text("interview_guide")
          .notNull(),

      createdBy:
        text("created_by")
          .notNull(),

      createdAt:
        timestamp("created_at")
          .defaultNow(),
    }
  );