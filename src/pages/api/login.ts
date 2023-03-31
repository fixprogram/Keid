import { findUserByEmail } from "@/entities/user/models/findUserByEmail";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      res.status(405).send({ message: "Only POST requests allowed" });
      return;
    }
    const body = req.body;

    const { email } = body;

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(200).send({ type: "signup", email });
    }

    return res.status(200).send({ type: "signin", email });
  } catch (error) {
    res.status(405).send({ message: `${error.message}` });
    return;
  }
}
