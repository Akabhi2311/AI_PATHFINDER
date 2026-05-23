CREATE TABLE "aiChatHistory" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"chatId" text NOT NULL,
	"role" text NOT NULL,
	"message" text NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
