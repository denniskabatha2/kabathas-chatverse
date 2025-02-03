import { MainLayout } from "@/components/layout/MainLayout";
import { Stories } from "@/components/features/Stories";
import { Feed } from "@/components/features/Feed";

const Index = () => {
  return (
    <MainLayout>
      <div className="pt-4 pb-16">
        <Stories />
        <Feed />
      </div>
    </MainLayout>
  );
};

export default Index;