import { Restaurant } from "@/lib/mongoose";
import { NextApiRequest } from "next";

export async function POST(req: NextApiRequest) {
  const token = req.cookies.token;
  if (!token) return Response.json({ message: "error", status: 401 });

  const body = await req.body;
  const result = await Restaurant.create(body);

  if (!result) return Response.json({ message: "error", status: 500 });
  return Response.json({ message: "ok", status: 200, data: result });
}

export async function GET(req: Request, params: { filter: string }) {
  const { filter } = params;
  if (filter.length > 0) {
    const filters = filter.split(",");
    const result = await Restaurant.find({ category: { $in: filters } });
    if (!result) return Response.json({ message: "error", status: 500 });
    return Response.json({ message: "ok", status: 200, data: result });
  }
  const result = await Restaurant.find();
  if (!result) return Response.json({ message: "error", status: 500 });
  return Response.json({ message: "ok", status: 200, data: result });
}
