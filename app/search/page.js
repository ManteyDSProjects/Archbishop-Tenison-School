import { Suspense } from "react";
import HeroBanner from "../components/HeroBanner";
import SearchResults from "../components/SearchResults";

export const metadata = {
  title: "Search | Archbishop Tenison's CE High School",
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <>
      <HeroBanner compact eyebrow="Search" title="Search results" />
      <Suspense fallback={null}>
        <SearchResults />
      </Suspense>
    </>
  );
}
