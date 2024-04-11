import { Restaurant } from "@/lib/mongoose";
import { NextApiRequest } from "next";

export async function POST(req: Request) {
  const body = await req.json();
  const token = body.token;
  if (token === "" || token === undefined) {
    return Response.json({ message: "No Token", status: 401 });
  }
  const restaurant = body.restaurant;
  const check = await Restaurant.findOne({ name: restaurant.name });
  if (check) {
    return Response.json({ message: "Restaurant already exists", status: 409 });
  }
  const result = await Restaurant.create(restaurant);

  if (!result) return Response.json({ message: "error", status: 500 });
  return Response.json({ message: "ok", status: 200, data: result });
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { filter, search } = body;
  if (filter === undefined || search === undefined) {
    const result = await Restaurant.find();
    if (!result) return Response.json({ message: "error", status: 500 });
    return Response.json({ message: "ok", status: 200, data: result });
  } else {
    if (filter.length > 0 || search.length > 0) {
      console.log(filter);
      if (filter.length > 0 && search.length > 0) {
        const result = await Restaurant.find({
          category: { $in: filter },
          name: { $regex: search, $options: "i" },
        });
        if (!result) return Response.json({ message: "error", status: 500 });
        return Response.json({ message: "ok", status: 200, data: result });
      }
      if (search.length > 0 && filter.length === 0) {
        const result = await Restaurant.find({
          name: { $regex: search, $options: "i" },
        });
        if (!result) return Response.json({ message: "error", status: 500 });
        return Response.json({ message: "ok", status: 200, data: result });
      }
      if (filter.length > 0 && search.length === 0) {
        const result = await Restaurant.find({ category: { $in: filter } });
        if (!result) return Response.json({ message: "error", status: 500 });
        return Response.json({ message: "ok", status: 200, data: result });
      }
    } else {
      const result = await Restaurant.find();
      if (!result) return Response.json({ message: "error", status: 500 });
      return Response.json({ message: "ok", status: 200, data: result });
    }
  }
}
