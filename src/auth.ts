import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db";
import { compare } from "bcrypt";


export const authconfig = {
  adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      credentials: {
        email: { label: "E-mail", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const userByEmail = await db.user.findUnique({
            where: {
              email: credentials.email as string,
            },
          });
          if (!userByEmail || !userByEmail.password) {
            return null;
          }

          const passwordCheck = await compare(
            credentials.password as string,
            userByEmail.password
          );

          if (!passwordCheck) {
            return null;
          }

          const { password: _, ...user } = userByEmail;

          return user;
        } catch (error) {
          console.error("Authentication error:", error);
          throw new Error("Authentication failed. Please try again later.");
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt" as "jwt",
  },
};

  export const { auth, handlers, signIn, signOut } =  NextAuth(authconfig);