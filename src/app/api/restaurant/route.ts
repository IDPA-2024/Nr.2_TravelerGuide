import { Restaurant } from "@/lib/mongoose";
import { NextApiRequest } from "next";

export async function POST(req: Request) {
  const body = await req.json();
  const token = body.token;
  if (token === "" || token === undefined) {
    return Response.json({ message: "No Token", status: 401 });
  }
  const restaurant = body.restaurant;
  const result = await Restaurant.create(restaurant);

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
