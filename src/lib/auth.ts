import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { genericOAuth, yandex } from "better-auth/plugins";
import prisma from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          const teacherPlatform = await prisma.platform.findUnique({
            where: { slug: "teacher" },
          });
          if (teacherPlatform) {
            await prisma.userPlatformAccess.create({
              data: {
                userId: user.id,
                platformId: teacherPlatform.id,
                role: "user",
              },
            });
          }
        },
      },
    },
  },
  plugins: [
    genericOAuth({
      config: [
        yandex({
          clientId: process.env.YANDEX_CLIENT_ID ?? "",
          clientSecret: process.env.YANDEX_CLIENT_SECRET ?? "",
        }),
      ],
    }),
  ],
});

export type Auth = typeof auth;
