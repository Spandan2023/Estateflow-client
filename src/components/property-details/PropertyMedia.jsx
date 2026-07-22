import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Images, PlayCircle } from "lucide-react";

const FALLBACK_IMAGE = "https://placehold.co/1200x800?text=EstateFlow+Property";

function PropertyMedia({ property, getMediaUrl = (url) => url }) {
  const images = property?.media?.images || [];
  const video = property?.media?.video;
  const videoUrl =
    typeof video === "string" ? video : video?.url || "";

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [property?._id]);

  const selectedImage = images[selectedImageIndex];
  const selectedImageUrl = selectedImage
    ? getMediaUrl(
        typeof selectedImage === "string" ? selectedImage : selectedImage.url,
      )
    : "";

  const showPreviousImage = () => {
    setSelectedImageIndex((previous) =>
      previous === 0 ? images.length - 1 : previous - 1,
    );
  };

  const showNextImage = () => {
    setSelectedImageIndex((previous) =>
      previous === images.length - 1 ? 0 : previous + 1,
    );
  };

  if (images.length === 0 && !videoUrl) {
    return (
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#10B981]">
            Media
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-[#0F172A]">
            Property Gallery
          </h2>
        </div>

        <div className="flex min-h-56 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 text-center">
          <div>
            <Images size={36} className="mx-auto text-slate-300" />
            <p className="mt-3 font-medium text-slate-600">
              Media will be added soon.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#10B981]">
            Media
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-[#0F172A]">
            Property Gallery
          </h2>
        </div>

        {images.length > 0 && (
          <p className="text-sm text-slate-500">
            {images.length} {images.length === 1 ? "photo" : "photos"}
          </p>
        )}
      </div>

      {images.length > 0 && (
        <>
          <div className="relative overflow-hidden rounded-xl bg-slate-100">
            <img
              src={selectedImageUrl || FALLBACK_IMAGE}
              alt={`${property.title} - ${selectedImageIndex + 1}`}
              onError={(event) => {
                event.currentTarget.src = FALLBACK_IMAGE;
              }}
              className="h-72 w-full object-cover sm:h-[460px]"
            />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPreviousImage}
                  aria-label="Previous property image"
                  className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-slate-950/70 text-white transition hover:bg-slate-950"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  type="button"
                  onClick={showNextImage}
                  aria-label="Next property image"
                  className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-slate-950/70 text-white transition hover:bg-slate-950"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
              {images.map((image, index) => {
                const imageUrl = getMediaUrl(
                  typeof image === "string" ? image : image?.url,
                );

                return (
                  <button
                    type="button"
                    key={`${imageUrl}-${index}`}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`h-20 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                      selectedImageIndex === index
                        ? "border-[#10B981]"
                        : "border-transparent hover:border-slate-300"
                    }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img
                      src={imageUrl || FALLBACK_IMAGE}
                      alt={`${property.title} thumbnail ${index + 1}`}
                      onError={(event) => {
                        event.currentTarget.src = FALLBACK_IMAGE;
                      }}
                      className="h-full w-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </>
      )}

      {videoUrl && (
        <div className={images.length > 0 ? "mt-10" : ""}>
          <div className="mb-4 flex items-center gap-2">
            <PlayCircle size={20} className="text-[#10B981]" />
            <h3 className="text-lg font-semibold text-[#0F172A]">
              Property Video
            </h3>
          </div>

          <video
            controls
            preload="metadata"
            className="w-full rounded-xl bg-slate-950"
          >
            <source src={getMediaUrl(videoUrl)} />
            Your browser does not support video playback.
          </video>
        </div>
      )}
    </section>
  );
}

export default PropertyMedia;