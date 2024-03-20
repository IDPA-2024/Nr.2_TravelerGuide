import { User } from "@/lib/mongoose";
import { NextApiRequest } from "next";
import bcrypt from "bcrypt";
import { Resend } from "resend";
import { EmailTemplate } from "@/email/PasswordEmail";

export async function GET(req: Request, params: { email: string }) {
  const { email } = params;
  const user = await User.findOne({ email });
  if (!user) return Response.json({ message: "error", status: 404 });

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send({
    from: "noreply@banyard.tech",
    to: [user.email],
    subject: "Passwort zurücksetzen - Lunch Guide",
    react: EmailTemplate({
      name: user.name,
      link: `${process.env.NEXT_PUBLIC_URL}/resetPassword?id=${user._id}`,
    }),
  });
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
