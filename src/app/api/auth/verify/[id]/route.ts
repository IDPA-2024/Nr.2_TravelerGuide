import { User } from "@/lib/mongoose";
import { NextRequest } from "next/server";
export async function generateStaticParams() {
  const users = await User.find();
  return users.map((user: UserType) => ({
    id: user._id.toString(),
  }));
}

export async function GET(req: Request, params: { id: string }) {
  const { id } = params;
  const result = await User.findOneAndUpdate(
    { _id: id },
    { verified: true },
    { new: true }
  );
  if (!result) return Response.json({ message: "error", status: 500 });
  return Response.json({ message: "ok", status: 200, data: result });
}
