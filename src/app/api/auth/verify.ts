import prisma from "@/lib/prisma";

export async function GET(req: Request, params: { id: string }) {
  const { id } = params;
  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      verified: true,
    },
  });
  if (!result) return Response.json({ message: "error", status: 500 });
  return Response.json({ message: "ok", status: 200, data: result });
}
