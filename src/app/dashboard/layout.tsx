import AuthGuard from "@/components/auth-guard";
import { DashboardHeader } from "@/components/dashboard-header";
import { Logo } from "@/components/icons";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Book, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <Link href="/dashboard" className="flex items-center justify-center gap-2" prefetch={false}>
              <Logo className="h-6 w-6 text-primary" />
              <span className="font-headline text-lg font-semibold text-primary">Inquisity</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard">
                  <Link href="/dashboard">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                 <SidebarMenuButton asChild tooltip="My PDFs">
                  <Link href="/dashboard">
                    <Book />
                    <span>My PDFs</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <div className="flex flex-col min-h-screen">
            <DashboardHeader />
            <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  );
}
