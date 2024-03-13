import prisma from "@/lib/prisma";
import { generateToken } from "@/utils/jwt";
import bcrypt from "bcrypt";
import { NextApiResponse } from "next";

export async function POST(req: Request, res: NextApiResponse) {
  const body = await req.json();
  const { username, password } = body;
  const user = await prisma.user.findUnique({
    where: {
      email: username,
    },
  });

  if (user) {
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (passwordMatch) {
      if (!user.verified) {
        return res.status(401).json({ message: "Nutzer nicht verifiziert" });
      }
      const token = generateToken({ email: user.email });
      res.setHeader(
        "Set-Cookie",
        `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600`
      );
      res.status(200).json({ message: "ok" });
    } else {
      res.status(401).json({ message: "Passwort falsch" });
    }
  } else {
    res.status(401).json({ message: "Nutzer nicht gefunden" });
  }
}
