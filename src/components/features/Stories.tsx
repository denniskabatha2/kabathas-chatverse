import { Avatar } from "@/components/ui/avatar";
import { PlusCircle } from "lucide-react";

const stories = [
  { id: 1, name: "Your Story", image: "https://i.pravatar.cc/150?img=1", isUser: true },
  { id: 2, name: "John", image: "https://i.pravatar.cc/150?img=2" },
  { id: 3, name: "Sarah", image: "https://i.pravatar.cc/150?img=3" },
  { id: 4, name: "Mike", image: "https://i.pravatar.cc/150?img=4" },
  { id: 5, name: "Emma", image: "https://i.pravatar.cc/150?img=5" },
];

export const Stories = () => {
  return (
    <div className="flex gap-4 p-4 overflow-x-auto">
      {stories.map((story) => (
        <div key={story.id} className="flex flex-col items-center gap-1">
          <div className="story-ring">
            <div className="p-0.5 bg-background rounded-full">
              <Avatar className="w-16 h-16 relative">
                <Avatar.Image src={story.image} alt={story.name} />
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
    </div>
  );
};