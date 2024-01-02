import { getUser } from "@/app/lib/session";
import { prisma } from "@/db.server";
import getUserProjectNames from "@/entities/user/models/getUserProjectNames";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const user = await getUser();

  const userId = user.id;
  const userProjectNames = await getUserProjectNames(userId);

  const challenge = await prisma.challenge.findUnique({ where: { id } });

  if (!challenge) {
    throw new Error(`challenge with id: ${id} wasn't found`);
  }

  const data = {
    ...challenge,
    userProjectNames,
  };

  return NextResponse.json(data);
}
