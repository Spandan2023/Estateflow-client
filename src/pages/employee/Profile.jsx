import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LockKeyhole, Save, UserRound } from "lucide-react";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Footer from "../../components/navigation/Footer";
import Navbar from "../../components/navigation/Navbar";
import Sidebar from "../../components/navigation/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { updateMyPhone } from "../../services/employeeService";

function Profile() {
  const { user, updateUser } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [phone, setPhone] = useState(user?.phone || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setPhone(user?.phone || "");
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!phone.trim()) {
      setError("Please enter a valid phone number.");
      return;
    }

    try {
      setLoading(true);

      const data = await updateMyPhone(phone.trim());

      updateUser(data.user);
      setSuccess("Phone number updated successfully.");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to update your phone number."
      );
    } finally {
      setLoading(false);
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
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#10B981]">
              Employee Portal
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#0F172A]">
              My Profile
            </h1>

            <p className="mt-2 text-slate-500">
              View your employee details and update your contact number.
            </p>
          </div>

          <Link
            to="/employee/dashboard"
            className="text-sm font-semibold text-[#10B981] hover:text-emerald-700"
          >
            Back to Dashboard
          </Link>
        </div>

        <div className="max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-[#10B981]">
              <UserRound size={25} />
            </span>

            <div>
              <h2 className="text-xl font-semibold text-[#0F172A]">
                {user?.fullName}
              </h2>

              <p className="mt-1 text-sm text-[#10B981]">
                {user?.employeeId}
              </p>
            </div>
          </div>

          {error && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <Input
              label="Full Name"
              type="text"
              value={user?.fullName || ""}
              disabled
            />

            <Input
              label="Employee ID"
              type="text"
              value={user?.employeeId || ""}
              disabled
            />

            <Input
              label="Email Address"
              type="email"
              value={user?.email || ""}
              disabled
            />

            <Input
              label="Phone Number"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Enter your phone number"
              required
            />

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="flex gap-3">
                <LockKeyhole
                  size={19}
                  className="mt-0.5 shrink-0 text-slate-500"
                />

                <p className="text-sm leading-6 text-slate-600">
                  Your full name, employee ID, and email are protected company
                  records. Only your contact phone number can be updated.
                </p>
              </div>
            </div>

            <div className="pt-2 sm:w-64">
              <Button type="submit" disabled={loading}>
                <span className="inline-flex items-center justify-center gap-2">
                  <Save size={18} />
                  {loading ? "Saving..." : "Save Phone Number"}
                </span>
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Profile;