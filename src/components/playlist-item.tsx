import { Col, Row } from "react-bootstrap";
import { Playlist } from "../interfaces/playlist";
import Link from "next/link";

interface PlaylistItemProps {
  playlist: Playlist;
}

export function PlaylistItem(props: PlaylistItemProps) {
  const { playlist } = props;

  const videoCount =
    playlist.videoIds.length === 1
      ? "1 video"
      : `${playlist.videoIds.length} videos`;

  return (
    <Link href={`/playlists/${playlist.id}`} className="next-link w-75">
      <Row className="p-2 mb-2">
        <Col xs="10" md="4">
          <h2 className="fs-5 font-bold">{playlist.name}</h2>
          <p className="mb-0 text-s">{videoCount}</p>
        </Col>
        <Col xs="10" md="6">
          <p className="mb-0">{playlist.description}</p>
        </Col>
      </Row>
    </Link>
  );
}
