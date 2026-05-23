CREATE TABLE "ai_chats" (
	"id" serial PRIMARY KEY NOT NULL,
	"chat_id" text NOT NULL,
	"role" text NOT NULL,
	"message" text NOT NULL,
	"created_by" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "mock_interviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"role" text,
	"level" text,
	"interview_guide" text,
	"created_by" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "roadmap_progress" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"roadmap_id" text NOT NULL,
	"step" text NOT NULL,
	"completed" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "roadmaps" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"role" text,
	"level" text,
	"roadmap" text,
	"created_by" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "skill_gap_reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"role" text,
	"current_skills" text,
	"missing_skills" text,
	"analysis" text,
	"created_by" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "weekly_planners" (
	"id" serial PRIMARY KEY NOT NULL,
	"role" text,
	"roadmap" text,
	"planner" text,
	"created_by" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DROP TABLE "aiChatHistory" CASCADE;--> statement-breakpoint
ALTER TABLE "resume_analysis" ADD COLUMN "created_by" text NOT NULL;