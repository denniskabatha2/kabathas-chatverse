import { MainLayout } from "@/components/layout/MainLayout";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CreateStory } from "@/components/features/CreateStory";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { AuthForm } from "@/components/auth/AuthForm";
import { PlusCircle, ImagePlus } from "lucide-react";

const Profile = () => {
  const [showCreateStory, setShowCreateStory] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const { toast } = useToast();
  const [session, setSession] = useState(null);

  // Check auth status
  supabase.auth.getSession().then(({ data: { session } }) => {
    setSession(session);
  });

  // Handle file upload for posts
  const handlePostUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('posts')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from('posts')
        .insert([
          {
            user_id: session?.user.id,
            image_url: fileName,
            caption: '',
            created_at: new Date().toISOString(),
          },
        ]);

      if (dbError) throw dbError;

      toast({ title: "Post created successfully!" });
      setShowCreatePost(false);
    } catch (error: any) {
      toast({ 
        title: "Error creating post",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (!session) {
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
              <AvatarImage src={session?.user?.user_metadata?.avatar_url || "/placeholder.svg"} alt="Profile" />
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold mb-2">{session?.user?.email}</h1>
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