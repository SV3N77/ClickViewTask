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
    if (playlist.videoIds.includes(videoId)) {
      console.log("already there");
    } else playlist.videoIds.push(Number(videoId));

    fs.writeFileSync(
      "./src/common/db/playlists.json",
      JSON.stringify(playlists)
    );

    return playlist;
  },
  removeVideoFromPlaylist: (videoId: number, playlistId: number): Playlist => {
    const playlists = Database.playlists();
    const playlist = playlists.find(
      (playlist) => playlist.id === Number(playlistId)
    );
    if (!playlist) {
      throw new Error("playlist not found");
    }
    if (playlist.videoIds.includes(videoId)) {
      playlist.videoIds = playlist.videoIds.filter(
        (video) => video !== videoId
      );

      fs.writeFileSync(
        "./src/common/db/playlists.json",
        JSON.stringify(playlists)
      );
      return playlist;
    }

    return playlist;
  },
};
