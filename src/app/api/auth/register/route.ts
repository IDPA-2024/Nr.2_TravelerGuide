import { User } from "@/lib/mongoose";
import bcrypt from "bcrypt";

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
  // TODO: Send verification email

  if (!result) return Response.json({ message: "error", status: 500 });
  return Response.json({ message: "ok", status: 200 });
}