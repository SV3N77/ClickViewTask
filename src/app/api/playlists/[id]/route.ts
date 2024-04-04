import { Database } from "@/common/db/database";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await Database.playlists();
    const playlist = data.find((playlist) => playlist.id === Number(params.id));

    return Response.json(playlist);
  } catch {
    return new Response(`File not found`, { status: 400 });
  }
}
