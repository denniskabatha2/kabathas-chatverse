import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { PlusCircle } from "lucide-react";

interface Story {
  id: number;
  user_id: string;
  image_url: string;
  created_at: string;
}

export const Stories = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    // Load stories from localStorage
    const savedStories = JSON.parse(localStorage.getItem('stories') || '[]');
    setStories(savedStories);
  }, []);

  const mockStories = [
    { id: 1, name: "Your Story", image: "https://i.pravatar.cc/150?img=1", isUser: true },
    { id: 2, name: "John", image: "https://i.pravatar.cc/150?img=2" },
    { id: 3, name: "Sarah", image: "https://i.pravatar.cc/150?img=3" },
    { id: 4, name: "Mike", image: "https://i.pravatar.cc/150?img=4" },
    { id: 5, name: "Emma", image: "https://i.pravatar.cc/150?img=5" },
  ];

  return (
    <div className="flex gap-4 p-4 overflow-x-auto">
      {mockStories.map((story) => (
        <div key={story.id} className="flex flex-col items-center gap-1">
          <div className="story-ring">
            <div className="p-0.5 bg-background rounded-full">
              <Avatar className="w-16 h-16 relative">
                <AvatarImage src={story.image} alt={story.name} />
                {story.isUser && (
                  <div className="absolute bottom-0 right-0 bg-primary rounded-full p-1">
                    <PlusCircle className="w-4 h-4" />
                  </div>
                )}
              </Avatar>
            </div>
          </div>
          <span className="text-sm">{story.name}</span>
        </div>
      ))}
      {stories.map((story) => (
        <div key={story.id} className="flex flex-col items-center gap-1">
          <div className="story-ring">
            <div className="p-0.5 bg-background rounded-full">
              <Avatar className="w-16 h-16">
                <AvatarImage src={story.image_url} alt="Story" />
              </Avatar>
            </div>
          </div>
          <span className="text-sm">Story</span>
        </div>
      ))}
    </div>
  );
};