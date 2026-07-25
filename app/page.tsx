import Toggle from "@/app/components/Toggle";
import UxRichLayout from "@/app/components/UxRichLayout";
import AtsLayout from "@/app/components/AtsLayout";

interface PageProps {
  searchParams: Promise<{ view?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  const { view } = await searchParams;
  const activeView = view === "ats" ? "ats" : "ux";

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-6 px-4 bg-zinc-200 print:p-0 print:bg-white print:block">
      <Toggle activeView={activeView} />
      <div className="w-full flex-1 flex flex-col justify-start items-center print:block">
        {activeView === "ux" ? <UxRichLayout /> : <AtsLayout />}
      </div>
    </div>
  );
}
