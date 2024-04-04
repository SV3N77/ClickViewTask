import { Playlist } from "@/interfaces/playlist";
import { Video } from "@/interfaces/video";
import fs from "node:fs";
import path from "node:path";

export const Database = {
  playlists: (): Playlist[] => {
    return require("./playlists.json");
  },
  videos: (): Video[] => {
    return require("./videos.json");
  },
  addVideoToPlaylist: (videoId: number, playlistId: number): Playlist => {
    const playlists = Database.playlists();
    const playlist = playlists.find(
      (playlist) => playlist.id === Number(playlistId)
    );
    if (!playlist) {
      throw new Error("playlist not found");
    }
    playlist.videoIds.push(Number(videoId));
    console.log(__dirname);
    fs.writeFileSync(
      "./src/common/db/playlists.json",
      JSON.stringify(playlists)
    );
    console.log(playlists);
    return playlist;
  },
};
