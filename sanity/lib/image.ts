import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image } from "sanity";
import { projectId, dataset } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

/** Build a CDN URL for a Sanity image (used for Portable Text inline images). */
export function urlForImage(source: Image) {
  return builder.image(source);
}
