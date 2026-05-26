ALTER TABLE "roadmaps" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "roadmaps" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "roadmaps" ADD COLUMN "skills" text;