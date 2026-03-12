import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/generated/prisma/client"; // ✅ Correto (ajuste o caminho conforme seu output)

import { PrismaPg } from "@prisma/adapter-pg";
import { nextCookies } from "better-auth/next-js";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });


export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true
  },
  user: {
    additionalFields: {
      churchId: {
        type: "string",
        required: false,
        // Importante: permite que o campo seja passado no input do signUp
        input: true,
      },
      status: {
        type: "string",
        default: "MEMBER",
        input: true, // Permite definir o status no registro (útil para o onboarding)
        required: false,
      },
      role: {
        type: "string",
        default: "USER",
        input: true, // Permite definir o role no registro (útil para o onboarding)
        required: false,
      }
    }
  },
  plugins: [nextCookies()]
});
