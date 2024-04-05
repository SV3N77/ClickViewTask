import { Playlist } from "@/interfaces/playlist";
import { PlaylistItem } from "@/components/playlist-item";
import React from "react";
import Link from "next/link";
import { removePlaylist } from "./removePlaylist";

export default async function PlaylistsPage() {
  const playlists = await fetch("http://localhost:3000/api/playlists").then(
    (response) => response.json() as Promise<Playlist[]>
  );

  return (
    <>
      <div className="d-flex p-2 justify-content-between">
        <h1>All Playlists</h1>
        <Link href={"/playlists/new"}>
          <button className="p-2">Add new playlist</button>
        </Link>
      </div>
      {playlists.map((playlist) => (
        <div key={playlist.id}>
          <PlaylistItem playlist={playlist} />
          <form action={removePlaylist}>
            <input type="hidden" value={playlist.id} name="playlistId" />
            <button>Remove playlist</button>
          </form>
        </div>
      ))}
    </>
  );
}
