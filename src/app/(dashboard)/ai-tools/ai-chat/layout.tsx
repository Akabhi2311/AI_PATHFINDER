import ChatSidebar from "@/components/ai-chat/chat-sidebar";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">

      <ChatSidebar />

      <div className="flex-1">
        {children}
      </div>

    </div>
  );
}