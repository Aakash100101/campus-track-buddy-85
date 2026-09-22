// Mock dataset used for the frontend-only phase of CampusTrack.
// Later this file can be deleted once FastAPI serves the real data.

export const STATUSES = ["Applied", "Assessment", "Interview", "Selected", "Rejected"];

export const mockApplications = [
  {
    id: 1,
    company: "Infosys",
    role: "Systems Engineer",
    status: "Assessment",
    applicationDate: "2026-08-12",
    location: "Bengaluru, KA",
    notes: "Cleared the aptitude round. Technical assessment scheduled next week.",
  },
  {
    id: 2,
    company: "TCS",
    role: "Graduate Trainee (Digital)",
    status: "Interview",
    applicationDate: "2026-08-04",
    location: "Chennai, TN",
    notes: "NQT score 82 percentile. Technical interview with the platform team.",
  },
  {
    id: 3,
    company: "HCLTech",
    role: "Software Engineer Trainee",
    status: "Applied",
    applicationDate: "2026-09-01",
    location: "Noida, UP",
    notes: "Applied through the campus placement portal. Waiting for shortlist.",
  },
  {
    id: 4,
    company: "Capgemini",
    role: "Analyst - Software Development",
    status: "Selected",
    applicationDate: "2026-07-21",
    location: "Pune, MH",
    notes: "Offer letter received. Joining date expected in July 2027.",
  },
  {
    id: 5,
    company: "Accenture",
    role: "Associate Software Engineer",
    status: "Rejected",
    applicationDate: "2026-07-09",
    location: "Hyderabad, TS",
    notes: "Did not clear the communication assessment round.",
  },
  {
    id: 6,
    company: "Wipro",
    role: "Project Engineer",
    status: "Applied",
    applicationDate: "2026-09-10",
    location: "Remote",
    notes: "Referred by a senior from the 2025 batch.",
  },
];
