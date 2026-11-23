import { useState } from "react";
import { Trash2, ArrowLeft } from "lucide-react";
import { api } from "../../../api/axios";

function CreateHotelPage() {
  const [formData, setFormData] = useState({
    slug: "",
    name: "",
    tagline: "",
    location: "",
    priceFrom: "",
    description: "",
  });

  const [imagesInput, setImagesInput] = useState("");
  const [images, setImages] = useState([]);

  const [amenityInput, setAmenityInput] = useState("");
  const [amenities, setAmenities] = useState([]);

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Handle Image Add
  const handleAddImage = () => {
    if (imagesInput.trim() && !images.includes(imagesInput.trim())) {
      setImages([...images, imagesInput.trim()]);
      setImagesInput("");
    }
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Handle Amenity Add
  const handleAddAmenity = () => {
    if (amenityInput.trim() && !amenities.includes(amenityInput.trim())) {
      setAmenities([...amenities, amenityInput.trim()]);
      setAmenityInput("");
    }
  };

  const handleRemoveAmenity = (index) => {
    setAmenities(amenities.filter((_, i) => i !== index));
  };

  // Submit Handler mapped to backend API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const payload = {
      ...formData,
      priceFrom: Number(formData.priceFrom),
      images,
      amenities,
    };

    try {
      await api.post("/hotels/create_hotel", payload);

      setSuccessMsg("Hotel created successfully!");
      // Reset form or redirect
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || err.message || "Failed to create hotel",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans p-6 lg:p-12">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div>
            <a
              href="/admin/hotels"
              className="text-xs text-amber-400 hover:underline flex items-center gap-1 mb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Hotels Directory
            </a>
            <h1 className="text-3xl font-serif font-bold text-zinc-100">
              Register New Luxury Hotel
            </h1>
          </div>
          <span className="px-3 py-1 bg-amber-400/10 text-amber-400 border border-amber-400/20 rounded-full font-mono text-[10px] uppercase">
            Create Mode
          </span>
        </div>

        {errorMsg && (
          <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-xl text-xs text-rose-400">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl text-xs text-emerald-400">
            {successMsg}
          </div>
        )}

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400">
                Hotel Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. The Obsidian Sanctum"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-100 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Slug */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400">
                URL Slug *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. obsidian-sanctum-maldives"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-100 focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Location */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400">
                Location *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Baa Atoll, Maldives"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-100 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Starting Price */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400">
                Starting Nightly Rate ($) *
              </label>
              <input
                type="number"
                required
                min="0"
                placeholder="850"
                value={formData.priceFrom}
                onChange={(e) =>
                  setFormData({ ...formData, priceFrom: e.target.value })
                }
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-100 focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>
          </div>

          {/* Tagline */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400">
              Tagline *
            </label>
            <input
              type="text"
              required
              placeholder="Ultra-luxury overwater villas nestled in private coral reefs."
              value={formData.tagline}
              onChange={(e) =>
                setFormData({ ...formData, tagline: e.target.value })
              }
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-100 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400">
              Description *
            </label>
            <textarea
              required
              rows="4"
              placeholder="Provide a detailed editorial overview of the property..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-100 focus:outline-none focus:border-amber-400 resize-none"
            />
          </div>

          {/* Image URLs Builder */}
          <div className="space-y-2 border-t border-zinc-800 pt-4">
            <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400">
              Image Gallery URLs
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={imagesInput}
                onChange={(e) => setImagesInput(e.target.value)}
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-amber-400 font-mono"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs font-bold"
              >
                Add Image
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {images.map((url, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-xl text-xs"
                >
                  <span className="truncate max-w-[200px] text-zinc-400">
                    {url}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="text-rose-400 hover:text-rose-300"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities Builder */}
          <div className="space-y-2 border-t border-zinc-800 pt-4">
            <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400">
              Amenities
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Private Infinity Pool"
                value={amenityInput}
                onChange={(e) => setAmenityInput(e.target.value)}
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-amber-400"
              />
              <button
                type="button"
                onClick={handleAddAmenity}
                className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs font-bold"
              >
                Add Amenity
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {amenities.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-xl text-xs"
                >
                  <span className="text-zinc-300">✓ {item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAmenity(idx)}
                    className="text-rose-400 hover:text-rose-300"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-zinc-800 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="py-3.5 px-8 rounded-xl text-xs font-bold bg-amber-400 text-zinc-950 hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20 disabled:opacity-50"
            >
              {loading ? "Publishing Hotel..." : "Publish Hotel Listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateHotelPage;
