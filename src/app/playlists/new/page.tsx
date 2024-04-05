import React from "react";
import { addNewPlaylist } from "./addNewPlaylist";

export default async function PlaylistsPage() {
  return (
    <>
      <form action={addNewPlaylist}>
        <input type="text" name="playlistName" />
        <input type="text" name="playlistDescription" />
        <button>add playlist</button>
      </form>
    </>
  );
}
