import { User } from "@/lib/mongoose";
import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest, params: { id: string }) {
  const token = req.cookies.token;
  if (!token) return Response.json({ message: "error", status: 401 });
  const { id } = params;
  const result = await User.findOne({
    _id: id,
  });
  if (!result) return Response.json({ message: "error", status: 500 });
  return Response.json({ message: "ok", status: 200, data: result });
}

export async function PUT(req: NextApiRequest, params: { id: string }) {
  const token = req.cookies.token;
  if (!token) return Response.json({ message: "error", status: 401 });
  const body = await req.body;
  const { id } = params;
  const result = await User.findOneAndUpdate(
    { _id: id },
    { ...body },
    { new: true }
  );
  if (!result) return Response.json({ message: "error", status: 500 });
  return Response.json({ message: "ok", status: 200, data: result });
}

export async function DELETE(req: NextApiRequest, params: { id: string }) {
  const token = req.cookies.token;
  if (!token) return Response.json({ message: "error", status: 401 });
  const { id } = params;
  const result = await User.findOneAndDelete({
    _id: id,
  });
  if (!result) return Response.json({ message: "error", status: 500 });
  return Response.json({ message: "ok", status: 200, data: result });
}
