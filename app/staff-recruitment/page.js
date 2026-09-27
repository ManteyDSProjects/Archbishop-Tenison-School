import Link from "next/link";
import HeroBanner from "../components/HeroBanner";
import { getAllVacancies } from "@/lib/content";

export const metadata = {
  title: "Staff Recruitment | Archbishop Tenison's CE High School",
};

export default function StaffRecruitmentPage() {
  const vacancies = getAllVacancies();

  return (
    <>
      <HeroBanner
        compact
        eyebrow="Staff Recruitment"
        title="Join Our Team"
        subtitle="We are always looking for talented, committed staff who share our values and vision."
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="prose prose-zinc max-w-none">
          <h2 className="text-2xl font-bold text-[#0b2545]">
            Why Work With Us
          </h2>
          <p className="mt-4 text-zinc-700">
            At Archbishop Tenison&apos;s, we invest in our staff through
            strong professional development, a supportive leadership team,
            and a genuinely collaborative culture. Whether you are an
            experienced professional or new to teaching, we would love to
            hear from you.
          </p>
        </div>

        <div className="mt-10 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#0b2545]">
            Current Vacancies
          </h2>
          <Link
            href="/vacancies"
            className="text-sm font-medium text-[#0b2545] hover:text-[#c9a961]"
          >
            View all vacancies →
          </Link>
        </div>

        {vacancies.length === 0 ? (
          <p className="mt-4 text-zinc-600">
            There are no current vacancies. Please check back soon.
          </p>
        ) : (
          <p className="mt-4 text-zinc-600">
            We currently have {vacancies.length} open position
            {vacancies.length === 1 ? "" : "s"}. Visit our vacancies page for
            full details and how to apply.
          </p>
        )}
      </section>
    </>
  );
}
