import { getUserInfo } from "@/services/auth/getUserInfo";
import DashboardNavbarContent from "./DashboardNavbarContent";
import { IUserInfo } from "@/types/user.interface";
import { getDefaultDashboardRoutes } from "@/lib/auth-utils";
import { getNavItemsByRole } from "@/lib/navItems.config";

export default async function DashboardNavbar() {
  const userInfo = await getUserInfo() as IUserInfo;
  const navItems = getNavItemsByRole(userInfo.role);
  const dashboardHome = getDefaultDashboardRoutes(userInfo.role);

  return <DashboardNavbarContent userInfo={userInfo} navItems={navItems} dashboardHome={dashboardHome} />
}
