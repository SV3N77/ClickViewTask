import { Playlist } from "@/interfaces/playlist";
import { PlaylistItem } from "@/components/playlist-item";
import React from "react";
import Link from "next/link";

export default async function PlaylistsPage() {
  const playlists = await fetch("http://localhost:3000/api/playlists").then(
    (response) => response.json() as Promise<Playlist[]>
  );
  return (
    <>
      <h1>Playlists</h1>
      <form action="">
        <button>Add new playlist</button>
      </form>
      {playlists.map((playlist) => (
        <Link key={playlist.id} href={`/playlists/${playlist.id}`}>
          <PlaylistItem playlist={playlist} />
          <form action="">
            <button>Remove playlist</button>
          </form>
        </Link>
      ))}
    </>
  );
}
