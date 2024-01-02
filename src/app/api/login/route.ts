import { findUserByEmail } from "@/backend/service/user/findUserByEmail";
import { NextApiRequest, NextApiResponse } from "next/types";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   // try {
//   if (req.method !== "POST") {
//     res.status(405).send({ message: "Only POST requests allowed" });
//     return;
//   }
//   const body = req.body;

//   const { email } = body;

//   const user = await findUserByEmail(email);

//   if (!user) {
//     return res.status(200).send({ type: "signup", email });
//   }

//   return res.status(200).send({ type: "signin", email });
//   // } catch (error) {
//   //   res.status(405).send({ message: `${error.message}` });
//   //   return;
//   // }
// }

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: any) {
  if (request.method !== "POST") {
    return NextResponse.json(
      { message: "Only POST requests allowed" },
      { status: 405 }
    );
  }
  //   const res = await request.json()

  const body = request.body;

  const { email } = body;

  const user = await findUserByEmail(email);

  if (!user) {
    return NextResponse.json({ type: "signup", email }, { status: 200 });
  }

  return NextResponse.json({ type: "signin", email }, { status: 200 });
}
