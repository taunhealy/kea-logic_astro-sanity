import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "amds2shj",
  dataset: "production",
  apiVersion: '2024-05-19',
  useCdn: true,
  perspective: "published"
});
