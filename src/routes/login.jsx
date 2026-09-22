import { createFileRoute } from "@tanstack/react-router";
import Login from "../pages/Login";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — CampusTrack" },
      {
        name: "description",
        content: "Sign in to CampusTrack to track your college placement applications.",
      },
      { property: "og:title", content: "Sign in — CampusTrack" },
      {
        property: "og:description",
        content: "Sign in to CampusTrack to track your college placement applications.",
      },
    ],
  }),
  component: Login,
});
