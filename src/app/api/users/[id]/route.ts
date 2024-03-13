import prisma from "@/lib/prisma";
import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest, params: { id: string }) {
  const token = req.cookies.token;
  if (!token) return Response.json({ message: "error", status: 401 });
  const { id } = params;
  const result = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  if (!result) return Response.json({ message: "error", status: 500 });
  return Response.json({ message: "ok", status: 200, data: result });
}

export async function PUT(req: NextApiRequest, params: { id: string }) {
  const token = req.cookies.token;
  if (!token) return Response.json({ message: "error", status: 401 });
  const body = await req.body;
  const { id } = params;
  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      ...body,
    },
  });
  if (!result) return Response.json({ message: "error", status: 500 });
  return Response.json({ message: "ok", status: 200, data: result });
}

export async function DELETE(req: NextApiRequest, params: { id: string }) {
  const token = req.cookies.token;
  if (!token) return Response.json({ message: "error", status: 401 });
  const { id } = params;
  const result = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  if (!result) return Response.json({ message: "error", status: 500 });
  return Response.json({ message: "ok", status: 200, data: result });
}
