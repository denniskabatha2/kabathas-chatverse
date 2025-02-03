import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";

const Create = () => {
  return (
    <MainLayout>
      <div className="p-4 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <ImagePlus className="w-12 h-12 text-muted-foreground" />
            <p className="text-muted-foreground">Drag photos and videos here</p>
            <Button>Select from computer</Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Create;