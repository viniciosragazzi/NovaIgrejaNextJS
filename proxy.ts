import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const parts = pathname.split("/");
  const label = parts[1]; // Ex: "igreja-central" ou "register"

  // 1. Rotas do sistema que NUNCA devem ser tratadas como label de igreja
  const reservedPaths = [
    "api",
    "login",
    "register",
    "onboarding",
    "_next",
    "static",
    "favicon.ico",
    "404"
  ];

  // 2. Obter sessão do Better Auth (Server-side)
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // --- TRAVA 1: REDIRECIONAR USUÁRIO JÁ LOGADO ---
  // Se o usuário já está logado e tenta acessar rotas de auth (global ou de igreja)
  const isAuthPage = pathname === "/login" ||
    pathname === "/register" ||
    pathname.endsWith("/login") ||
    pathname.endsWith("/register");

  if (session && (isAuthPage || pathname === "/")) {
    // Se ele já tem igreja vinculada, manda direto pro dashboard dela
    if (session.user.churchId) {
      const userChurch = await prisma.church.findUnique({
        where: { id: session.user.churchId },
        select: { label: true }
      });

      const churchLabel = userChurch?.label ?? undefined;

      if (churchLabel) {
        return NextResponse.redirect(new URL(`/${churchLabel}/dashboard`, request.url));
      }
    }

    // Se logado mas sem igreja (recém-registrado), força o onboarding
    if (pathname !== "/onboarding") {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }
  }

  // --- TRAVA 2: VALIDAÇÃO DE MULTI-TENANCY (LABELS) ---
  // Só entra aqui se NÃO for uma rota reservada (como /register)
  if (label && !reservedPaths.includes(label)) {
    // 2.1 Verifica se a igreja da URL existe no banco
    const church = await prisma.church.findUnique({
      where: { label: label },
      select: { id: true }
    });

    // Se a label na URL não existir no banco, manda pro 404
    if (!church) {
      return NextResponse.rewrite(new URL("/404", request.url));
    }

    // --- PROTEÇÃO DE DASHBOARD: ACESSO CRUZADO ---
    // Se tentar acessar /[qualquer-igreja]/dashboard
    if (pathname.includes("/dashboard")) {
      // Se não estiver logado, manda pro login daquela igreja
      if (!session) {
        return NextResponse.redirect(new URL(`/${label}/login`, request.url));
      }

      // Se logado, mas tentando acessar dashboard de OUTRA igreja
      if (session.user.churchId !== church.id) {
        if (session.user.churchId) {
          const myChurch = await prisma.church.findUnique({
            where: { id: session.user.churchId },
            select: { label: true }
          });

          const myLabel = myChurch?.label ?? undefined;

          return myLabel
            ? NextResponse.redirect(new URL(`/${myLabel}/dashboard`, request.url))
            : NextResponse.redirect(new URL("/onboarding", request.url));
        }

        // Se não tiver igreja, manda pro onboarding
        return NextResponse.redirect(new URL("/onboarding", request.url));
      }
    }
  }

  // Se for uma rota reservada (/register, /login) e sem sessão, deixa passar normalmente
  return NextResponse.next();
}

export const config = {
  // OBRIGATÓRIO: Node.js runtime para usar Prisma e Better Auth no Middleware
  runtime: "nodejs",
  matcher: [
    /*
     * Match all request paths exceto arquivos estáticos e rotas de API
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
