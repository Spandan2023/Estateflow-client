import { useEffect, useMemo, useState } from "react";
import {
  Building2,
  CalendarDays,
  ClipboardList,
  MapPin,
  Phone,
  RefreshCcw,
  Search,
  UserRound,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/navigation/Sidebar";
import Navbar from "../../components/navigation/Navbar";
import Footer from "../../components/navigation/Footer";
import { getMyInquiries } from "../../services/inquiryService";

const statusOptions = [
  { label: "All Inquiries", value: "all" },
  { label: "Assigned", value: "assigned" },
  { label: "Resolved", value: "resolved" },
];

function getStatusClass(status) {
  const styles = {
    assigned: "bg-amber-50 text-amber-700 ring-amber-200",
    resolved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    new: "bg-blue-50 text-blue-700 ring-blue-200",
  };

  return styles[status] || "bg-slate-100 text-slate-600 ring-slate-200";
}

function Inquiries() {
  const { user } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const loadInquiries = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyInquiries();
      setInquiries(data.inquiries || []);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to load your assigned inquiries.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const filteredInquiries = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return inquiries.filter((inquiry) => {
      const matchesSearch =
        !normalizedSearch ||
        inquiry.customerName?.toLowerCase().includes(normalizedSearch) ||
        inquiry.phone?.toLowerCase().includes(normalizedSearch) ||
        inquiry.property?.title?.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "all" || inquiry.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [inquiries, searchTerm, statusFilter]);

  const assignedCount = inquiries.filter(
    (inquiry) => inquiry.status === "assigned",
  ).length;

  const resolvedCount = inquiries.filter(
    (inquiry) => inquiry.status === "resolved",
  ).length;

  const propertyInquiryCount = inquiries.filter(
    (inquiry) => inquiry.source === "property",
  ).length;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar
        user={user}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <Navbar user={user} onMenuClick={() => setSidebarOpen(true)} />

      <main className="min-h-[calc(100vh-80px)] px-5 py-8 lg:ml-72 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#10B981]">
              Employee Portal
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#0F172A]">
              My Inquiries
            </h1>

            <p className="mt-2 text-slate-500">
              Customer inquiries assigned to you by an administrator.
            </p>
          </div>

          <button
            type="button"
            onClick={loadInquiries}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#0F172A] transition hover:border-[#10B981] hover:text-[#10B981] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCcw size={17} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <section className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Total Assigned
            </p>
            <p className="mt-3 text-3xl font-semibold text-[#0F172A]">
              {inquiries.length}
            </p>
            <p className="mt-3 text-sm text-slate-500">
              Inquiries assigned to you
            </p>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <p className="text-sm font-medium text-amber-700">Active</p>
            <p className="mt-3 text-3xl font-semibold text-amber-700">
              {assignedCount}
            </p>
            <p className="mt-3 text-sm text-amber-700">
              Currently requiring attention
            </p>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
            <p className="text-sm font-medium text-emerald-700">Resolved</p>
            <p className="mt-3 text-3xl font-semibold text-emerald-700">
              {resolvedCount}
            </p>
            <p className="mt-3 text-sm text-emerald-700">
              Closed by administration
            </p>
          </div>

          <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
            <p className="text-sm font-medium text-blue-700">
              Property Inquiries
            </p>
            <p className="mt-3 text-3xl font-semibold text-blue-700">
              {propertyInquiryCount}
            </p>
            <p className="mt-3 text-sm text-blue-700">
              Linked to an estate listing
            </p>
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="relative md:col-span-2">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search customer, phone, or property..."
                  className="w-full rounded-lg border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-emerald-100"
              >
                {statusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="border-b border-slate-200 px-6 py-4">
            <p className="text-sm text-slate-500">
              {filteredInquiries.length}{" "}
              {filteredInquiries.length === 1 ? "inquiry" : "inquiries"} found.
            </p>
          </div>

          {loading ? (
            <div className="flex min-h-72 items-center justify-center">
              <div className="text-center">
                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#10B981]" />
                <p className="mt-4 text-sm text-slate-500">
                  Loading your inquiries...
                </p>
              </div>
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="flex min-h-72 items-center justify-center px-6 py-12 text-center">
              <div>
                <ClipboardList size={42} className="mx-auto text-slate-300" />
                <h2 className="mt-4 text-lg font-semibold text-slate-700">
                  No assigned inquiries yet
                </h2>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  When an administrator assigns a customer inquiry to you, it
                  will appear securely on this page.
                </p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {filteredInquiries.map((inquiry) => (
                <article key={inquiry._id} className="p-6">
                  <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-xl font-semibold text-[#0F172A]">
                          {inquiry.customerName}
                        </h2>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ring-1 ${getStatusClass(
                            inquiry.status,
                          )}`}
                        >
                          {inquiry.status}
                        </span>

                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                          {inquiry.source === "property"
                            ? "Property inquiry"
                            : "General inquiry"}
                        </span>
                      </div>

                      <div className="mt-5 grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
                        <p className="flex items-center gap-2">
                          <Phone size={16} className="shrink-0 text-slate-400" />
                          <a
                            href={`tel:${inquiry.phone}`}
                            className="font-medium text-[#0F172A] hover:text-[#10B981]"
                          >
                            {inquiry.phone}
                          </a>
                        </p>

                        <p className="flex items-center gap-2">
                          <CalendarDays
                            size={16}
                            className="shrink-0 text-slate-400"
                          />
                          Assigned inquiry received{" "}
                          {new Date(inquiry.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </p>

                        {inquiry.property ? (
                          <p className="flex items-center gap-2 sm:col-span-2">
                            <Building2
                              size={16}
                              className="shrink-0 text-slate-400"
                            />
                            <span className="font-medium text-[#0F172A]">
                              {inquiry.property.title}
                            </span>
                            {inquiry.property.city && (
                              <span className="flex items-center gap-1 text-slate-500">
                                <MapPin size={14} />
                                {inquiry.property.city}
                              </span>
                            )}
                          </p>
                        ) : (
                          <p className="flex items-center gap-2 sm:col-span-2">
                            <ClipboardList
                              size={16}
                              className="shrink-0 text-slate-400"
                            />
                            General company inquiry
                          </p>
                        )}
                      </div>

                      <div className="mt-6 rounded-lg bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Customer message
                        </p>
                        <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-600">
                          {inquiry.message}
                        </p>
                      </div>

                      {inquiry.notes && (
                        <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                            Administrator notes
                          </p>
                          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-emerald-800">
                            {inquiry.notes}
                          </p>
                        </div>
                      )}

                      {inquiry.assignedBy && (
                        <p className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                          <UserRound size={14} />
                          Assigned by {inquiry.assignedBy.fullName}
                          {inquiry.assignedBy.employeeId
                            ? ` (${inquiry.assignedBy.employeeId})`
                            : ""}
                        </p>
                      )}
                    </div>

                    <a
                      href={`tel:${inquiry.phone}`}
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#10B981] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
                    >
                      <Phone size={17} />
                      Contact Customer
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Inquiries;