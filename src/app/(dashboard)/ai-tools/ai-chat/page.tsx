"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { v4 as uuidv4 } from "uuid";

export default function AIChatRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const id = uuidv4();

    router.push(`/ai-tools/ai-chat/${id}`);
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center">
      Loading chat...
    </div>
  );
}