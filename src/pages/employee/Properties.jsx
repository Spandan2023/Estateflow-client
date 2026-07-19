import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  CheckCircle2,
  Clock3,
  Image,
  MapPin,
  Plus,
  XCircle,
} from "lucide-react";

import Footer from "../../components/navigation/Footer";
import Navbar from "../../components/navigation/Navbar";
import Sidebar from "../../components/navigation/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { getMyPropertySubmissions } from "../../services/propertyService";

const tabs = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved & Live", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

const statusStyles = {
  pending: {
    badge: "bg-amber-50 text-amber-700",
    icon: Clock3,
    iconClass: "text-amber-600",
  },
  approved: {
    badge: "bg-emerald-50 text-emerald-700",
    icon: CheckCircle2,
    iconClass: "text-[#10B981]",
  },
  rejected: {
    badge: "bg-red-50 text-red-700",
    icon: XCircle,
    iconClass: "text-red-600",
  },
};

function Properties() {
  const { user } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProperties = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyPropertySubmissions();
      setProperties(data.properties || []);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to load your property submissions."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const visibleProperties = useMemo(() => {
    if (activeTab === "all") {
      return properties;
    }

    return properties.filter(
      (property) => property.approvalStatus === activeTab
    );
  }, [activeTab, properties]);

  const formatPrice = (property) => {
    if (property.priceRange) {
      return property.priceRange;
    }

    return `₹${Number(property.price).toLocaleString("en-IN")}`;
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
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#10B981]">
              Employee Portal
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#0F172A]">
              My Properties
            </h1>

            <p className="mt-2 text-slate-500">
              Track every property you submitted and its approval status.
            </p>
          </div>

          <Link
            to="/employee/properties/submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#10B981] px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            <Plus size={18} />
            Submit Property
          </Link>
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
              {visibleProperties.length} propert
              {visibleProperties.length === 1 ? "y" : "ies"} found.
            </p>

            <button
              type="button"
              onClick={loadProperties}
              className="text-sm font-semibold text-[#10B981] hover:text-emerald-700"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="flex min-h-64 items-center justify-center">
              <p className="text-sm text-slate-500">
                Loading your properties...
              </p>
            </div>
          ) : visibleProperties.length === 0 ? (
            <div className="flex min-h-64 items-center justify-center px-6 py-10 text-center">
              <div>
                <Building2 size={36} className="mx-auto text-slate-300" />
                <p className="mt-4 font-medium text-slate-600">
                  No properties found.
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Submit a property and it will appear here for approval tracking.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 p-6 md:grid-cols-2 xl:grid-cols-3">
              {visibleProperties.map((property) => {
                const imageUrl = property.media?.images?.[0]?.url;
                const statusConfig =
                  statusStyles[property.approvalStatus] ||
                  statusStyles.pending;

                const StatusIcon = statusConfig.icon;

                return (
                  <article
                    key={property._id}
                    className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                  >
                    <div className="h-52 bg-slate-100">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={property.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-slate-300">
                          <Image size={38} />
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-[#10B981]">
                            {property.category}
                          </p>

                          <h2 className="mt-1 text-lg font-semibold text-[#0F172A]">
                            {property.title}
                          </h2>
                        </div>

                        <span
                          className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusConfig.badge}`}
                        >
                          <StatusIcon size={14} />
                          {property.approvalStatus}
                        </span>
                      </div>

                      <p className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                        <MapPin size={16} />
                        {property.city}
                      </p>

                      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                        <p className="font-semibold text-[#0F172A]">
                          {formatPrice(property)}
                        </p>

                        <p className="text-xs text-slate-400">
                          {new Date(property.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>

                      {property.approvalStatus === "pending" && (
                        <div className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
                          This property is private and awaiting administrator review.
                        </div>
                      )}

                      {property.approvalStatus === "approved" && (
                        <div className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">
                          This property has been approved and is eligible for public display.
                        </div>
                      )}

                      {property.approvalStatus === "rejected" && (
                        <div className="mt-4 rounded-lg bg-red-50 p-3">
                          <p className="text-sm font-semibold text-red-700">
                            Submission rejected
                          </p>

                          <p className="mt-1 text-sm leading-6 text-red-700">
                            {property.approvalNote ||
                              "No review note was provided by the administrator."}
                          </p>
                        </div>
                      )}
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