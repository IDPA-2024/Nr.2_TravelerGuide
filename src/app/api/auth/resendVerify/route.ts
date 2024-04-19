import { User } from "@/lib/mongoose";
import { Resend } from "resend";
import { EmailTemplate } from "@/email/VerifyEmail";

export async function POST(req: Request) {
  const body = await req.json();
  const { email } = body;
  let lowerEmail = email.toLowerCase();
  let emailPattern: RegExp = /[a-zA-Z0-9._%+-]+@(stud.kbw|stud.krw|edu.zh).ch/g;
  if (emailPattern.test(lowerEmail) === false) {
    return Response.json({ message: "error", status: 400 });
  }
  const user = await User.findOne({
    email: lowerEmail,
  });
  if (!user) return Response.json({ message: "error", status: 401 });
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: "Lunch-Guide <noreply@lunch-guide.ch>",
    to: [user.email],
    subject: "Verifiziere deine E-Mail-Adresse",
    react: EmailTemplate({
      name: user.name,
      link: `http://lunch-guide.ch/verified?id=${user._id}`,
    }),
  });
  if (error) {
    return Response.json({ message: error, status: 500 });
  }
  return Response.json({ message: "ok", status: 200 });
}
