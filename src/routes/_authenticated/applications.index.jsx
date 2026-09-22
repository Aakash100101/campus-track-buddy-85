import { createFileRoute } from "@tanstack/react-router";
import Applications from "../pages/Applications";

export const Route = createFileRoute("/_authenticated/applications/")({
  head: () => ({
    meta: [
      { title: "Applications — CampusTrack" },
      {
        name: "description",
        content: "Search, filter and manage every placement application you have submitted.",
      },
      { property: "og:title", content: "Applications — CampusTrack" },
      {
        property: "og:description",
        content: "Search, filter and manage every placement application you have submitted.",
      },
    ],
  }),
  component: Applications,
});
