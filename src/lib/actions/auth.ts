"use server"

import {signIn, signOut} from "@/auth";

export const googleLogin = async () => {
    await signIn("google", {
        redirectTo: "/checkout"
    });
}

export const githubLogin = async () => {
    await signIn("github", {
        redirectTo: "/checkout"
    });
}

export const logout = async () => {
    await signOut()
}