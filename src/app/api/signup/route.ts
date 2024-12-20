import { createUser } from "@/app/lib/data/user/createUser";
import { findUserByEmail } from "@/app/lib/data/user/findUserByEmail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password, name } = await request.json();

  if (!email) {
    return NextResponse.json(
      { errors: { email: "Email is invalid", password: null } },
      { status: 400 }
    );
  }

  if (!password) {
    return NextResponse.json(
      { errors: { email: null, password: "Password is invalid" } },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password is shorter than 8 symbols" },
      { status: 400 }
    );
  }

  const existedUser = await findUserByEmail(email);

  if (existedUser) {
    return NextResponse.json(
      {
        errors: {
          email: `User with email ${email} already exists`,
          password: null,
        },
      },
      { status: 400 }
    );
  }

  const user = await createUser({ email, name, password });

  return NextResponse.json({ user }, { status: 200 });
}
