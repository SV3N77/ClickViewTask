import VideoItem from "@/components/video-item";
import { Video } from "@/interfaces/video";
import Link from "next/link";

export default async function VideosPage() {
  const videos = await fetch("http://localhost:3000/api/videos").then(
    (response) => response.json() as Promise<Video[]>
  );

  return (
    <>
      <h1>Videos route</h1>
      <ul>
        {videos.map((video) => (
          <Link key={video.id} href={`/videos/${video.id}`}>
            <VideoItem video={video} />
          </Link>
        ))}
      </ul>
    </>
  );
}
