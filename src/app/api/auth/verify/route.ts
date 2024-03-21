import { User } from "@/lib/mongoose";

export async function GET(req: Request) {
  const id = await req.url.split("=")[1];
  const result = await User.findOneAndUpdate(
    { _id: id },
    { verified: true },
    { new: true }
  );
  if (!result) return Response.json({ message: "error", status: 500 });
  return Response.json({ message: "ok", status: 200, data: result });
}
