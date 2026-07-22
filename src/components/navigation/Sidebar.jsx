import { NavLink } from "react-router-dom";
import {
  BarChart3,
  Building2,
  ClipboardList,
  FileText,
  Home,
  UserRoundCheck,
  Users,
  MessageSquareMore,
  Send,
  WalletCards,
  X,
} from "lucide-react";

const adminLinks = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: Home,
  },
  {
    label: "Employees",
    path: "/admin/employees",
    icon: Users,
  },
  {
    label: "Employee Requests",
    path: "/admin/employee-requests",
    icon: UserRoundCheck,
  },
  {
    label: "Properties",
    path: "/admin/properties",
    icon: Building2,
  },
  {
    label: "CRM Leads",
    path: "/admin/leads",
    icon: ClipboardList,
  },
  {
    label: "Customer Inquiries",
    path: "/admin/inquiries",
    icon: MessageSquareMore,
  },
  {
    label: "Sales",
    path: "/admin/sales",
    icon: WalletCards,
  },
  {
    label: "Reports",
    path: "/admin/reports",
    icon: BarChart3,
  },
];

const employeeLinks = [
  {
    label: "Dashboard",
    path: "/employee/dashboard",
    icon: Home,
  },
  {
    label: "Properties",
    path: "/employee/properties",
    icon: Building2,
  },
  {
    label: "Submit Property",
    path: "/employee/properties/submit",
    icon: Send,
  },
  {
    label: "My Inquiries",
    path: "/employee/inquiries",
    icon: MessageSquareMore,
  },
  {
    label: "My Profile",
    path: "/employee/profile",
    icon: FileText,
  },
];

function Sidebar({ user, isOpen, onClose }) {
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const currentUser = user || storedUser;
  const isAdmin = currentUser?.role === "admin";

  const navigationLinks = isAdmin ? adminLinks : employeeLinks;

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-slate-950/50 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-[#0F172A] text-white transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-700 px-6">
          <NavLink to="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#10B981]">
              <Building2 size={21} />
            </span>

            <div>
              <p className="text-lg font-semibold tracking-tight">EstateFlow</p>
              <p className="text-xs text-slate-400">CRM Platform</p>
            </div>
          </NavLink>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-300 transition hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={22} />
          </button>
        </div>

        <div className="border-b border-slate-700 px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {isAdmin ? "Administrator" : "Employee Portal"}
          </p>

          <p className="mt-2 truncate font-semibold text-white">
            {currentUser?.fullName || "EstateFlow User"}
          </p>

          <p className="mt-1 text-sm text-slate-400">
            {currentUser?.employeeId || currentUser?.email || "Loading..."}
          </p>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Main Menu
          </p>

          {navigationLinks.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/employee/properties"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-[#10B981] text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <Icon size={19} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-slate-700 px-6 py-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} EstateFlow CRM
          </p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;