import { createFileRoute } from "@tanstack/react-router";
import Register from "../pages/Register";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create account — CampusTrack" },
      {
        name: "description",
        content: "Create a CampusTrack account to organise your placement applications.",
      },
      { property: "og:title", content: "Create account — CampusTrack" },
      {
        property: "og:description",
        content: "Create a CampusTrack account to organise your placement applications.",
      },
    ],
  }),
  component: Register,
});
