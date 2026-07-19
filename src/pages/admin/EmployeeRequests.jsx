import { useEffect, useState } from "react";
import {
  Check,
  Clock3,
  Mail,
  Phone,
  UserCheck,
  UserX,
} from "lucide-react";

import Sidebar from "../../components/navigation/Sidebar";
import Navbar from "../../components/navigation/Navbar";
import Footer from "../../components/navigation/Footer";
import { useAuth } from "../../context/AuthContext";
import {
  getPendingEmployeeRequests,
  reviewEmployeeRequest,
} from "../../services/employeeService";

function EmployeeRequests() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [reviewNotes, setReviewNotes] = useState({});
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState("");
  const [error, setError] = useState("");

  const loadRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getPendingEmployeeRequests();
      setRequests(data.employees || []);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to load employee requests."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleReview = async (employee, status) => {
    const action = status === "Active" ? "approve" : "reject";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} ${employee.fullName}'s application?`
    );

    if (!confirmed) return;

    try {
      setProcessingId(employee._id);

      await reviewEmployeeRequest(employee._id, {
        status,
        approvalNote: reviewNotes[employee._id] || "",
      });

      setRequests((previous) =>
        previous.filter((request) => request._id !== employee._id)
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to review this employee request."
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
            Employee Management
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#0F172A]">
            Pending Employee Requests
          </h1>

          <p className="mt-2 text-slate-500">
            Review new employee registrations before granting CRM access.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <Clock3 size={21} />
              </span>

              <div>
                <h2 className="font-semibold text-[#0F172A]">
                  Registration Applications
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {requests.length} request{requests.length === 1 ? "" : "s"} awaiting review.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={loadRequests}
              className="text-sm font-semibold text-[#10B981] hover:text-emerald-700"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="flex min-h-64 items-center justify-center">
              <p className="text-sm text-slate-500">
                Loading employee requests...
              </p>
            </div>
          ) : requests.length === 0 ? (
            <div className="flex min-h-64 items-center justify-center px-6 py-10 text-center">
              <div>
                <UserCheck size={36} className="mx-auto text-slate-300" />
                <p className="mt-4 font-medium text-slate-600">
                  No pending employee requests.
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  New employee signup applications will appear here.
                </p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {requests.map((employee) => (
                <article
                  key={employee._id}
                  className="p-6"
                >
                  <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-semibold text-[#0F172A]">
                          {employee.fullName}
                        </h3>

                        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                          Pending Approval
                        </span>
                      </div>

                      <p className="mt-2 text-sm font-medium text-[#10B981]">
                        {employee.employeeId}
                      </p>

                      <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                        <p className="flex items-center gap-2">
                          <Mail size={16} className="text-slate-400" />
                          {employee.email}
                        </p>

                        <p className="flex items-center gap-2">
                          <Phone size={16} className="text-slate-400" />
                          {employee.phone}
                        </p>
                      </div>

                      <p className="mt-4 text-xs text-slate-400">
                        Applied on{" "}
                        {new Date(employee.createdAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>

                    <div className="w-full max-w-md">
                      <label className="mb-2 block text-sm font-medium text-[#1E293B]">
                        Review Note
                      </label>

                      <textarea
                        rows="3"
                        value={reviewNotes[employee._id] || ""}
                        onChange={(event) =>
                          setReviewNotes((previous) => ({
                            ...previous,
                            [employee._id]: event.target.value,
                          }))
                        }
                        placeholder="Optional note for this application..."
                        className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-emerald-200"
                      />

                      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                        <button
                          type="button"
                          disabled={processingId === employee._id}
                          onClick={() => handleReview(employee, "Active")}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#10B981] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <Check size={18} />
                          Approve Employee
                        </button>

                        <button
                          type="button"
                          disabled={processingId === employee._id}
                          onClick={() => handleReview(employee, "Rejected")}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <UserX size={18} />
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default EmployeeRequests;