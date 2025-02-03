import { Menu, MessageCircle, Search } from "lucide-react";

export const MobileHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border p-4">
      <div className="flex items-center justify-between">
        <Menu className="w-6 h-6" />
        <h1 className="text-lg font-bold">Kabatha's Chat</h1>
        <div className="flex gap-4">
          <Search className="w-6 h-6" />
          <MessageCircle className="w-6 h-6" />
        </div>
      </div>
    </header>
  );
};