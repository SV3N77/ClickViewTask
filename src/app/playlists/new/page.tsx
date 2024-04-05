import React from "react";
import { addNewPlaylist } from "./addNewPlaylist";

export default async function PlaylistsPage() {
  return (
    <>
      <div className="d-flex flex-column bg-card rounded p-4">
        <div className="fs-4 font-bold">Add New Playlist</div>
        <form action={addNewPlaylist} className="d-flex flex-column">
          <div className="d-flex flex-column">
            <label htmlFor="playlistName" className="my-1">
              Name:
            </label>
            <input type="text" name="playlistName" />
          </div>
          <div className="d-flex flex-column mb-4">
            <label htmlFor="playlistDescription" className="my-1">
              Description:
            </label>
            <textarea name="playlistDescription" />
          </div>
          <button className="btn btn-primary w-50 mx-auto">Add playlist</button>
        </form>
      </div>
    </>
  );
}
