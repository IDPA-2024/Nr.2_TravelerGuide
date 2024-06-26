import { Comment, Restaurant, User } from "@/lib/mongoose";
import { NextRequest } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const token = body.token;
  if (token === "" || token === undefined) {
    return Response.json({ message: "No Token", status: 401 });
  }
  if (!body.user_id || !body.restaurant_id || !body.content)
    return Response.json({ message: "error", status: 400 });
  const result = await Comment.create({
    user_id: body.user_id,
    restaurantId: body.restaurant_id,
    text: body.content,
    stars: 0,
    created_at: new Date(),
  });
  if (!result) return Response.json({ message: "error", status: 500 });
  const user = await User.findByIdAndUpdate(body.user_id, {
    $push: { comments: result._id },
  });
  if (!user) return Response.json({ message: "error", status: 500 });
  const restaurant = await Restaurant.findByIdAndUpdate(body.restaurant_id, {
    $push: { comments: result._id },
  });
  if (!restaurant) return Response.json({ message: "error", status: 500 });
  return Response.json({ message: "ok", status: 200, data: result });
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  if (!id) return Response.json({ message: "error", status: 400 });
  const comments = await Comment.find({ restaurantId: { $eq: id } });
  if (!comments) return Response.json({ message: "error", status: 404 });
  let formattedComments = [];
  for (let i = 0; i < comments.length; i++) {
    const user = await User.findById(comments[i].user_id);
    if (!user) return Response.json({ message: "error", status: 404 });
    formattedComments.push({
      user_name: user.name,
      user_image: user.image,
      text: comments[i].text,
      created_at: comments[i].created_at,
    });
  }
  return Response.json({ message: "ok", status: 200, data: formattedComments });
}
