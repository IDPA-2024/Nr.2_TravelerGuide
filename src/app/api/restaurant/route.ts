import prisma from "@/lib/prisma";
import { NextApiRequest } from "next";

export async function POST(req: NextApiRequest) {
  const token = req.cookies.token;
  if (!token) return Response.json({ message: "error", status: 401 });

  const body = await req.body;
  const result = await prisma.restaurant.create({
    data: {
      ...body,
    },
  });

  if (!result) return Response.json({ message: "error", status: 500 });
  return Response.json({ message: "ok", status: 200, data: result });
}

export async function GET(req: Request) {
  const result = await prisma.restaurant.findMany();
  if (!result) return Response.json({ message: "error", status: 500 });
  return Response.json({ message: "ok", status: 200, data: result });
}

