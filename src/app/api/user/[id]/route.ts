import { User } from "@/lib/mongoose";
export async function generateStaticParams() {
  const users = await User.find();
  return users.map((user: UserType) => ({
    id: user._id.toString(),
  }));
}

export async function GET(req: Request, params: { id: string }) {
  const body = await req.json();
  const token = body.token;
  if (!token) return Response.json({ message: "error", status: 401 });
  const { id } = params;
  const result = await User.findOne({
    _id: id,
  });
  if (!result) return Response.json({ message: "error", status: 500 });
  return Response.json({ message: "ok", status: 200, data: result });
}

export async function PUT(req: Request, params: { id: string }) {
  const body = await req.json();
  const token = body.token;
  if (!token) return Response.json({ message: "error", status: 401 });
  const { id } = params;
  const result = await User.findOneAndUpdate(
    { _id: id },
    { ...body },
    { new: true }
  );
  if (!result) return Response.json({ message: "error", status: 500 });
  return Response.json({ message: "ok", status: 200, data: result });
}

export async function DELETE(req: Request, params: { id: string }) {
  const body = await req.json();
  const token = body.token;
  if (!token) return Response.json({ message: "error", status: 401 });
  const { id } = params;
  const result = await User.findOneAndDelete({
    _id: id,
  });
  if (!result) return Response.json({ message: "error", status: 500 });
  return Response.json({ message: "ok", status: 200, data: result });
}
