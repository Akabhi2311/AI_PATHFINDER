CREATE TABLE "resumeAnalysis" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"resumeUrl" text NOT NULL,
	"extractedText" text NOT NULL,
	"aiAnalysis" text NOT NULL,
	"atsScore" text,
	"createdBy" text NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
