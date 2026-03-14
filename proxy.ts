import { NextResponse, type NextRequest } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const parts = pathname.split("/");
  const label = parts[1];

  const reservedPaths = [
    "api",
    "admin",
    "login",
    "register",
    "onboarding",
    "_next",
    "static",
    "favicon.ico",
    "404",
  ];

  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname.endsWith("/login") ||
    pathname.endsWith("/register");
  const isDashboardPath = pathname.includes("/dashboard");
  const isReservedPath = !label || reservedPaths.includes(label);
  const needsSession = pathname === "/" || isAuthPage || isDashboardPath;

  // Rotas publicas nao precisam consultar sessao para responder.
  const session = needsSession
    ? await auth.api.getSession({
        headers: await headers(),
      })
    : null;

  if (session && (isAuthPage || pathname === "/")) {
    if (session.user.churchId) {
      const userChurch = await prisma.church.findUnique({
        where: { id: session.user.churchId },
        select: { label: true },
      });

      if (userChurch?.label) {
        return NextResponse.redirect(
          new URL(`/${userChurch.label}/dashboard`, request.url)
        );
      }
    }

    if (pathname !== "/onboarding") {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }
  }

  if (!isReservedPath) {
    const church = await prisma.church.findUnique({
      where: { label },
      select: { id: true },
    });

    if (!church) {
      return NextResponse.rewrite(new URL("/404", request.url));
    }

    if (isDashboardPath) {
      if (!session) {
        return NextResponse.redirect(new URL(`/${label}/login`, request.url));
      }

      if (session.user.churchId !== church.id) {
        if (session.user.churchId) {
          const myChurch = await prisma.church.findUnique({
            where: { id: session.user.churchId },
            select: { label: true },
          });

          return myChurch?.label
            ? NextResponse.redirect(
                new URL(`/${myChurch.label}/dashboard`, request.url)
              )
            : NextResponse.redirect(new URL("/onboarding", request.url));
        }

        return NextResponse.redirect(new URL("/onboarding", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
