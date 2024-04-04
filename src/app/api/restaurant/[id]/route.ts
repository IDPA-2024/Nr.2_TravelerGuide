import { Restaurant } from "@/lib/mongoose";
import { NextApiRequest } from "next";

export async function GET(req: Request, params: { id: string }) {
  const { id } = params;
  const result = await Restaurant.findOne({
    _id: id,
  });
  if (!result) return Response.json({ message: "error", status: 500 });
  return Response.json({ message: "ok", status: 200, data: result });
}

export async function PUT(req: NextApiRequest, params: { id: string }) {
  const token = req.cookies.token;
  if (!token) return Response.json({ message: "error", status: 401 });
  const { id } = params;
  const body = await req.body;
  const result = await Restaurant.findOneAndUpdate(
    { _id: id },
    { ...body },
    { new: true }
  );
  if (!result) return Response.json({ message: "error", status: 500 });
  return Response.json({ message: "ok", status: 200, data: result });
}