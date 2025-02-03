import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { ImagePlus } from "lucide-react";

export const CreateStory = () => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    try {
      const user = supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('stories')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from('stories')
        .insert([
          {
            user_id: (await user).data.user?.id,
            image_url: fileName,
            created_at: new Date().toISOString(),
          },
        ]);

      if (dbError) throw dbError;

      toast({ title: "Story created successfully!" });
      setFile(null);
    } catch (error: any) {
      toast({ 
        title: "Error creating story",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
        <label className="cursor-pointer">
          <Input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="flex flex-col items-center gap-2">
            <ImagePlus className="w-12 h-12 text-muted-foreground" />
            <p className="text-muted-foreground">
              {file ? file.name : "Click to upload story"}
            </p>
          </div>
        </label>
      </div>
      <Button type="submit" disabled={!file} className="w-full">
        Create Story
      </Button>
    </form>
  );
};