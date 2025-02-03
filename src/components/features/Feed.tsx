import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import { useState } from "react";

const posts = [
  {
    id: 1,
    user: { name: "John Doe", avatar: "https://i.pravatar.cc/150?img=1" },
    image: "https://picsum.photos/600/600?random=1",
    likes: 1234,
    caption: "Beautiful day! 🌞",
    comments: 89,
  },
  {
    id: 2,
    user: { name: "Sarah Smith", avatar: "https://i.pravatar.cc/150?img=2" },
    image: "https://picsum.photos/600/600?random=2",
    likes: 856,
    caption: "Adventure time! 🏔️",
    comments: 45,
  },
];

export const Feed = () => {
  return (
    <div className="max-w-xl mx-auto">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

const Post = ({ post }: { post: typeof posts[0] }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="border-b border-border pb-4 mb-4">
      <div className="flex items-center gap-2 p-4">
        <Avatar>
          <AvatarImage src={post.user.avatar} alt={post.user.name} />
        </Avatar>
        <span className="font-semibold">{post.user.name}</span>
      </div>
      
      <img src={post.image} alt="" className="w-full aspect-square object-cover" />
      
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <div className="flex gap-4">
            <button onClick={() => setLiked(!liked)}>
              <Heart className={`w-6 h-6 ${liked ? "fill-red-500 stroke-red-500" : ""}`} />
            </button>
            <button>
              <MessageCircle className="w-6 h-6" />
            </button>
            <button>
              <Send className="w-6 h-6" />
            </button>
          </div>
          <button onClick={() => setSaved(!saved)}>
            <Bookmark className={`w-6 h-6 ${saved ? "fill-primary stroke-primary" : ""}`} />
          </button>
        </div>
        
        <div className="font-semibold mb-2">{post.likes.toLocaleString()} likes</div>
        <div>
          <span className="font-semibold mr-2">{post.user.name}</span>
          {post.caption}
        </div>
        <button className="text-muted-foreground mt-1">
          View all {post.comments} comments
        </button>
      </div>
    </div>
  );
};