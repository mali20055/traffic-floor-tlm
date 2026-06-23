import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";
import { projectId, dataset } from "./sanity/env";

export default defineConfig({
  name: "traffic-floor",
  title: "Traffic Floor — İçerik Yönetimi",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
