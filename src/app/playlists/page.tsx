import { Playlist } from "@/interfaces/playlist";
import { PlaylistItem } from "@/components/playlist-item";
import React from "react";
import Link from "next/link";
import { removePlaylist } from "./removePlaylist";
import Button from "react-bootstrap/Button";

export default async function PlaylistsPage() {
  const playlists = await fetch("http://localhost:3000/api/playlists").then(
    (response) => response.json() as Promise<Playlist[]>
  );

  return (
    <>
      <div className="d-flex p-2 justify-content-between">
        <h1 className="mb-4">All Playlists</h1>
        <Link href={"/playlists/new"}>
          <button className="p-2 btn btn-primary">Add new playlist </button>
        </Link>
      </div>
      {playlists.map((playlist) => (
        <div
          key={playlist.id}
          className="d-flex justify-content-between mb-2 align-center bg-card border rounded"
        >
          <PlaylistItem playlist={playlist} />
          <form action={removePlaylist} className="mx-4">
            <input type="hidden" value={playlist.id} name="playlistId" />
            <Button variant="primary" size="sm">
              Remove playlist
            </Button>
          </form>
        </div>
      ))}
    </>
  );
}
