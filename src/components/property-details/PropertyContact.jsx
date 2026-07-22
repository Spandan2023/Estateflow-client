import { MessageCircle, Phone, UserRound } from "lucide-react";

function PropertyContact({ property }) {
  const owner = property?.owner || {};
  const phone = owner.phone || "";
  const phoneDigits = phone.replace(/\D/g, "");

  const whatsappNumber =
    phoneDigits.length === 10 ? `91${phoneDigits}` : phoneDigits;

  const whatsappLink = whatsappNumber
    ? `https://wa.me/${whatsappNumber}`
    : "";

  return (
    <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-7">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#10B981]">
          Contact
        </p>

        <h2 className="mt-2 text-2xl font-semibold text-[#0F172A]">
          Contact Person
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="flex items-start gap-4 rounded-xl border border-slate-200 p-5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[#10B981]">
            <UserRound size={22} />
          </span>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Property Contact
            </p>

            <h3 className="mt-1 text-lg font-semibold text-[#0F172A]">
              {owner.name || "EstateFlow Property Team"}
            </h3>

            {phone ? (
              <p className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                <Phone size={16} className="text-[#10B981]" />
                {phone}
              </p>
            ) : (
              <p className="mt-3 text-sm text-slate-500">
                Submit an inquiry and our team will contact you.
              </p>
            )}
          </div>
        </div>

        {phone && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#10B981] px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              <Phone size={17} />
              Call Now
            </a>

            {whatsappLink && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#10B981] px-5 py-3 text-sm font-semibold text-[#10B981] transition hover:bg-emerald-50"
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