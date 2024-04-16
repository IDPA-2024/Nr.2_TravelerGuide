import { User } from "@/lib/mongoose";
import { NextApiRequest } from "next";
import bcrypt from "bcrypt";
import { Resend } from "resend";
import { EmailTemplate } from "@/email/PasswordEmail";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const email = searchParams.get("email");
  const user = await User.findOne({ email: email as string });
  if (!user) return Response.json({ message: "error", status: 404 });

  const resend = new Resend(process.env.RESEND_API_KEY);
  const send = await resend.emails.send({
    from: "Lunch-Guide <noreply@lunch-guide.ch>",
    to: [user.email],
    subject: "Passwort zurücksetzen - Lunch Guide",
    react: EmailTemplate({
      name: user.name,
      link: `${process.env.NEXT_PUBLIC_URL}/setNewPassword?id=${user._id}`,
    }),
  });
  if (send.error) return Response.json({ message: "error", status: 500 });
  return Response.json({ message: "ok", status: 200 });
}

export async function POST(req: Request) {
  const body = await req.json();
  if (body.newPassword && body.id) {
    const passwordHash = await bcrypt.hash(body.newPassword, 10);
    const result = await User.findOneAndUpdate(
      { _id: body.id },
      { passwordHash: passwordHash },
      { new: true }
    );
    if (!result) return Response.json({ message: "error", status: 500 });
    return Response.json({ message: "ok", status: 200, data: result });
  }
  return Response.json({ message: "error", status: 400 });
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { token } = body;
  if (!token) return Response.json({ message: "error", status: 401 });
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
