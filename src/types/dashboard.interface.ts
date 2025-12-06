import { UserRole } from "@/lib/auth-utils";

interface NavItem {
      title: string;
      href: string;
      icon: string;
      badge?: string | number;
      description?: string;
      roles: UserRole[];
}

export interface INavSection {
      title?: string;
      items: NavItem[];
}