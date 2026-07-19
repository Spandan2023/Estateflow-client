import { useNavigate } from "react-router-dom";
import { Bell, LogOut, Menu, UserRound } from "lucide-react";

function Navbar({ user, onMenuClick, onLogout }) {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const currentUser = user || storedUser;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    if (onLogout) {
      onLogout();
    }

    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-5 lg:ml-72 lg:px-8">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-[#0F172A] transition hover:bg-slate-100 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-xl font-semibold text-[#0F172A]">
            Welcome back, {currentUser?.fullName?.split(" ")[0] || "User"}
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your real estate operations efficiently.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="relative rounded-lg p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-[#0F172A]"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#10B981]" />
        </button>

        <div className="hidden items-center gap-3 border-l border-slate-200 pl-4 sm:flex">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-[#10B981]">
            <UserRound size={20} />
          </span>

          <div className="max-w-36">
            <p className="truncate text-sm font-semibold text-[#0F172A]">
              {currentUser?.fullName || "EstateFlow User"}
            </p>

            <p className="text-xs capitalize text-slate-500">
              {currentUser?.role || "Employee"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;