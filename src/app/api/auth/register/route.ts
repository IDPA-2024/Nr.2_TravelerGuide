import { EmailTemplate } from "@/email/VerifyEmail";
import { User } from "@/lib/mongoose";
import bcrypt from "bcrypt";
import { Resend } from "resend";

export async function POST(req: Request) {
  const body = await req.json();
  const { password, email } = body;
  const passwordHash = await bcrypt.hash(password, 10);
  let lowerEmail = email.toLowerCase();
  let emailPattern: RegExp = /[a-zA-Z0-9._%+-]+@(stud.kbw|stud.krw|edu.zh).ch/g;
  if (emailPattern.test(lowerEmail) === false) {
    return Response.json({ message: "error", status: 400 });
  }
  const user = await User.findOne({
    email: lowerEmail,
  });
  if (user) return Response.json({ message: "error", status: 401 });

  const image = await fetch(
    `https://ui-avatars.com/api/?background=random&name=${
      lowerEmail.split("@")[0].split(".")[0]
    }+${lowerEmail.split("@")[0].split(".")[1]}&size=256&format=svg`
  ).then((res) => res.text());
  const formatedImage = image.replace('width="256px" height="256px"', "");
  const result = await User.create({
    name:
    lowerEmail.split("@")[0].split(".")[0].charAt(0).toUpperCase() +
    lowerEmail
        .split("@")[0]
        .split(".")[0]
        .slice(1)
        .replace(/[^a-zA-Z0-9]/g, "") +
      " " +
      lowerEmail.split("@")[0].split(".")[1].charAt(0).toUpperCase() +
      lowerEmail
        .split("@")[0]
        .split(".")[1]
        .slice(1)
        .replace(/[^a-zA-Z0-9]/g, ""),
    image: formatedImage,
    email: lowerEmail,
    passwordHash: passwordHash,
    verified: false,
  });
  if (!result) return Response.json({ message: "error", status: 500 });
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: "Lunch-Guide <noreply@lunch-guide.ch>",
    to: [lowerEmail],
    subject: "Verifiziere deine E-Mail-Adresse",
    react: EmailTemplate({
      name: result.name,
      link: `http://lunch-guide.ch/verified?id=${result._id}`,
    }),
  });
  if (error) {
    return Response.json({ message: error, status: 500 });
  }
  return Response.json({ message: "ok", status: 200 });
}
