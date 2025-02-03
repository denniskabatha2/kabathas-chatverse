import { MainLayout } from "@/components/layout/MainLayout";

const Search = () => {
  return (
    <MainLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Search</h1>
        <div className="max-w-xl mx-auto">
          <input
            type="search"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-lg border border-border bg-background"
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Search;