import { Metadata } from "next";
import Login from "./Login";

export const metadata: Metadata = {
    title: "Login",
    description:
      "Login to CV Builder and start creating your professional CVs and cover letters.",
    keywords: "Login, CV Builder, Professional Resumes, Cover Letters",
    openGraph: {
      title: "Login | CV Builder",
      description: "Login to CV Builder to create stunning resumes with ease.",
    },
  };

export default function Page() {
  return <Login />;
}
