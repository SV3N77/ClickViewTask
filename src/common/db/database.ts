import { Playlist } from "@/interfaces/playlist";
import { Video } from "@/interfaces/video";
import fs from "node:fs";

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
  addNewPlaylist: (
    playlistName: string,
    playlistDescription: string
  ): Playlist => {
    const playlists = Database.playlists();
    function randomNumber() {
      return Math.floor(Math.random() * 9000000) + 1000000;
    } // Generates a random number between 1000000 and 9999999
    let playlistId = randomNumber();
    while (playlists.some((playlist) => playlist.id === playlistId)) {
      playlistId = randomNumber();
    }

    const playlist: Playlist = {
      id: playlistId,
      name: playlistName,
      description: playlistDescription,
      videoIds: [],
    };

    playlists.push(playlist);

    fs.writeFileSync(
      "./src/common/db/playlists.json",
      JSON.stringify(playlists)
    );

    return playlist;
  },
  removePlaylist: (playlistId: number): Playlist[] => {
    const playlists = Database.playlists();
    const playlist = playlists.find(
      (playlist) => playlist.id === Number(playlistId)
    );
    if (!playlist) {
      throw new Error("playlist not found");
    }
    const newPlaylists = playlists.filter(
      (playlist) => playlist.id !== playlistId
    );

    fs.writeFileSync(
      "./src/common/db/playlists.json",
      JSON.stringify(newPlaylists)
    );

    return newPlaylists;
  },
};
