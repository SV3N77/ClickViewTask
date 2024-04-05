import { Database } from "@/common/db/database";
import { revalidatePath } from "next/cache";

export async function removePlaylist(formData: FormData) {
  "use server";

  const playlistId = formData.get("playlistId") as string;

  const playlist = Database.removePlaylist(Number(playlistId));

  revalidatePath("/playlists");
}
