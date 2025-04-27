"use client"

import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { githubLogin, googleLogin } from "@/lib/actions/auth";

type AuthCardProps = {
    status: boolean;
}

export default function AuthCard({ status } : AuthCardProps){
    const [haveAccount, setHaveAccount] = useState(status);


return (
    <div>
        {haveAccount ? 
            <LoginForm /> :
             <RegisterForm /> }
             <div>
                <p className="text-center mt-4 text-sm text-gray-600">
                    {haveAccount ? "Não tem uma conta?" : "Já tem uma conta?"}
                    <Button variant="link" className="ml-1 cursor-pointer" onClick={() => setHaveAccount(!haveAccount)}>
                        {haveAccount ? "Crie uma" : "Faça login"}
                    </Button>
                </p>
             <div className="flex flex-row gap-2 mt-5">
                  <Button variant="default" className="mt-2 bg-red-800 cursor-pointer hover:bg-red-700" onClick={() => googleLogin()}>
                    Entre com o Google <FaGoogle className="inline ml-2" />
                  </Button>

                  <Button variant="default" className="mt-2 cursor-pointer" onClick={() => githubLogin()}>
                  Entre com o Github <FaGithub className="inline ml-2" />
                  </Button>
              </div>
             </div>
    </div>

)
}
