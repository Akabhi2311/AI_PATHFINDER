CREATE TABLE "resume_analysis" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"resume_url" text,
	"ai_analysis" text,
	"ats_score" text,
	"extracted_skills" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DROP TABLE "resumeAnalysis" CASCADE;