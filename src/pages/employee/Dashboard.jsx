import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Award,
  Building2,
  CircleDollarSign,
  ClipboardList,
  Home,
  Send,
  TrendingUp,
  UserRound,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/navigation/Sidebar";
import Navbar from "../../components/navigation/Navbar";
import Footer from "../../components/navigation/Footer";

function InfoCard({ title, value, description, icon: Icon, iconClassName }) {
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

  const currentLevel = user?.level ?? 0;
  const propertiesSold = user?.propertiesSold ?? 0;
  const commission = user?.commission ?? 8;

  const nextLevelTarget =
    currentLevel === 0 ? 3 : currentLevel === 1 ? 6 : null;

  const progressPercentage = nextLevelTarget
    ? Math.min((propertiesSold / nextLevelTarget) * 100, 100)
    : 100;

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

            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#0F172A]">
              Your Dashboard
            </h2>

            <p className="mt-2 text-slate-500">
              Track your profile, submitted properties, leads, commission, and progress.
            </p>
          </div>

          <Link
            to="/employee/properties/submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#10B981] px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            <Send size={18} />
            Submit Property
          </Link>
        </div>

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <InfoCard
            title="Current Level"
            value={`Level ${currentLevel}`}
            description={
              currentLevel === 2
                ? "You have reached the highest employee level."
                : "Keep progressing through verified sales."
            }
            icon={Award}
            iconClassName="bg-emerald-50 text-[#10B981]"
          />

          <InfoCard
            title="Commission Rate"
            value={`${commission}%`}
            description="Commission on administrator-verified sales."
            icon={CircleDollarSign}
            iconClassName="bg-amber-50 text-amber-600"
          />

          <InfoCard
            title="Properties Sold"
            value={propertiesSold}
            description="Sales verified and recorded by the administrator."
            icon={Home}
            iconClassName="bg-blue-50 text-blue-600"
          />

          <InfoCard
            title="Assigned Leads"
            value="0"
            description="Customer leads assigned to you by an administrator."
            icon={ClipboardList}
            iconClassName="bg-violet-50 text-violet-600"
          />
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-[#10B981]">
                <TrendingUp size={21} />
              </span>

              <div>
                <h3 className="font-semibold text-[#0F172A]">
                  Level Progress
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Promotion is calculated only from administrator-verified sales.
                </p>
              </div>
            </div>

            {nextLevelTarget ? (
              <div className="mt-8">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-[#1E293B]">
                    Level {currentLevel} to Level {currentLevel + 1}
                  </span>

                  <span className="font-semibold text-[#10B981]">
                    {propertiesSold} / {nextLevelTarget} sales
                  </span>
                </div>

                <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-[#10B981] transition-all"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-500">
                  {currentLevel === 0
                    ? "Complete 3 verified sales within 3 months to become Level 1 and earn 30% commission."
                    : "Complete 6 verified sales within 6 months to become Level 2 and earn 40% commission."}
                </p>
              </div>
            ) : (
              <div className="mt-8 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                <p className="font-semibold text-emerald-700">
                  You are a Level 2 employee.
                </p>
                <p className="mt-1 text-sm text-emerald-700">
                  You have achieved the highest EstateFlow employee level.
                </p>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-[#0F172A]">
                  <UserRound size={21} />
                </span>

                <div>
                  <h3 className="font-semibold text-[#0F172A]">My Profile</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Employee information
                  </p>
                </div>
              </div>

              <Link
                to="/employee/profile"
                className="text-sm font-semibold text-[#10B981] hover:text-emerald-700"
              >
                Edit Phone
              </Link>
            </div>

            <div className="mt-7 space-y-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Employee ID
                </p>
                <p className="mt-1 font-semibold text-[#0F172A]">
                  {user?.employeeId || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Email Address
                </p>
                <p className="mt-1 break-all text-sm font-medium text-[#0F172A]">
                  {user?.email || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Phone Number
                </p>
                <p className="mt-1 font-medium text-[#0F172A]">
                  {user?.phone || "Not added"}
                </p>
              </div>
            </div>

            <p className="mt-6 border-t border-slate-100 pt-4 text-xs leading-5 text-slate-500">
              Employee ID and email are protected. Only your contact number can be updated.
            </p>
          </div>
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h3 className="font-semibold text-[#0F172A]">
                  My Property Submissions
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Properties submitted by you for administrator approval.
                </p>
              </div>

              <Link
                to="/employee/properties"
                className="text-sm font-semibold text-[#10B981] hover:text-emerald-700"
              >
                View all
              </Link>
            </div>

            <EmptyPanel
              icon={Building2}
              title="No property submissions yet."
              description="Submit a property listing. It remains private until an administrator approves it."
            />
          </div>

          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h3 className="font-semibold text-[#0F172A]">
                  Assigned Properties
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Properties assigned by an administrator for follow-up.
                </p>
              </div>

              <Building2 size={21} className="text-[#10B981]" />
            </div>

            <EmptyPanel
              icon={Building2}
              title="No properties assigned yet."
              description="Administrator-assigned properties will appear here."
            />
          </div>

          <div className="rounded-xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h3 className="font-semibold text-[#0F172A]">My Leads</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Customer enquiries assigned to you by an administrator.
                </p>
              </div>

              <Link
                to="/employee/leads"
                className="text-sm font-semibold text-[#10B981] hover:text-emerald-700"
              >
                View all
              </Link>
            </div>

            <EmptyPanel
              icon={ClipboardList}
              title="No leads assigned yet."
              description="When an administrator assigns a customer enquiry to you, it will appear here."
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;