import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  Image,
  MapPinned,
  Send,
  Upload,
  Video,
} from "lucide-react";

import Button from "../../components/common/Button";
import Footer from "../../components/navigation/Footer";
import Navbar from "../../components/navigation/Navbar";
import Sidebar from "../../components/navigation/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { createProperty } from "../../services/propertyService";

const categories = [
  "Apartment",
  "Villa",
  "House",
  "Plot",
  "Commercial",
  "Office",
  "Other",
];

function SubmitProperty() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    city: "",
    address: "",
    price: "",
    priceRange: "",
    mapsLink: "",
    ownerName: "",
    ownerPhone: "",
  });

  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    setImages(Array.from(event.target.files || []));
  };

  const handleVideoChange = (event) => {
    setVideo(event.target.files?.[0] || null);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      city: "",
      address: "",
      price: "",
      priceRange: "",
      mapsLink: "",
      ownerName: "",
      ownerPhone: "",
    });

    setImages([]);
    setVideo(null);

    document.getElementById("employee-property-images").value = "";
    document.getElementById("employee-property-video").value = "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (images.length === 0 && !video) {
      setError("Please upload at least one property image or one video.");
      return;
    }

    try {
      setLoading(true);

      const uploadData = new FormData();

      uploadData.append("title", formData.title);
      uploadData.append("description", formData.description);
      uploadData.append("category", formData.category);
      uploadData.append("city", formData.city);
      uploadData.append("address", formData.address);
      uploadData.append("price", formData.price);
      uploadData.append("priceRange", formData.priceRange);
      uploadData.append("mapsLink", formData.mapsLink);

      uploadData.append(
        "owner",
        JSON.stringify({
          name: formData.ownerName,
          phone: formData.ownerPhone,
        })
      );

      images.forEach((imageFile) => {
        uploadData.append("images", imageFile);
      });

      if (video) {
        uploadData.append("video", video);
      }

      await createProperty(uploadData);

      setSuccess(
        "Property submitted successfully. It will remain private until an administrator reviews and approves it."
      );

      resetForm();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to submit the property. Please try again."
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
              Property Submission
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#0F172A]">
              Submit a Property
            </h1>

            <p className="mt-2 text-slate-500">
              Your listing will be reviewed by an administrator before it is displayed publicly.
            </p>
          </div>

          <Link
            to="/employee/dashboard"
            className="text-sm font-semibold text-[#10B981] hover:text-emerald-700"
          >
            Back to Dashboard
          </Link>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          encType="multipart/form-data"
        >
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-[#10B981]">
                <Building2 size={21} />
              </span>

              <div>
                <h2 className="font-semibold text-[#0F172A]">
                  Property Details
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Provide complete and accurate listing information.
                </p>
              </div>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-[#1E293B]">
                  Property Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Example: Palm Grove Residency"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-emerald-200"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#1E293B]">
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-emerald-200"
                >
                  <option value="">Select category</option>

                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#1E293B]">
                  Property Value (₹)
                </label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="1"
                  placeholder="Example: 8200000"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-emerald-200"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-[#1E293B]">
                  Detailed Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Describe the property, building features, nearby amenities, and important details..."
                  required
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-emerald-200"
                />
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <MapPinned size={21} />
              </span>

              <div>
                <h2 className="font-semibold text-[#0F172A]">
                  Location and Pricing
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Add property location, Google Maps link, and price details.
                </p>
              </div>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#1E293B]">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Example: Bengaluru"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-emerald-200"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#1E293B]">
                  Display Price Range
                </label>

                <input
                  type="text"
                  name="priceRange"
                  value={formData.priceRange}
                  onChange={handleChange}
                  placeholder="Example: ₹80–85 Lakhs"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-emerald-200"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#1E293B]">
                  Google Maps Link
                </label>

                <input
                  type="url"
                  name="mapsLink"
                  value={formData.mapsLink}
                  onChange={handleChange}
                  placeholder="https://maps.google.com/..."
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-emerald-200"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#1E293B]">
                  Full Address
                </label>

                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter complete property address"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-emerald-200"
                />
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                <Upload size={21} />
              </span>

              <div>
                <h2 className="font-semibold text-[#0F172A]">
                  Property Media
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Upload at least one image or a video. Both are allowed.
                </p>
              </div>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="employee-property-images"
                  className="mb-2 flex items-center gap-2 text-sm font-medium text-[#1E293B]"
                >
                  <Image size={17} />
                  Property Images
                </label>

                <input
                  id="employee-property-images"
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  multiple
                  onChange={handleImageChange}
                  className="block w-full rounded-lg border border-slate-300 p-2 text-sm text-slate-500 file:mr-4 file:rounded-md file:border-0 file:bg-emerald-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[#10B981] hover:file:bg-emerald-100"
                />

                <p className="mt-2 text-xs text-slate-500">
                  JPG, JPEG, PNG, or WEBP. Maximum 10 images.
                </p>

                {images.length > 0 && (
                  <p className="mt-2 text-sm font-medium text-[#10B981]">
                    {images.length} image{images.length === 1 ? "" : "s"} selected.
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="employee-property-video"
                  className="mb-2 flex items-center gap-2 text-sm font-medium text-[#1E293B]"
                >
                  <Video size={17} />
                  Property Video
                </label>

                <input
                  id="employee-property-video"
                  type="file"
                  accept=".mp4,.webm,.mov"
                  onChange={handleVideoChange}
                  className="block w-full rounded-lg border border-slate-300 p-2 text-sm text-slate-500 file:mr-4 file:rounded-md file:border-0 file:bg-emerald-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[#10B981] hover:file:bg-emerald-100"
                />

                <p className="mt-2 text-xs text-slate-500">
                  MP4, WEBM, or MOV. Maximum 100 MB.
                </p>

                {video && (
                  <p className="mt-2 truncate text-sm font-medium text-[#10B981]">
                    Video selected: {video.name}
                  </p>
                )}
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <Building2 size={21} />
              </span>

              <div>
                <h2 className="font-semibold text-[#0F172A]">
                  Property Contact
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Add the point of contact for this specific listing.
                </p>
              </div>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#1E293B]">
                  Contact Person Name
                </label>

                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  placeholder="Enter contact person name"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-emerald-200"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#1E293B]">
                  Contact Phone Number
                </label>

                <input
                  type="tel"
                  name="ownerPhone"
                  value={formData.ownerPhone}
                  onChange={handleChange}
                  placeholder="Enter contact phone number"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-emerald-200"
                />
              </div>
            </div>
          </section>

          <div className="flex justify-end">
            <div className="w-full sm:w-72">
              <Button type="submit" disabled={loading}>
                <span className="inline-flex items-center justify-center gap-2">
                  <Send size={18} />
                  {loading ? "Submitting Property..." : "Submit for Approval"}
                </span>
              </Button>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}

export default SubmitProperty;