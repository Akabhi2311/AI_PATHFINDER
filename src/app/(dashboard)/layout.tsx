import Sidebar from "@/components/dashboard/sidebar";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <div className="bg-black text-white min-h-screen flex">

      <Sidebar />

      <main className="flex-1 lg:ml-[300px] overflow-y-auto min-h-screen p-6 lg:p-10 pt-24 lg:pt-10">

        {children}

      </main>

    </div>
  );
}