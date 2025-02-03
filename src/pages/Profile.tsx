import { MainLayout } from "@/components/layout/MainLayout";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const Profile = () => {
  return (
    <MainLayout>
      <div className="p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-8 mb-8">
            <Avatar className="w-32 h-32">
              <AvatarImage src="/placeholder.svg" alt="Profile" />
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold mb-2">Username</h1>
              <div className="flex gap-4 mb-4">
                <div><span className="font-bold">0</span> posts</div>
                <div><span className="font-bold">0</span> followers</div>
                <div><span className="font-bold">0</span> following</div>
              </div>
              <Button>Edit Profile</Button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {/* Placeholder for posts grid */}
            <div className="aspect-square bg-accent rounded-lg"></div>
            <div className="aspect-square bg-accent rounded-lg"></div>
            <div className="aspect-square bg-accent rounded-lg"></div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;