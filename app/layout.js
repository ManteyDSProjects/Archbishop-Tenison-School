import { Fraunces, Public_Sans } from "next/font/google";
import Script from "next/script";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "Archbishop Tenison's CE High School",
  description:
    "A Church of England high school in Croydon, providing an outstanding education rooted in Christian values.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${fraunces.variable} ${publicSans.variable}`}
    >
      <body className="min-h-full flex min-w-0 flex-col overflow-x-hidden bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] font-body">
        <Navbar />
        <main className="flex min-w-0 flex-1 flex-col">{children}</main>
        <Footer />
        <Script
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          strategy="afterInteractive"
        />
        <Script id="netlify-identity-redirect" strategy="afterInteractive">
          {`
            if (window.netlifyIdentity) {
              window.netlifyIdentity.on("init", (user) => {
                if (!user) {
                  window.netlifyIdentity.on("login", () => {
                    document.location.href = "/admin/";
                  });
                }
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
