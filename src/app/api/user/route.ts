import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { registerUserSchema } from "@/lib/zod";


// Rota POST para cadastro de usuário

export async function POST(req: Request) {

    // Processamento do corpo da requisição e verificação de e-mail já cadastrado

  try {
    const body = await req.json();
    const { name, email, password } = registerUserSchema.parse(body);

    const emailExists = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (emailExists) {
      return NextResponse.json(
        { error: "O e-mail inserido já está cadastrado." },
        { status: 400 }
      );
    }

    // Criptografia da senha e armazenamento no banco de dados

    const hashPassword = await hash(password, 10);

    const user = await db.user.create({
      data: {
        name: name,
        email: email,
        password: hashPassword,
      },
    });

    // Removendo a senha da resposta para não expor informações sensíveis

    const { password: _, ...rest } = user;

    return NextResponse.json({ rest }, { status: 201 });

  } catch (error) {
    console.error("Erro ao criar usuário:", error);

    return NextResponse.json(
      { error: "Erro ao criar usuário." },
      { status: 500 }
    );

  }
}
