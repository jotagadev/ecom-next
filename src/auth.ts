import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db";


export const authconfig ={
    adapter: PrismaAdapter(db),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
    ],
  };

  export const { auth, handlers, signIn, signOut } =  NextAuth(authconfig);