import {
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

function PropertyInquiry({ property }) {
  return (
    <section
      id="property-inquiry"
      className="mt-8 scroll-mt-6 overflow-hidden rounded-2xl border border-[#E5D5BC]/40 bg-white shadow-sm"
    >
      <div className="grid lg:grid-cols-2">

        {/* ================= LEFT ================= */}

        <div className="bg-[#2C2416] p-6 text-white sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#C4943E]">
            Get In Touch
          </p>

          <h2 className="mt-3 text-2xl font-semibold">
            Interested in this property?
          </h2>

          <p className="mt-4 leading-7 text-[#E5D5BC]">
            For more information about{" "}
            <span className="font-semibold text-white">
              {property.title}
            </span>
            , pricing, availability, or to schedule a visit, get in touch
            with the Sukhneer team.
          </p>

          <div className="mt-8 space-y-5">

            {/* Phone */}

            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#C4943E] text-[#1A1A1A]">
                <Phone size={20} />
              </span>

              <div>
                <p className="text-sm text-[#E5D5BC]">
                  Call our team
                </p>

                {/* Replace with actual phone number */}

                <p className="mt-1 font-semibold">
                  Contact Sukhneer
                </p>
              </div>
            </div>

            {/* Email */}

            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#C4943E] text-[#1A1A1A]">
                <Mail size={20} />
              </span>

              <div>
                <p className="text-sm text-[#E5D5BC]">
                  Email us
                </p>

                {/* Replace with actual email */}

                <p className="mt-1 font-semibold">
                  Contact Sukhneer
                </p>
              </div>
            </div>

            {/* Location */}

            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#C4943E] text-[#1A1A1A]">
                <MapPin size={20} />
              </span>

              <div>
                <p className="text-sm text-[#E5D5BC]">
                  Visit us
                </p>

                {/* Replace with actual address */}

                <p className="mt-1 font-semibold">
                  Sukhneer Real Estate
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* ================= RIGHT ================= */}

        <div className="flex flex-col justify-center p-6 sm:p-8">

          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#C4943E]">
            Property Assistance
          </p>

          <h3 className="mt-3 text-2xl font-semibold text-[#1A1A1A]">
            Let us help you take the next step.
          </h3>

          <p className="mt-4 leading-7 text-[#2C2416]/60">
            Our team can provide further information about this property
            and guide you through the next steps.
          </p>

          <div className="mt-7 rounded-xl border border-[#E5D5BC] bg-[#FFFCF7] p-5">

            <p className="font-semibold text-[#1A1A1A]">
              Looking for more details?
            </p>

            <p className="mt-2 text-sm leading-6 text-[#2C2416]/60">
              Contact Sukhneer directly using the details provided here.
              Our team will be happy to assist you with property
              information and availability.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}

export default PropertyInquiry;