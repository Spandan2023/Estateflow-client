import {
  MessageCircle,
  Phone,
  UserRound,
} from "lucide-react";

function PropertyContact({ property }) {
  const owner = property?.owner || {};

  const phone = owner.phone || "";

  const phoneDigits = phone.replace(/\D/g, "");

  const whatsappNumber =
    phoneDigits.length === 10
      ? `91${phoneDigits}`
      : phoneDigits;

  const whatsappLink = whatsappNumber
    ? `https://wa.me/${whatsappNumber}`
    : "";

  return (
    <section className="mt-8 rounded-2xl border border-[#E5D5BC]/40 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-7">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#C4943E]">
          Contact
        </p>

        <h2 className="mt-2 text-2xl font-semibold text-[#1A1A1A]">
          Agent Contact
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="flex items-start gap-4 rounded-xl border border-[#E5D5BC]/50 bg-[#FFFCF7] p-5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E5D5BC]/40 text-[#C4943E]">
            <UserRound size={22} />
          </span>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#C4943E]">
              Agent Contact
            </p>

            <h3 className="mt-1 text-lg font-semibold text-[#1A1A1A]">
              {owner.name || "Sukhneer Property Team"}
            </h3>

            {phone ? (
              <p className="mt-3 flex items-center gap-2 text-sm text-[#2C2416]/70">
                <Phone
                  size={16}
                  className="text-[#C4943E]"
                />

                {phone}
              </p>
            ) : (
              <p className="mt-3 text-sm text-[#2C2416]/60">
                Submit an inquiry and our Sukhneer team
                will contact you.
              </p>
            )}
          </div>
        </div>

        {phone && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#C4943E] px-5 py-3 text-sm font-semibold text-[#1A1A1A] transition hover:bg-[#B78532]"
            >
              <Phone size={17} />

              Call Now
            </a>

            {whatsappLink && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#C4943E] px-5 py-3 text-sm font-semibold text-[#2C2416] transition hover:bg-[#E5D5BC]/30"
              >
                <MessageCircle size={17} />

                WhatsApp
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default PropertyContact;