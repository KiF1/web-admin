import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  const body = await request.json();
  const { email, password } = await authenticateBodySchema.parse(body);
  const prisma = new PrismaClient();

  const user = await prisma.user.findFirst({ where: { email, password } });
  if(!user){
    return NextResponse.json({ error: 'User not exists' }, { status: 401 })
  }
 
  return NextResponse.json({ message: 'User Autheticated' }, { status: 200 })
}