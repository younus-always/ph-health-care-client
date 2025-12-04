import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type UserRole = "ADMIN" | "PATIENT" | "DOCTOR";
type RouteConfig = {
      exact: string[];
      patters: RegExp[];
};

const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];
const commonProtectedRoutes: RouteConfig = {
      exact: ["/my-profile", "/settings"],
      patters: []
};
const patientProtectedRoutes: RouteConfig = {
      patters: [/^\dashboard/],
      exact: []
};
const doctorProtectedRoutes: RouteConfig = {
      patters: [/^\doctor/],
      exact: []
};
const adminProtectedRoutes: RouteConfig = {
      patters: [/^\admin/],
      exact: []
};


const isAuthRoute = (pathname: string) => {
      return authRoutes.some((route: string) => route === pathname);
};

const isRouteMatches = (pathname: string, routes: RouteConfig) => {
      if (routes.exact.includes(pathname)) {
            return true;
      };
      return routes.patters.some((pattern: RegExp) => pattern.test(pathname));
};

const getRouteOwner = (pathname: string): "ADMIN" | "DOCTOR" | "PATIENT" | "COMMON" | null => {
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

const getDefaultDashboardRoutes = (role: UserRole): string => {
      if (role === "ADMIN") {
            return "/admin/dashboard"
      } else if (role === "DOCTOR") {
            return "/doctor/dashboard"
      } else if (role === "PATIENT") {
            return "/dashboard"
      } else return "/";
};

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
      return NextResponse.next();
}

export const config = {
      matcher: [
            /*
             * Match all request paths except for the ones starting with:
             * - api (API routes)
             * - _next/static (static files)
             * - _next/image (image optimization files)
             * - favicon.ico, sitemap.xml, robots.txt (metadata files)
             */
            '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)',
      ],
}