import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { createInquiry } from "../../services/inquiryService";

function PropertyInquiry({ property }) {
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSubmitted(false);

      await createInquiry({
        customerName: formData.customerName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        source: "property",
        property: property._id,
      });

      setSubmitted(true);

      setFormData({
        customerName: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to send your inquiry. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="property-inquiry"
      className="mt-8 scroll-mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="mb-7">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#10B981]">
          Enquire
        </p>

        <h2 className="mt-2 text-2xl font-semibold text-[#0F172A]">
          Interested in this property?
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
          Send your details and an EstateFlow representative will contact you
          about {property.title}.
        </p>
      </div>

      {submitted && (
        <div
          className="mb-6 flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
          role="status"
        >
          <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-[#10B981]" />
          <span>
            Your inquiry has been sent successfully. Our team will contact you
            shortly.
          </span>
        </div>
      )}

      {error && (
        <div
          className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
        <div>
          <label
            htmlFor="customerName"
            className="mb-2 block text-sm font-medium text-[#1E293B]"
          >
            Full Name *
          </label>

          <input
            id="customerName"
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-medium text-[#1E293B]"
          >
            Contact Number *
          </label>

          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your contact number"
            required
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-[#1E293B]"
          >
            Email Address <span className="text-slate-400">(optional)</span>
          </label>

          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-medium text-[#1E293B]"
          >
            Message *
          </label>

          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us what you would like to know about this property..."
            required
            className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#10B981] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Sending Inquiry..." : "Send Inquiry"}
            {!loading && <Send size={17} />}
          </button>

          <p className="mt-3 text-center text-xs text-slate-400">
            Your details are shared only with EstateFlow for this inquiry.
          </p>
        </div>
      </form>
    </section>
  );
}

export default PropertyInquiry;