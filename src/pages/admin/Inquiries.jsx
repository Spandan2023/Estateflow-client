import { useEffect, useMemo, useState } from "react";
import {
  Building2,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  MapPin,
  Mail,
  Phone,
  RefreshCcw,
  Search,
  Trash2,
  User,
  UserCheck,
} from "lucide-react";

import Footer from "../../components/navigation/Footer";
import Navbar from "../../components/navigation/Navbar";
import Sidebar from "../../components/navigation/Sidebar";
import { useAuth } from "../../context/AuthContext";
import {
  assignInquiry,
  deleteInquiry,
  getAllInquiries,
  updateInquiryStatus,
} from "../../services/inquiryService";
import { getEmployees } from "../../services/employeeService";

const statusFilters = [
  { label: "All", value: "all" },
  { label: "New", value: "new" },
  { label: "Assigned", value: "assigned" },
  { label: "Resolved", value: "resolved" },
];

const sourceFilters = [
  { label: "All Sources", value: "all" },
  { label: "Landing Page", value: "landing" },
  { label: "Property Page", value: "property" },
];

const getStatusClass = (status) => {
  const classes = {
    new: "bg-blue-50 text-blue-700",
    assigned: "bg-amber-50 text-amber-700",
    resolved: "bg-emerald-50 text-emerald-700",
  };

  return classes[status] || "bg-slate-100 text-slate-600";
};

