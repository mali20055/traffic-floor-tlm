import type { SchemaTypeDefinition } from "sanity";
import { sssItem } from "./sssItem";
import { product } from "./product";
import { project } from "./project";
import { blogPost } from "./blogPost";
import { galleryItem } from "./galleryItem";
import { technicalDocument } from "./technicalDocument";

export const schemaTypes: SchemaTypeDefinition[] = [
  product,
  project,
  blogPost,
  galleryItem,
  technicalDocument,
  sssItem,
];
