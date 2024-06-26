import { Playlist } from "@/interfaces/playlist";
import { Video } from "@/interfaces/video";
import { notFound } from "next/navigation";
import { addVideoToPlaylist } from "./addVideoToPlaylist";
import { Button, Image } from "react-bootstrap";
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
  const videoDuration = Math.round(video.duration / 60000);

  return (
    <>
      <div className="d-flex flex-column rounded border p-4 bg-card">
        <h1>{video.name}</h1>
        <div className="d-flex mb-5">
          <Image
            fluid
            rounded
            src={`${video.thumbnail}?size=small`}
            alt={video.name}
            className="w-100"
          />
          <div className="d-flex flex-column mb-3 mx-3">
            <div className="text-s">Duration: {videoDuration} minutes</div>
            <div className="mt-2">
              <div className="fs-4 font-bold">Description</div>
              <div className="fs-6">{video.description}</div>
            </div>
          </div>
        </div>
        <form
          action={addVideoToPlaylist}
          className="d-flex justify-content-end"
        >
          <input type="hidden" name="videoId" value={video.id} />
          <select name="playlistId" className="mx-3 outline-none rounded px-3">
            {playlists.map((playlist) => (
              <option key={playlist.id} value={playlist.id}>
                {playlist.name}
              </option>
            ))}
          </select>
          <Button variant="primary" size="sm" type="submit">
            Add to playlist
          </Button>
        </form>
      </div>
    </>
  );
}
