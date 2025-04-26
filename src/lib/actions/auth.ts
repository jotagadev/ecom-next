"use server"

import { signIn, signOut } from "@/auth"

export const githubLogin = async () => {
    await signIn("github", { redirectTo: "/" })

}

export const googleLogin = async () => {
    await signIn("google", { redirectTo: "/" })
}

export const logout = async () => {
    await signOut({ redirectTo: "/" })
}

