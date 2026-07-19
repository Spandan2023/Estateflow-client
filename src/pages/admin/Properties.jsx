import { useEffect, useState } from "react";
import {
  Building2,
  Check,
  Clock3,
  Eye,
  Image,
  MapPin,
  Trash2,
  UserRound,
  UserX,
  Video,
} from "lucide-react";

import Footer from "../../components/navigation/Footer";
import Navbar from "../../components/navigation/Navbar";
import Sidebar from "../../components/navigation/Sidebar";
import { useAuth } from "../../context/AuthContext";
import {
  deleteProperty,
  getAllProperties,
  reviewProperty,
} from "../../services/propertyService";

const tabs = [
  { label: "All Properties", value: "all" },
  { label: "Pending Approval", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

function getStatusClass(status) {
  const classes = {
    pending: "bg-amber-50 text-amber-700",
    approved: "bg-emerald-50 text-emerald-700",
    rejected: "bg-red-50 text-red-700",
  };

  return classes[status] || "bg-slate-100 text-slate-600";
}

function Properties() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [properties, setProperties] = useState([]);
  const [reviewNotes, setReviewNotes] = useState({});
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState("");
  const [error, setError] = useState("");

  const loadProperties = async (status = activeTab) => {
    try {
      setLoading(true);
      setError("");

      const params = status === "all" ? {} : { approvalStatus: status };
      const data = await getAllProperties(params);

      setProperties(data.properties || []);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to load property records."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties(activeTab);
  }, [activeTab]);

  const handleReview = async (property, approvalStatus) => {
    const action = approvalStatus === "approved" ? "approve" : "reject";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} "${property.title}"?`
    );

    if (!confirmed) return;

    try {
      setProcessingId(property._id);

      await reviewProperty(property._id, {
        approvalStatus,
        approvalNote: reviewNotes[property._id] || "",
        status: "available",
        isFeatured: false,
      });

      setProperties((previous) =>
        previous.filter((item) => item._id !== property._id)
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to review this property."
      );
    } finally {
      setProcessingId("");
    }
  };

  const handleDelete = async (property) => {
    const confirmed = window.confirm(
      `Delete "${property.title}" permanently? This cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setProcessingId(property._id);

      await deleteProperty(property._id);

      setProperties((previous) =>
        previous.filter((item) => item._id !== property._id)
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to delete this property."
      );
    } finally {
      setProcessingId("");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar
        user={user}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <Navbar
        user={user}
        onMenuClick={() => setSidebarOpen(true)}
      />

      <main className="min-h-[calc(100vh-80px)] px-5 py-8 lg:ml-72 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#10B981]">
            Property Management
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#0F172A]">
            All Properties
          </h1>

          <p className="mt-2 text-slate-500">
            Review employee submissions and manage all EstateFlow listings.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 pt-5">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActiveTab(tab.value)}
                  className={`border-b-2 px-3 pb-4 text-sm font-semibold transition ${
                    activeTab === tab.value
                      ? "border-[#10B981] text-[#10B981]"
                      : "border-transparent text-slate-500 hover:text-[#0F172A]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
            <p className="text-sm text-slate-500">
              {properties.length} propert{properties.length === 1 ? "y" : "ies"} found.
            </p>

            <button
              type="button"
              onClick={() => loadProperties(activeTab)}
              className="text-sm font-semibold text-[#10B981] hover:text-emerald-700"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="flex min-h-64 items-center justify-center">
              <p className="text-sm text-slate-500">Loading properties...</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="flex min-h-64 items-center justify-center px-6 py-10 text-center">
              <div>
                <Building2 size={36} className="mx-auto text-slate-300" />
                <p className="mt-4 font-medium text-slate-600">
                  No property records found.
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Properties created by admins and submitted by employees will appear here.
                </p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {properties.map((property) => {
                const imageUrl = property.media?.images?.[0]?.url;
                const submittedBy = property.submittedBy;

                return (
                  <article key={property._id} className="p-6">
                    <div className="flex flex-col gap-6 xl:flex-row">
                      <div className="h-48 w-full shrink-0 overflow-hidden rounded-lg bg-slate-100 xl:w-64">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={property.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-slate-300">
                            <Image size={36} />
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <div className="flex flex-wrap items-center gap-3">
                              <h2 className="text-xl font-semibold text-[#0F172A]">
                                {property.title}
                              </h2>

                              <span
                                className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusClass(
                                  property.approvalStatus
                                )}`}
                              >
                                {property.approvalStatus}
                              </span>

                              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold capitalize text-slate-600">
                                {property.status}
                              </span>
                            </div>

                            <p className="mt-2 text-sm font-medium text-[#10B981]">
                              {property.category}
                            </p>
                          </div>

                          <p className="text-lg font-semibold text-[#0F172A]">
                            {property.priceRange ||
                              `₹${Number(property.price).toLocaleString("en-IN")}`}
                          </p>
                        </div>

                        <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-600">
                          {property.description}
                        </p>

                        <div className="mt-5 grid gap-3 text-sm text-slate-600 md:grid-cols-2">
                          <p className="flex items-center gap-2">
                            <MapPin size={16} className="text-slate-400" />
                            {property.city}, {property.address}
                          </p>

                          <p className="flex items-center gap-2">
                            <UserRound size={16} className="text-slate-400" />
                            Submitted by:{" "}
                            {submittedBy?.fullName || "Administrator"}
                          </p>

                          <p className="flex items-center gap-2">
                            <Image size={16} className="text-slate-400" />
                            {property.media?.images?.length || 0} image(s)
                          </p>

                          <p className="flex items-center gap-2">
                            <Video size={16} className="text-slate-400" />
                            {property.media?.video?.url
                              ? "Video attached"
                              : "No video"}
                          </p>
                        </div>

                        {property.approvalStatus === "pending" && (
                          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
                            <label className="mb-2 block text-sm font-medium text-amber-900">
                              Approval / Rejection Note
                            </label>

                            <textarea
                              rows="2"
                              value={reviewNotes[property._id] || ""}
                              onChange={(event) =>
                                setReviewNotes((previous) => ({
                                  ...previous,
                                  [property._id]: event.target.value,
                                }))
                              }
                              placeholder="Optional note for the employee..."
                              className="w-full resize-none rounded-lg border border-amber-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#10B981] focus:ring-2 focus:ring-emerald-200"
                            />

                            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                              <button
                                type="button"
                                disabled={processingId === property._id}
                                onClick={() =>
                                  handleReview(property, "approved")
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#10B981] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                              >
                                <Check size={18} />
                                Approve Property
                              </button>

                              <button
                                type="button"
                                disabled={processingId === property._id}
                                onClick={() =>
                                  handleReview(property, "rejected")
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                              >
                                <UserX size={18} />
                                Reject Property
                              </button>
                            </div>
                          </div>
                        )}

                        <div className="mt-6 flex flex-wrap gap-3">
                          <a
                            href={property.mapsLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                          >
                            <Eye size={17} />
                            Open Map
                          </a>

                          <button
                            type="button"
                            disabled={processingId === property._id}
                            onClick={() => handleDelete(property)}
                            className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <Trash2 size={17} />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Properties;