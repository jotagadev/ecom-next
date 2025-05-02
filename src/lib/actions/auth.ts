"use server"

import {signIn, signOut} from "@/auth";


// Funções para autenticação dos usuários com NextAuth.js

export const credentialsLogin = async (email: string, password: string) => {
    const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
    });

    return result;
};

export const googleLogin = async () => {
    await signIn("google", {
        
    });
}

export const githubLogin = async () => {
    await signIn("github", {
    });
}

export const logout = async () => {
    await signOut()
}

