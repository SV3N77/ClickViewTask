import { Database } from "@/common/db/database";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addNewPlaylist(formData: FormData) {
  "use server";

  const playlistName = formData.get("playlistName") as string;
  const playlistDescription = formData.get("playlistDescription") as string;
  const playlist = Database.addNewPlaylist(playlistName, playlistDescription);

  revalidatePath("/playlists");
  revalidatePath(`/playlists/${playlist.id}`);
  redirect("/playlists");
}
