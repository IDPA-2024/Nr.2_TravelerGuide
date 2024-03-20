import { EmailTemplate } from "@/email/VerifyEmail";
import { User } from "@/lib/mongoose";
import bcrypt from "bcrypt";
import { Resend } from "resend";

export async function POST(req: Request) {
  const body = await req.json();
  const { password, email } = body;
  const passwordHash = await bcrypt.hash(password, 10);
  let emailPattern: RegExp = /[a-zA-Z0-9._%+-]+@(stud.kbw|stud.krw|edu.zh).ch/g;
  if (emailPattern.test(email) === false) {
    return Response.json({ message: "error", status: 400 });
  }
  const user = await User.findOne({
    email: email,
  });
  if (user) return Response.json({ message: "error", status: 401 });

  const image = await fetch(
    `https://ui-avatars.com/api/?background=random&name=${
      body.email.split("@")[0].split(".")[0]
    }+${body.email.split("@")[0].split(".")[1]}&size=256&format=svg`
  ).then((res) => res.text());
  const result = await User.create({
    name:
      body.email
        .split("@")[0]
        .split(".")[0]
        .replace(/[^a-zA-Z0-9]/g, "") +
      " " +
      body.email
        .split("@")[0]
        .split(".")[1]
        .replace(/[^a-zA-Z0-9]/g, ""),
    image: image,
    email: body.email,
    passwordHash: passwordHash,
    verified: false,
  });
  if (!result) return Response.json({ message: "error", status: 500 });
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send({
    from: "noreply@banyard.tech",
    to: [body.email],
    subject: "Verifiziere deine E-Mail-Adresse",
    react: EmailTemplate({
      name: result.name,
      link: `${process.env.NEXT_PUBLIC_URL}/verify?id=${result._id}`,
    }),
  });
  if (error) {
    return Response.json({ message: error, status: 500 });
  }
  return Response.json({ message: "ok", status: 200 });
}
