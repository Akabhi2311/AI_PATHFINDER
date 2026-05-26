ALTER TABLE "mock_interviews" ALTER COLUMN "role" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "mock_interviews" ALTER COLUMN "level" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "mock_interviews" ALTER COLUMN "interview_guide" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "mock_interviews" ALTER COLUMN "created_by" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "weekly_planners" ALTER COLUMN "role" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "weekly_planners" ALTER COLUMN "roadmap" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "weekly_planners" ALTER COLUMN "planner" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "weekly_planners" ALTER COLUMN "created_by" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "skill_gap_reports" ADD COLUMN "target_role" text;--> statement-breakpoint
ALTER TABLE "skill_gap_reports" ADD COLUMN "roadmap" text;--> statement-breakpoint
ALTER TABLE "skill_gap_reports" ADD COLUMN "projects" text;--> statement-breakpoint
ALTER TABLE "skill_gap_reports" ADD COLUMN "job_prep" text;--> statement-breakpoint
ALTER TABLE "skill_gap_reports" DROP COLUMN "role";--> statement-breakpoint
ALTER TABLE "skill_gap_reports" DROP COLUMN "analysis";