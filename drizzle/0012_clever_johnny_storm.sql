ALTER TABLE "weekly_planners" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (sequence name "weekly_planners_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "weekly_planners" ALTER COLUMN "role" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "weekly_planners" ALTER COLUMN "roadmap" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "weekly_planners" ALTER COLUMN "planner" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "weekly_planners" ALTER COLUMN "created_by" DROP NOT NULL;