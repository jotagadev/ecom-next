"use server"

import {signIn, signOut} from "@/auth";


// Funções para autenticação de usuários com NextAuth.js

export const credentialsLogin = async (email: string, password: string) => {
    const result = await signIn("credentials", {
        email,
        password,
    });

    return result;
};

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

