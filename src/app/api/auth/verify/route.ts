import { User } from "@/lib/mongoose";

export async function POST(req: Request) {
  const { id } = await req.json();
  const result = await User.findOneAndUpdate(
    { _id: id },
    { verified: true },
    { new: true }
  );
  if (!result) return Response.json({ message: "error", status: 500 });
  return Response.json({ message: "ok", status: 200, data: result });
}
