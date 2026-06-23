import { defineCliConfig } from "sanity/cli";

// projectId/dataset are public identifiers (also exposed via NEXT_PUBLIC_*).
// Used by the Sanity CLI for `sanity dataset` / `sanity deploy` commands.
export default defineCliConfig({
  api: {
    projectId: "y8r1xc1u",
    dataset: "production",
  },
});
