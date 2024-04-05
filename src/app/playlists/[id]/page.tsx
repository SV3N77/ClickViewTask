import VideoItem from "@/components/video-item";
import { Playlist } from "@/interfaces/playlist";
import { Video } from "@/interfaces/video";
import { notFound } from "next/navigation";
import { removeVideoFromPlaylist } from "./removeVideoFromPlaylist";
import React from "react";
import { Button } from "react-bootstrap";

export default async function PlaylistsDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const playlist = await fetch(
    `http://localhost:3000/api/playlists/${params.id}`
  ).then((response) => response.json() as Promise<Playlist | undefined>);
  if (!playlist) {
    return notFound();
  }
  const videos = await Promise.all(
    playlist.videoIds.map((videoId) =>
      fetch(`http://localhost:3000/api/videos/${videoId}`).then(
        (response) => response.json() as Promise<Video | undefined>
      )
    )
  );

  return (
    <>
      <h1>{playlist.name}</h1>

      {videos
        .filter((video) => !!video)
        .map((video) => (
          <div
            key={video.id}
            className="d-flex justify-content-between mb-3 align-center bg-card border rounded"
          >
            <VideoItem video={video} />
            <form action={removeVideoFromPlaylist}>
              <input type="hidden" name="videoId" value={video.id} />
              <input type="hidden" name="playlistId" value={playlist.id} />
              <Button
                variant="primary"
                size="sm"
                className="mx-4"
                type="submit"
              >
                Delete from playlist
              </Button>
            </form>
          </div>
        ))}
    </>
  );
}
