import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardNavbar } from "@/modules/dashboard/ui/components/dashboard-navbar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dashboard-layout">
      <SidebarProvider>
        <DashboardSidebar />
        <main className="flex flex-col h-screen w-screen bg-muted">
          <DashboardNavbar/>
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
};
export default Layout;
