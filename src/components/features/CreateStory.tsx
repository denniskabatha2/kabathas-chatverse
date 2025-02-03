import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
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
      // Mock story creation
      const imageUrl = URL.createObjectURL(file);
      const stories = JSON.parse(localStorage.getItem('stories') || '[]');
      stories.push({
        id: Date.now(),
        user_id: '1',
        image_url: imageUrl,
        created_at: new Date().toISOString(),
      });
      localStorage.setItem('stories', JSON.stringify(stories));

      toast({ title: "Story created successfully!" });
      setFile(null);
      window.location.reload(); // Refresh to show new story
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