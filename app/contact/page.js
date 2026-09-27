import HeroBanner from "../components/HeroBanner";
import ContactForm from "../components/ContactForm";

export const metadata = {
  title: "Contact Us | Archbishop Tenison's CE High School",
};

export default function ContactPage() {
  return (
    <>
      <HeroBanner
        compact
        eyebrow="Contact Us"
        title="Get in Touch"
        subtitle="We would love to hear from you. Reach out with any questions about our school."
      />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold text-[#0b2545]">
              School Office
            </h2>
            <dl className="mt-4 space-y-3 text-sm text-zinc-700">
              <div>
                <dt className="font-medium text-zinc-500">Address</dt>
                <dd>55 Kennington Oval, London, SE11 5SR</dd>
              </div>
              <div>
                <dt className="font-medium text-zinc-500">Phone</dt>
                <dd>020 7735 4886</dd>
              </div>
              <div>
                <dt className="font-medium text-zinc-500">Email</dt>
                <dd>info@archbishoptenisons.example.uk</dd>
              </div>
              <div>
                <dt className="font-medium text-zinc-500">Office Hours</dt>
                <dd>Monday to Friday, 8:00am – 4:30pm (term time)</dd>
              </div>
            </dl>

            <div className="mt-8 aspect-video overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100">
              <iframe
                className="h-full w-full"
                loading="lazy"
                src="https://www.google.com/maps?q=Kennington+Oval,+London&output=embed"
                title="Map showing school location"
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0b2545]">
              Send Us a Message
            </h2>
            <div className="mt-4">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
