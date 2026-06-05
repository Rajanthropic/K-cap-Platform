import { redirect } from "next/navigation";

export default function LandingPage() {
  // Automatically redirect to the dashboard for testing purposes
  redirect("/dashboard");
}
