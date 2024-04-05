import { Col, Image, Row } from "react-bootstrap";
import { Video } from "../interfaces/video";
import Link from "next/link";

interface VideoItemProps {
  video: Video;
}

export default function VideoItem(props: VideoItemProps) {
  const { video } = props;

  return (
    <Link
      href={`/videos/${video.id}`}
      className="next-link w-75 mx-auto bg-card border rounded"
    >
      <Row className="p-3 mb-3">
        <Col xs="12" md="3" className="my-auto">
          <Image
            fluid
            rounded
            src={`${video.thumbnail}?size=small`}
            alt={video.name}
            className="w-100"
          />
        </Col>
        <Col xs="12" md="9" className="mx-auto">
          <h2 className="h4">{video.name}</h2>
          <div className="text-xs">
            Duration: {Math.round(video.duration / 60000)} minutes
          </div>
          <div className="text-s py-1">{video.description}</div>
        </Col>
      </Row>
    </Link>
  );
}
