import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  CheckCircle2,
  CircleDollarSign,
  ClipboardList,
  Clock3,
  FileText,
  Plus,
  UserPlus,
  Users,
  WalletCards,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/navigation/Sidebar";
import Navbar from "../../components/navigation/Navbar";
import Footer from "../../components/navigation/Footer";

function MetricCard({ title, value, description, icon: Icon, iconClassName }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-[#0F172A]">
            {value}
          </p>
        </div>

        <span
          className={`flex h-11 w-11 items-center justify-center rounded-lg ${iconClassName}`}
        >
          <Icon size={21} />
        </span>
      </div>

      <p className="mt-4 text-sm text-slate-500">{description}</p>
    </div>
  );
}

function EmptyPanel({ icon: Icon, title, description }) {
  return (
    <div className="flex min-h-52 items-center justify-center px-6 py-10 text-center">
      <div>
        <Icon size={32} className="mx-auto text-slate-300" />
        <p className="mt-4 font-medium text-slate-600">{title}</p>
        <p className="mt-2 max-w-sm text-sm text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

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
              Administrator Portal
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#0F172A]">
              Dashboard Overview
            </h2>

            <p className="mt-2 text-slate-500">
              Manage property approvals, employees, leads, and verified sales.
            </p>
          </div>

          <Link
            to="/admin/properties/create"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#10B981] px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            <Plus size={18} />
            Add Property
          </Link>
        </div>

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <MetricCard
            title="Total Employees"
            value="0"
            description="Registered employee accounts"
            icon={Users}
            iconClassName="bg-blue-50 text-blue-600"
          />

          <MetricCard
            title="Active Properties"
            value="0"
            description="Approved public property listings"
            icon={Building2}
            iconClassName="bg-emerald-50 text-[#10B981]"
          />

          <MetricCard
            title="Pending Approvals"
            value="0"
            description="Employee-submitted properties awaiting review"
            icon={Clock3}
            iconClassName="bg-amber-50 text-amber-600"
          />

          <MetricCard
            title="Total Leads"
            value="0"
            description="Customer enquiries across all employees"
            icon={ClipboardList}
            iconClassName="bg-violet-50 text-violet-600"
          />

          <MetricCard
            title="Sales This Month"
            value="0"
            description="Administrator-verified sales"
            icon={WalletCards}
            iconClassName="bg-cyan-50 text-cyan-600"
          />

          <MetricCard
            title="Total Revenue"
            value="₹0"
            description="Revenue from verified property sales"
            icon={CircleDollarSign}
            iconClassName="bg-rose-50 text-rose-600"
          />
        </section>

        <section className="mt-8">
          <div className="mb-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#10B981]">
              Quick Actions
            </p>

            <h3 className="mt-2 text-xl font-semibold text-[#0F172A]">
              Manage operations
            </h3>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Link
              to="/admin/properties/create"
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#10B981] hover:shadow-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-[#10B981]">
                <Plus size={21} />
              </span>

              <h4 className="mt-4 font-semibold text-[#0F172A]">
                Add Property
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Create an approved property listing directly.
              </p>
            </Link>

            <Link
              to="/admin/properties?status=pending"
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#10B981] hover:shadow-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <CheckCircle2 size={21} />
              </span>

              <h4 className="mt-4 font-semibold text-[#0F172A]">
                Review Submissions
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Approve or reject employee-submitted properties.
              </p>
            </Link>

            <Link
              to="/admin/employees"
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#10B981] hover:shadow-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <UserPlus size={21} />
              </span>

              <h4 className="mt-4 font-semibold text-[#0F172A]">
                Manage Employees
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                View employees and manage account status.
              </p>
            </Link>

            <Link
              to="/admin/leads"
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#10B981] hover:shadow-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                <ClipboardList size={21} />
              </span>

              <h4 className="mt-4 font-semibold text-[#0F172A]">
                Manage CRM Leads
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Assign enquiries and monitor follow-ups.
              </p>
            </Link>
          </div>
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h3 className="font-semibold text-[#0F172A]">
                  Pending Property Approvals
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Employee submissions that are not public yet.
                </p>
              </div>

              <Link
                to="/admin/properties?status=pending"
                className="text-sm font-semibold text-[#10B981] hover:text-emerald-700"
              >
                Review all
              </Link>
            </div>

            <EmptyPanel
              icon={Clock3}
              title="No pending approvals."
              description="Employee-submitted properties awaiting review will appear here."
            />
          </div>

          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h3 className="font-semibold text-[#0F172A]">
                  Recent Employees
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Newly registered employee accounts.
                </p>
              </div>

              <Link
                to="/admin/employees"
                className="text-sm font-semibold text-[#10B981] hover:text-emerald-700"
              >
                View all
              </Link>
            </div>

            <EmptyPanel
              icon={Users}
              title="No employee records yet."
              description="New employee accounts will appear here automatically."
            />
          </div>

          <div className="rounded-xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h3 className="font-semibold text-[#0F172A]">Recent Sales</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Latest administrator-verified property sales.
                </p>
              </div>

              <Link
                to="/admin/sales"
                className="text-sm font-semibold text-[#10B981] hover:text-emerald-700"
              >
                View all
              </Link>
            </div>

            <EmptyPanel
              icon={WalletCards}
              title="No verified sales yet."
              description="Once an administrator verifies a sale, it will appear here and update employee commission."
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;