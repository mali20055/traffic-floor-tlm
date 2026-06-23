import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

/** Read-only Sanity client for fetching published content. */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // fast, cached reads for published content
});
