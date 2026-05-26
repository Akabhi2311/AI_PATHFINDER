ALTER TABLE "mock_interviews" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (sequence name "mock_interviews_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "mock_interviews" ALTER COLUMN "role" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "mock_interviews" ALTER COLUMN "level" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "mock_interviews" ALTER COLUMN "interview_guide" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "mock_interviews" ALTER COLUMN "created_by" DROP NOT NULL;