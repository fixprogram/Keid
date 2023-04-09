import { createUser } from "@/entities/user/models/createUser";
import { findUserByEmail } from "@/entities/user/models/findUserByEmail";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;

  if (!body.email || !body.password) {
    return res.status(400).json({ data: "First or last name not found" });
  }

  const { email, password, name } = body;

  const candidate = await findUserByEmail(email);

  if (candidate) {
    throw new Error(`User with email ${email} already exists`);
  }

  const user = await createUser({ email, name, password });

  res.status(200).json(user);
}
