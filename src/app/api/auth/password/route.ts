import { User } from "@/lib/mongoose";
import { NextApiRequest } from "next";
import bcrypt from "bcrypt";

export async function GET(req: Request, params: { email: string }) {
  const { email } = params;
  const user = await User.findOne({ email });
  if (!user) return Response.json({ message: "error", status: 404 });

  // TODO: Send reset email
}

export async function POST(req: NextApiRequest) {
  const body = await req.body;
  if (body.newPassword && body.id) {
    const passwordHash = await bcrypt.hash(body.newPassword, 10);
    const result = await User.findOneAndUpdate(
      { _id: body.id },
      { password: passwordHash },
      { new: true }
    );
    if (!result) return Response.json({ message: "error", status: 500 });
    return Response.json({ message: "ok", status: 200, data: result });
  }
  return Response.json({ message: "error", status: 400 });
}

export async function PUT(req: NextApiRequest) {
  const token = req.cookies.token;
  if (!token) return Response.json({ message: "error", status: 401 });

  const body = await req.body;
  if (body.newPassword && body.id) {
    const passwordHash = await bcrypt.hash(body.newPassword, 10);
    const result = await User.findOneAndUpdate(
      { _id: body.id },
      { password: passwordHash },
      { new: true }
    );
    if (!result) return Response.json({ message: "error", status: 500 });
    return Response.json({ message: "ok", status: 200, data: result });
  }
  return Response.json({ message: "error", status: 400 });
}
