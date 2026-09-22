import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "../../pages/Dashboard";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — CampusTrack" },
      {
        name: "description",
        content: "Placement dashboard with application counts and status breakdown.",
      },
      { property: "og:title", content: "Dashboard — CampusTrack" },
      {
        property: "og:description",
        content: "Placement dashboard with application counts and status breakdown.",
      },
    ],
  }),
  component: Dashboard,
});
