import { createFileRoute } from "@tanstack/react-router";
import ApplicationDetails from "../pages/ApplicationDetails";

export const Route = createFileRoute("/_authenticated/applications/$id")({
  head: () => ({
    meta: [
      { title: "Application details — CampusTrack" },
      {
        name: "description",
        content: "Full details of a single placement application, including notes and status.",
      },
      { property: "og:title", content: "Application details — CampusTrack" },
      {
        property: "og:description",
        content: "Full details of a single placement application, including notes and status.",
      },
    ],
  }),
  component: ApplicationDetailsRoute,
});

function ApplicationDetailsRoute() {
  const { id } = Route.useParams();
  return <ApplicationDetails id={id} />;
}
