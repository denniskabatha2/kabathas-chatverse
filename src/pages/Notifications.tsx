import { MainLayout } from "@/components/layout/MainLayout";

const Notifications = () => {
  return (
    <MainLayout>
      <div className="p-4 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Notifications</h1>
        <div className="space-y-4">
          {/* Placeholder notifications */}
          <div className="p-4 border border-border rounded-lg">
            <div className="font-medium">New follower</div>
            <div className="text-sm text-muted-foreground">Jane Doe started following you</div>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <div className="font-medium">Post liked</div>
            <div className="text-sm text-muted-foreground">John Doe liked your post</div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Notifications;