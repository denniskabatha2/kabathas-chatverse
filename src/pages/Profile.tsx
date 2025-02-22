import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CreateStory } from "@/components/features/CreateStory";
import { useToast } from "@/components/ui/use-toast";
import { AuthForm } from "@/components/auth/AuthForm";
import { PlusCircle, ImagePlus } from "lucide-react";

const Profile = () => {
  const [showCreateStory, setShowCreateStory] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Handle file upload for posts
  const handlePostUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Mock post creation
      const imageUrl = URL.createObjectURL(file);
      const posts = JSON.parse(localStorage.getItem('posts') || '[]');
      posts.push({
        id: Date.now(),
        user_id: user?.id,
        image_url: imageUrl,
        caption: '',
        created_at: new Date().toISOString(),
      });
      localStorage.setItem('posts', JSON.stringify(posts));

      toast({ title: "Post created successfully!" });
      setShowCreatePost(false);
      window.location.reload(); // Refresh to show new post
    } catch (error: any) {
      toast({ 
        title: "Error creating post",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  if (!user) {
    return (
      <MainLayout>
        <div className="p-4">
          <AuthForm />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-8 mb-8">
            <Avatar className="w-32 h-32">
              <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="Profile" />
            </Avatar>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">{user.email}</h1>
                <Button variant="destructive" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
              <div className="flex gap-4 mb-4">
                <Button 
                  variant="outline"
                  onClick={() => setShowCreateStory(!showCreateStory)}
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Create Story
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowCreatePost(!showCreatePost)}
                >
                  <ImagePlus className="w-4 h-4 mr-2" />
                  Create Post
                </Button>
              </div>
            </div>
          </div>

          {showCreateStory && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Create Story</h2>
              <CreateStory />
            </div>
          )}

          {showCreatePost && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Create Post</h2>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePostUpload}
                  />
                  <div className="flex flex-col items-center gap-2">
                    <ImagePlus className="w-12 h-12 text-muted-foreground" />
                    <p className="text-muted-foreground">Click to upload post</p>
                  </div>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;