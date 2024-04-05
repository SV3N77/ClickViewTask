import VideoItem from "@/components/video-item";
import { Video } from "@/interfaces/video";

export default async function VideosPage() {
  const videos = await fetch("http://localhost:3000/api/videos").then(
    (response) => response.json() as Promise<Video[]>
  );

  return (
    <>
      <h1 className="mb-4">All Videos</h1>
      <ul className="">
        {videos.map((video) => (
          <div key={video.id} className="d-flex mb-3">
            <VideoItem video={video} />
          </div>
        ))}
      </ul>
    </>
  );
}
