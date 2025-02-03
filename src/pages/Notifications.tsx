import { MainLayout } from "@/components/layout/MainLayout";
import { useEffect, useState } from "react";
import { Heart, MessageCircle, UserPlus } from "lucide-react";

interface Notification {
  id: number;
  type: "like" | "comment" | "follow";
  user: string;
  content: string;
  timestamp: string;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const savedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    setNotifications(savedNotifications);
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="w-5 h-5 text-red-500" />;
      case "comment":
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case "follow":
        return <UserPlus className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };

  const mockNotifications: Notification[] = [
    {
      id: 1,
      type: "like",
      user: "John Doe",
      content: "liked your post",
      timestamp: new Date().toISOString(),
    },
    {
      id: 2,
      type: "comment",
      user: "Jane Smith",
      content: "commented on your post: 'Great photo!'",
      timestamp: new Date().toISOString(),
    },
    {
      id: 3,
      type: "follow",
      user: "Mike Johnson",
      content: "started following you",
      timestamp: new Date().toISOString(),
    },
  ];

  return (
    <MainLayout>
      <div className="p-4 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Notifications</h1>
        <div className="space-y-4">
          {[...mockNotifications, ...notifications].map((notification) => (
            <div
              key={notification.id}
              className="p-4 border border-border rounded-lg flex items-start gap-3 hover:bg-accent/50 transition-colors"
            >
              <div className="mt-1">{getNotificationIcon(notification.type)}</div>
              <div className="flex-1">
                <div className="font-medium">
                  {notification.user}{" "}
                  <span className="font-normal text-muted-foreground">
                    {notification.content}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {new Date(notification.timestamp).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Notifications;