function Inquiries() {
  const { user } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inquiries, setInquiries] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState("");
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");

  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [assignmentNote, setAssignmentNote] = useState("");
  const [showAssignModal, setShowAssignModal] = useState(false);

  const loadInquiries = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllInquiries();
      setInquiries(data.inquiries || []);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to load customer inquiries."
      );
    } finally {
      setLoading(false);
    }
  };

  const loadEmployees = async () => {
    try {
      const data = await getEmployees();

      const activeEmployees = (data.employees || []).filter(
        (employee) => employee.status === "Active"
      );

      setEmployees(activeEmployees);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to load active employees."
      );
    }
  };

  useEffect(() => {
    loadInquiries();
    loadEmployees();
  }, []);

  const openAssignModal = (inquiry) => {
    setSelectedInquiry(inquiry);
    setSelectedEmployee(inquiry.assignedEmployee?._id || "");
    setAssignmentNote(inquiry.notes || "");
    setShowAssignModal(true);
  };

  const closeAssignModal = () => {
    setShowAssignModal(false);
    setSelectedInquiry(null);
    setSelectedEmployee("");
    setAssignmentNote("");
  };

  const handleAssignEmployee = async () => {
    if (!selectedInquiry || !selectedEmployee) {
      setError("Please select an active employee.");
      return;
    }

    try {
      setProcessingId(selectedInquiry._id);

      await assignInquiry(selectedInquiry._id, {
        assignedEmployee: selectedEmployee,
        notes: assignmentNote,
      });

      const employee = employees.find(
        (item) => item._id === selectedEmployee
      );

      setInquiries((previous) =>
        previous.map((inquiry) =>
          inquiry._id === selectedInquiry._id
            ? {
                ...inquiry,
                assignedEmployee: employee,
                status: "assigned",
                notes: assignmentNote,
              }
            : inquiry
        )
      );

      closeAssignModal();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to assign this inquiry."
      );
    } finally {
      setProcessingId("");
    }
  };

  const handleStatusChange = async (inquiry, status) => {
    try {
      setProcessingId(inquiry._id);

      await updateInquiryStatus(inquiry._id, { status });

      setInquiries((previous) =>
        previous.map((item) =>
          item._id === inquiry._id ? { ...item, status } : item
        )
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to update inquiry status."
      );
    } finally {
      setProcessingId("");
    }
  };

  const handleDelete = async (inquiry) => {
    const confirmed = window.confirm(
      `Delete inquiry from "${inquiry.customerName}"? This cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setProcessingId(inquiry._id);

      await deleteInquiry(inquiry._id);

      setInquiries((previous) =>
        previous.filter((item) => item._id !== inquiry._id)
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to delete this inquiry."
      );
    } finally {
      setProcessingId("");
    }
  };

  const filteredInquiries = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase();

    return inquiries.filter((inquiry) => {
      const matchesSearch =
        inquiry.customerName?.toLowerCase().includes(normalizedSearch) ||
        inquiry.phone?.includes(searchTerm) ||
        inquiry.email?.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "all" || inquiry.status === statusFilter;

      const matchesSource =
        sourceFilter === "all" || inquiry.source === sourceFilter;

      return matchesSearch && matchesStatus && matchesSource;
    });
  }, [inquiries, searchTerm, statusFilter, sourceFilter]);

  const stats = {
    total: inquiries.length,
    new: inquiries.filter((item) => item.status === "new").length,
    assigned: inquiries.filter((item) => item.status === "assigned").length,
    resolved: inquiries.filter((item) => item.status === "resolved").length,
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
            Customer Management
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#0F172A]">
            Customer Inquiries
          </h1>

          <p className="mt-2 text-slate-500">
            Review customer messages and assign each inquiry to an active employee.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <section className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Total</p>
            <p className="mt-3 text-3xl font-semibold text-[#0F172A]">
              {stats.total}
            </p>
          </div>

          <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
            <p className="text-sm font-medium text-blue-700">New</p>
            <p className="mt-3 text-3xl font-semibold text-blue-700">
              {stats.new}
            </p>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <p className="text-sm font-medium text-amber-700">Assigned</p>
            <p className="mt-3 text-3xl font-semibold text-amber-700">
              {stats.assigned}
            </p>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
            <p className="text-sm font-medium text-emerald-700">Resolved</p>
            <p className="mt-3 text-3xl font-semibold text-emerald-700">
              {stats.resolved}
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <div className="grid gap-4 lg:grid-cols-4">
              <div className="relative lg:col-span-2">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search by customer, email, or phone..."
                  className="w-full rounded-lg border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-emerald-200"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-emerald-200"
              >
                {statusFilters.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>

              <select
                value={sourceFilter}
                onChange={(event) => setSourceFilter(event.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-emerald-200"
              >
                {sourceFilters.map((source) => (
                  <option key={source.value} value={source.value}>
                    {source.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
            <p className="text-sm text-slate-500">
              {filteredInquiries.length} inquir
              {filteredInquiries.length === 1 ? "y" : "ies"} found.
            </p>

            <button
              type="button"
              onClick={loadInquiries}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#10B981] hover:text-emerald-700"
            >
              <RefreshCcw size={17} />
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="flex min-h-64 items-center justify-center">
              <p className="text-sm text-slate-500">Loading inquiries...</p>
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="flex min-h-64 items-center justify-center px-6 py-12 text-center">
              <div>
                <ClipboardList size={40} className="mx-auto text-slate-300" />
                <p className="mt-4 font-medium text-slate-600">
                  No inquiries found.
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Landing page and property page inquiries will appear here.
                </p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {filteredInquiries.map((inquiry) => (
                <article key={inquiry._id} className="p-6">
                  <div className="flex flex-col gap-6 xl:flex-row xl:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <h2 className="text-xl font-semibold text-[#0F172A]">
                              {inquiry.customerName}
                            </h2>

                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusClass(
                                inquiry.status
                              )}`}
                            >
                              {inquiry.status}
                            </span>

                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold capitalize text-slate-600">
                              {inquiry.source}
                            </span>
                          </div>

                          <p className="mt-2 text-sm text-slate-500">
                            Customer inquiry
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 grid gap-4 text-sm text-slate-600 md:grid-cols-2">
                        <p className="flex items-center gap-2">
                          <Phone size={16} className="text-slate-400" />
                          {inquiry.phone}
                        </p>

                        {inquiry.email && (
                          <p className="flex items-center gap-2">
                            <Mail size={16} className="text-slate-400" />
                            {inquiry.email}
                          </p>
                        )}

                        <p className="flex items-center gap-2">
                          <CalendarDays size={16} className="text-slate-400" />
                          {new Date(inquiry.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </p>

                        <p className="flex items-center gap-2">
                          <User size={16} className="text-slate-400" />
                          Assigned:{" "}
                          {inquiry.assignedEmployee?.fullName || "Not assigned"}
                        </p>

                        <p className="flex items-center gap-2 md:col-span-2">
                          {inquiry.property ? (
                            <>
                              <Building2 size={16} className="text-slate-400" />
                              Property: {inquiry.property.title}
                              {inquiry.property.city
                                ? ` — ${inquiry.property.city}`
                                : ""}
                            </>
                          ) : (
                            <>
                              <MapPin size={16} className="text-slate-400" />
                              General landing-page inquiry
                            </>
                          )}
                        </p>
                      </div>

                      <div className="mt-6 rounded-lg bg-slate-50 p-4">
                        <h3 className="mb-2 text-sm font-semibold text-slate-700">
                          Customer Message
                        </h3>

                        <p className="whitespace-pre-wrap text-sm leading-7 text-slate-600">
                          {inquiry.message}
                        </p>
                      </div>

                      {inquiry.notes && (
                        <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                          <h3 className="mb-2 text-sm font-semibold text-emerald-700">
                            Internal Assignment Note
                          </h3>

                          <p className="whitespace-pre-wrap text-sm leading-6 text-emerald-700">
                            {inquiry.notes}
                          </p>
                        </div>
                      )}

                      <div className="mt-6 flex flex-wrap gap-3">
                        <button
                          type="button"
                          disabled={processingId === inquiry._id}
                          onClick={() => openAssignModal(inquiry)}
                          className="inline-flex items-center gap-2 rounded-lg bg-[#10B981] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <UserCheck size={17} />
                          {inquiry.assignedEmployee
                            ? "Reassign Employee"
                            : "Assign Employee"}
                        </button>

                        <select
                          disabled={processingId === inquiry._id}
                          value={inquiry.status}
                          onChange={(event) =>
                            handleStatusChange(inquiry, event.target.value)
                          }
                          className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 outline-none transition focus:border-[#10B981] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <option value="new">New</option>
                          <option value="assigned">Assigned</option>
                          <option value="resolved">Resolved</option>
                        </select>

                        <button
                          type="button"
                          disabled={processingId === inquiry._id}
                          onClick={() => handleDelete(inquiry)}
                          className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <Trash2 size={17} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      {showAssignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-5">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-[#0F172A]">
              Assign Inquiry
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Select an active employee who should handle this customer inquiry.
            </p>

            <select
              value={selectedEmployee}
              onChange={(event) => setSelectedEmployee(event.target.value)}
              className="mt-6 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-emerald-200"
            >
              <option value="">Select active employee</option>

              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.fullName} ({employee.employeeId})
                </option>
              ))}
            </select>

            <textarea
              rows="4"
              value={assignmentNote}
              onChange={(event) => setAssignmentNote(event.target.value)}
              placeholder="Optional internal note for the assigned employee..."
              className="mt-4 w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-emerald-200"
            />

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeAssignModal}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={!selectedEmployee || processingId === selectedInquiry?._id}
                onClick={handleAssignEmployee}
                className="rounded-lg bg-[#10B981] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {processingId === selectedInquiry?._id
                  ? "Assigning..."
                  : "Assign Inquiry"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Inquiries;