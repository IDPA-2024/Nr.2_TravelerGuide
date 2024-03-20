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

export async function GET(
  req: Request,
  params: { filter: Array<string>; search: string }
) {
  const { filter, search } = params;
  if (filter.length > 0 || search.length > 0) {
    if (filter.length > 0 && search.length > 0) {
      const result = await Restaurant.find({
        category: { $in: filter },
        name: { $regex: search, $options: "i" },
      });
      if (!result) return Response.json({ message: "error", status: 500 });
      return Response.json({ message: "ok", status: 200, data: result });
    }
    if (search.length > 0) {
      const result = await Restaurant.find({
        name: { $regex: search, $options: "i" },
      });
      if (!result) return Response.json({ message: "error", status: 500 });
      return Response.json({ message: "ok", status: 200, data: result });
    }
    if (filter.length > 0) {
      const result = await Restaurant.find({ category: { $in: filter } });
      if (!result) return Response.json({ message: "error", status: 500 });
      return Response.json({ message: "ok", status: 200, data: result });
    }
  }
  const result = await Restaurant.find();
  if (!result) return Response.json({ message: "error", status: 500 });
  return Response.json({ message: "ok", status: 200, data: result });
}
