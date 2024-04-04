import { Playlist } from "@/interfaces/playlist";
import { Video } from "@/interfaces/video";
import { notFound } from "next/navigation";
import { addVideoToPlaylist } from "./addVideoToPlaylist";

import React from "react";

export default async function PlaylistsDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const video = await fetch(
    `http://localhost:3000/api/videos/${params.id}`
  ).then((response) => response.json() as Promise<Video | undefined>);
  if (!video) {
    return notFound();
  }
  const playlists = await fetch("http://localhost:3000/api/playlists").then(
    (response) => response.json() as Promise<Playlist[]>
  );

  return (
    <>
      <h1>{video.name}</h1>
      <div>{video.description}</div>
      <form action={addVideoToPlaylist}>
        <input type="hidden" name="videoId" value={video.id} />
        <select name="playlistId">
          {playlists.map((playlist) => (
            <option key={playlist.id} value={playlist.id}>
              {playlist.name}
            </option>
          ))}
        </select>
        <button>Add to playlist</button>
      </form>
    </>
  );
}
