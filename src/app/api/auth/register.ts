import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const body = await req.json();
  const { password } = body;
  const passwordHash = await bcrypt.hash(password, 10);

  const image = await fetch(
    `https://ui-avatars.com/api/?background=random&name=${
      body.email.split("@")[0].split(".")[0]
    }+${body.email.split("@")[0].split(".")[1]}&size=256&format=svg`
  ).then((res) => res.text());
  const result = await prisma.user.create({
    data: {
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
    },
  });
  // TODO: Send verification email

  if (!result) return Response.json({ message: "error", status: 500 });
  return Response.json({ message: "ok", status: 200, data: result });
}
