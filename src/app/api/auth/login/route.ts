import { User } from "@/lib/mongoose";
import { generateToken } from "@/utils/jwt";
import bcrypt from "bcrypt";
import { NextApiResponse } from "next";

export async function POST(req: Request, res: NextApiResponse) {
  const body = await req.json();
  const { email, password } = body;
  const user = await User.findOne({
    email: email,
  });

  if (user) {
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (passwordMatch) {
      if (!user.verified) {
        return Response.json({
          message: "Nutzer nicht verifiziert",
          status: 401,
        });
      }
      const token = generateToken({ email: user.email });
      return Response.json({ token: token, status: 200, user: user});
    } else {
      return Response.json({ message: "Passwort falsch", status: 402 });
    }
  } else {
    return Response.json({ message: "Nutzer nicht gefunden", status: 403 });
  }
}
