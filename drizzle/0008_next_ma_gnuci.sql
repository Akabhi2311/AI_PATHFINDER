ALTER TABLE "ai_chats" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (sequence name "ai_chats_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "ai_chats" ALTER COLUMN "chat_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "ai_chats" ALTER COLUMN "role" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "ai_chats" ALTER COLUMN "message" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "ai_chats" ALTER COLUMN "created_by" DROP NOT NULL;