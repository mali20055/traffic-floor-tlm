/**
 * Embedded Sanity Studio — admin panel at /studio.
 * See https://github.com/sanity-io/next-sanity#embed-sanity-studio
 */
import Studio from "./Studio";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <Studio />;
}
