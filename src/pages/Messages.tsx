import { MainLayout } from "@/components/layout/MainLayout";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface Message {
  id: number;
  sender: string;
  receiver: string;
  content: string;
  timestamp: string;
}

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem('messages') || '[]');
    setMessages(savedMessages);
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const newMsg = {
      id: Date.now(),
      sender: user.email,
      receiver: selectedChat,
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
    setNewMessage("");
  };

  const mockChats = [
    { id: 1, name: "John Doe", avatar: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "Jane Smith", avatar: "https://i.pravatar.cc/150?img=2" },
    { id: 3, name: "Mike Johnson", avatar: "https://i.pravatar.cc/150?img=3" },
  ];

  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] h-[calc(100vh-4rem)]">
        <div className="border-r border-border p-4">
          <h2 className="font-semibold mb-4">Messages</h2>
          <div className="space-y-2">
            {mockChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat.name)}
                className={`p-4 hover:bg-accent rounded-lg cursor-pointer flex items-center gap-3 ${
                  selectedChat === chat.name ? "bg-accent" : ""
                }`}
              >
                <Avatar>
                  <AvatarImage src={chat.avatar} alt={chat.name} />
                </Avatar>
                <div>
                  <div className="font-medium">{chat.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {messages
                      .filter(
                        (m) =>
                          (m.sender === chat.name && m.receiver === user.email) ||
                          (m.sender === user.email && m.receiver === chat.name)
                      )
                      .slice(-1)[0]?.content || "Start a conversation..."}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col h-full">
          {selectedChat ? (
            <>
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold">{selectedChat}</h3>
              </div>
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages
                  .filter(
                    (m) =>
                      (m.sender === selectedChat && m.receiver === user.email) ||
                      (m.sender === user.email && m.receiver === selectedChat)
                  )
                  .map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === user.email
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.sender === user.email
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
              </div>
              <div className="p-4 border-t border-border">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex gap-2"
                >
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1"
                  />
                  <Button type="submit">Send</Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Messages;