import { Database } from "@/common/db/database";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addVideoToPlaylist(formData: FormData) {
  "use server";

  const videoId = formData.get("videoId") as string;
  const playlistId = formData.get("playlistId") as string;

  const playlist = Database.addVideoToPlaylist(
    Number(videoId),
    Number(playlistId)
  );
  revalidatePath("/playlists");
  revalidatePath(`/playlists/${playlistId}`);
  redirect("/playlists");
}
