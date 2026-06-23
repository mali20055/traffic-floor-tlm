"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

// Keeping the Sanity config import inside a Client Component ensures the Sanity
// modules resolve against the browser React build (which provides createContext)
// instead of the server/RSC build.
export default function Studio() {
  return <NextStudio config={config} />;
}
