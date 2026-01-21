import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dashboard-layout">
      <SidebarProvider>
        <DashboardSidebar />
        <main className="flex flex-col h-screen w-screen bg-muted">
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
};
export default Layout;
