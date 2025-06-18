import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/db/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";
import type { NextAuthOptions } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    password?: string | null;
    role?: string | null;
  }
}

export const authConfig = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        console.log("Credentials received:", credentials);

        if (!credentials?.email || !credentials?.password) {
          console.error("Missing email or password");
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          console.error("User not found for email:", credentials.email);
          return null;
        }

        if (!user.password) {
          console.error("User has no password set.");
          return null;
        }

        const isPasswordValid = compareSync(
          credentials.password,
          user.password,
        );

        if (!isPasswordValid) {
          console.error("Password does not match.");
          return null;
        }

        console.log("User authenticated successfully:", user.email);
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
} satisfies NextAuthOptions;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
