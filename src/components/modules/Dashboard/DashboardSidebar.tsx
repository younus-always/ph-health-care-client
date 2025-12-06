import { IUserInfo } from "@/types/user.interface";
import DashboardSidebarContent from "./DashboardSidebarContent";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getDefaultDashboardRoutes } from "@/lib/auth-utils";
import { INavSection } from "@/types/dashboard.interface";

export default async function DashboardSidebar() {
      const userInfo = await getUserInfo() as IUserInfo;
      const navItems: INavSection[] = [];
      const dashboardHome = getDefaultDashboardRoutes(userInfo.role);

      return <DashboardSidebarContent userInfo={userInfo} navItems={navItems} dashboardHome={dashboardHome} />
}
