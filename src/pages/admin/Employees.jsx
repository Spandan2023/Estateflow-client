import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  Filter,
  Mail,
  Phone,
  Search,
  UserCheck,
  UserCog,
  UserRound,
  UserX,
  Users,
} from "lucide-react";

import Footer from "../../components/navigation/Footer";
import Navbar from "../../components/navigation/Navbar";
import Sidebar from "../../components/navigation/Sidebar";
import { useAuth } from "../../context/AuthContext";
import {
  getEmployees,
  updateEmployeeStatus,
} from "../../services/employeeService";

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-700",
  Inactive: "bg-slate-100 text-slate-600",
  Pending: "bg-amber-50 text-amber-700",
  Rejected: "bg-red-50 text-red-700",
};

function Employees() {
  const { user } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");

  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState("");
  const [error, setError] = useState("");

  const loadEmployees = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getEmployees({
        search: search || undefined,
        status: statusFilter || undefined,
        level: levelFilter || undefined,
      });

      setEmployees(data.employees || []);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to load employee records."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, [statusFilter, levelFilter]);

  const handleSearch = (event) => {
    event.preventDefault();
    loadEmployees();
  };

  const handleStatusChange = async (employee, status) => {
    const action = status === "Active" ? "activate" : "deactivate";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} ${employee.fullName}?`
    );

    if (!confirmed) return;

    try {
      setProcessingId(employee._id);

      const data = await updateEmployeeStatus(employee._id, status);

      setEmployees((previous) =>
        previous.map((item) =>
          item._id === employee._id ? data.employee : item
        )
      );

      if (selectedEmployee?._id === employee._id) {
        setSelectedEmployee(data.employee);
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to update employee status."
      );
    } finally {
      setProcessingId("");
    }
  };

  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active"
  ).length;

  const pendingEmployees = employees.filter(
    (employee) => employee.status === "Pending"
  ).length;

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
              Employee Management
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#0F172A]">
              Employees
            </h1>

            <p className="mt-2 text-slate-500">
              Search employee records, view profiles, and manage account access.
            </p>
          </div>

          <Link
            to="/admin/employee-requests"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#10B981] px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            <UserCheck size={18} />
            Review Employee Requests
          </Link>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <section className="grid gap-5 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Matching Employees
            </p>
            <p className="mt-3 text-3xl font-semibold text-[#0F172A]">
              {employees.length}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Active Employees
            </p>
            <p className="mt-3 text-3xl font-semibold text-[#10B981]">
              {activeEmployees}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Pending Requests
            </p>
            <p className="mt-3 text-3xl font-semibold text-amber-600">
              {pendingEmployees}
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <form
              onSubmit={handleSearch}
              className="grid gap-4 lg:grid-cols-[1fr_180px_180px_auto]"
            >
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by name, employee ID, email, or phone..."
                  className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-emerald-200"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-emerald-200"
              >
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </select>

              <select
                value={levelFilter}
                onChange={(event) => setLevelFilter(event.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-emerald-200"
              >
                <option value="">All Levels</option>
                <option value="0">Level 0</option>
                <option value="1">Level 1</option>
                <option value="2">Level 2</option>
              </select>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0F172A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                <Filter size={17} />
                Filter
              </button>
            </form>
          </div>

          {loading ? (
            <div className="flex min-h-64 items-center justify-center">
              <p className="text-sm text-slate-500">Loading employees...</p>
            </div>
          ) : employees.length === 0 ? (
            <div className="flex min-h-64 items-center justify-center px-6 py-10 text-center">
              <div>
                <Users size={36} className="mx-auto text-slate-300" />
                <p className="mt-4 font-medium text-slate-600">
                  No employee records found.
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Adjust your search or filters, or review pending requests.
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px] text-left">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Employee</th>
                    <th className="px-6 py-4 font-semibold">Contact</th>
                    <th className="px-6 py-4 font-semibold">Level</th>
                    <th className="px-6 py-4 font-semibold">Commission</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                  {employees.map((employee) => (
                    <tr key={employee._id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-[#0F172A]">
                          {employee.fullName}
                        </p>
                        <p className="mt-1 text-sm text-[#10B981]">
                          {employee.employeeId}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-700">
                          {employee.email}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          {employee.phone}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                          Level {employee.level}
                        </span>
                      </td>

                      <td className="px-6 py-4 font-semibold text-[#10B981]">
                        {employee.commission}%
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[employee.status]}`}
                        >
                          {employee.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedEmployee(employee)}
                            className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-[#0F172A]"
                            title="View profile"
                          >
                            <Eye size={18} />
                          </button>

                          {employee.status === "Active" && (
                            <button
                              type="button"
                              disabled={processingId === employee._id}
                              onClick={() =>
                                handleStatusChange(employee, "Inactive")
                              }
                              className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                              title="Deactivate employee"
                            >
                              <UserX size={18} />
                            </button>
                          )}

                          {employee.status === "Inactive" && (
                            <button
                              type="button"
                              disabled={processingId === employee._id}
                              onClick={() =>
                                handleStatusChange(employee, "Active")
                              }
                              className="rounded-lg p-2 text-[#10B981] transition hover:bg-emerald-50 disabled:opacity-50"
                              title="Activate employee"
                            >
                              <UserCheck size={18} />
                            </button>
                          )}

                          {employee.status === "Pending" && (
                            <Link
                              to="/admin/employee-requests"
                              className="rounded-lg p-2 text-amber-600 transition hover:bg-amber-50"
                              title="Review request"
                            >
                              <UserCog size={18} />
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-5">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-xl">
            <div className="flex items-start justify-between border-b border-slate-200 p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-[#10B981]">
                  <UserRound size={21} />
                </span>

                <div>
                  <h2 className="text-lg font-semibold text-[#0F172A]">
                    {selectedEmployee.fullName}
                  </h2>
                  <p className="mt-1 text-sm text-[#10B981]">
                    {selectedEmployee.employeeId}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedEmployee(null)}
                className="text-sm font-semibold text-slate-500 hover:text-[#0F172A]"
              >
                Close
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Email Address
                  </p>
                  <p className="mt-1 break-all text-sm font-medium text-[#0F172A]">
                    {selectedEmployee.email}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Phone Number
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#0F172A]">
                    {selectedEmployee.phone}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Employee Level
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#0F172A]">
                    Level {selectedEmployee.level}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Commission Rate
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#10B981]">
                    {selectedEmployee.commission}%
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Properties Sold
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#0F172A]">
                    {selectedEmployee.propertiesSold}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Account Status
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#0F172A]">
                    {selectedEmployee.status}
                  </p>
                </div>
              </div>

              {selectedEmployee.approvalNote && (
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Approval Note
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {selectedEmployee.approvalNote}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Employees;