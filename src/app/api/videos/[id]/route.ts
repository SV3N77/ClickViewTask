import { Database } from "@/common/db/database";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await Database.videos();
    const video = data.find((video) => video.id === Number(params.id));

    return Response.json(video);
  } catch {
    return new Response(`File not found`, { status: 400 });
  }
}
