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
        title="Get in touch"
        subtitle="We would love to hear from you. Reach out with any questions about our school."
      />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-xl font-medium text-[var(--color-text-primary)]">
              School office
            </h2>
            <dl className="font-body mt-4 space-y-3 text-sm text-[var(--color-text-secondary)]">
              <div>
                <dt className="font-medium text-[var(--color-text-tertiary)]">
                  Address
                </dt>
                <dd>Selborne Road, Croydon, CR0 5JQ</dd>
              </div>
              <div>
                <dt className="font-medium text-[var(--color-text-tertiary)]">
                  Phone
                </dt>
                <dd>0208 688 4014</dd>
              </div>
              <div>
                <dt className="font-medium text-[var(--color-text-tertiary)]">
                  Email
                </dt>
                <dd>reception@archten.croydon.sch.uk</dd>
              </div>
              <div>
                <dt className="font-medium text-[var(--color-text-tertiary)]">
                  Office hours
                </dt>
                <dd>Monday to Friday, 8:00am – 4:30pm (term time)</dd>
              </div>
            </dl>

            <div className="mt-8 aspect-video overflow-hidden border border-[var(--color-border-primary)]">
              <iframe
                className="h-full w-full"
                loading="lazy"
                src="https://www.google.com/maps?q=Selborne+Road,+Croydon,+CR0+5JQ&output=embed"
                title="Map showing school location"
              />
            </div>
          </div>

          <div>
            <h2 className="font-display text-xl font-medium text-[var(--color-text-primary)]">
              Send us a message
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
