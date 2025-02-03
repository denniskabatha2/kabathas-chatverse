import { MainLayout } from "@/components/layout/MainLayout";

const Messages = () => {
  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] h-[calc(100vh-4rem)]">
        <div className="border-r border-border p-4">
          <h2 className="font-semibold mb-4">Messages</h2>
          <div className="space-y-2">
            {/* Placeholder for message list */}
            <div className="p-4 hover:bg-accent rounded-lg cursor-pointer">
              <div className="font-medium">John Doe</div>
              <div className="text-sm text-muted-foreground">Last message...</div>
            </div>
          </div>
        </div>
        <div className="p-4 flex items-center justify-center text-muted-foreground">
          Select a conversation to start messaging
        </div>
      </div>
    </MainLayout>
  );
};

export default Messages;