import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto bg-[#0b2545] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <h3 className="text-lg font-semibold">
            Archbishop Tenison&apos;s CE High School
          </h3>
          <p className="mt-2 text-sm text-white/70">
            Selborne Road, Croydon, CR0 5JQ
          </p>
          <p className="mt-1 text-sm text-white/70">0208 688 4014</p>
          <p className="mt-1 text-sm text-white/70">
            reception@archten.croydon.sch.uk
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-[#c9a961]">
            Quick Links
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>
              <Link href="/admissions" className="hover:text-white">
                Admissions
              </Link>
            </li>
            <li>
              <Link href="/vacancies" className="hover:text-white">
                Vacancies
              </Link>
            </li>
            <li>
              <Link href="/information" className="hover:text-white">
                Term Dates &amp; Policies
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-[#c9a961]">
            Our Faith
          </h4>
          <p className="mt-3 text-sm text-white/70">
            A Church of England school rooted in Christian values, serving
            the community of Croydon and beyond.
          </p>
          <Link
            href="/christian-distinctiveness"
            className="mt-2 inline-block text-sm font-medium text-[#c9a961] hover:underline"
          >
            Learn more
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/50 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} Archbishop Tenison&apos;s CE High School.
        All rights reserved.
      </div>
    </footer>
  );
}
