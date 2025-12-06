
export type UserRole = "ADMIN" | "PATIENT" | "DOCTOR";
export type RouteConfig = {
      exact: string[];
      patters: RegExp[];
};

export const authRoutes: string[] = ["/login", "/register", "/forgot-password", "/reset-password"];
export const commonProtectedRoutes: RouteConfig = {
      exact: ["/my-profile", "/settings", "/change-password"],
      patters: []
};
export const patientProtectedRoutes: RouteConfig = {
      patters: [/^\dashboard/],
      exact: []
};
export const doctorProtectedRoutes: RouteConfig = {
      patters: [/^\doctor/],
      exact: []
};
export const adminProtectedRoutes: RouteConfig = {
      patters: [/^\admin/],
      exact: []
};

export const isAuthRoute = (pathname: string) => {
      return authRoutes.some((route: string) => route === pathname);
};

export const isRouteMatches = (pathname: string, routes: RouteConfig) => {
      if (routes.exact.includes(pathname)) {
            return true;
      };
      return routes.patters.some((pattern: RegExp) => pattern.test(pathname));
};

export const getRouteOwner = (pathname: string): "ADMIN" | "DOCTOR" | "PATIENT" | "COMMON" | null => {
      if (isRouteMatches(pathname, adminProtectedRoutes)) {
            return "ADMIN";
      } else if (isRouteMatches(pathname, doctorProtectedRoutes)) {
            return "DOCTOR";
      } else if (isRouteMatches(pathname, patientProtectedRoutes)) {
            return "PATIENT";
      } else if (isRouteMatches(pathname, commonProtectedRoutes)) {
            return "COMMON";
      } else {
            return null;
      }
};

export const getDefaultDashboardRoutes = (role: UserRole): string => {
      if (role === "ADMIN") {
            return "/admin/dashboard"
      } else if (role === "DOCTOR") {
            return "/doctor/dashboard"
      } else if (role === "PATIENT") {
            return "/dashboard"
      } else return "/";
};

export const isValidRedirectForRole = (redirectPath: string, role: UserRole): boolean => {
      const routeOwner = getRouteOwner(redirectPath);

      if (routeOwner === null || routeOwner === "COMMON") {
            return true;
      } else if (routeOwner === role) {
            return true;
      } else return false;
};