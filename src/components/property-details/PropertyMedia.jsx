import { useEffect, useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  Images,
  PlayCircle,
} from "lucide-react";

const FALLBACK_IMAGE =
  "https://placehold.co/1200x800?text=Sukhneer+Property";

function PropertyMedia({ property, getMediaUrl }) {
  const images = property?.media?.images || [];
  const video = property?.media?.video || null;

  const [selectedImageIndex, setSelectedImageIndex] =
    useState(0);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [property?._id]);

  const getImageUrl = (image) => {
    if (!image) return FALLBACK_IMAGE;

    return getMediaUrl(image);
  };

  const getVideoUrl = () => {
    if (!video) return "";

    return getMediaUrl(video);
  };

  const selectedImage =
    images[selectedImageIndex];

  const selectedImageUrl =
    getImageUrl(selectedImage);

  const videoUrl = getVideoUrl();

  const showPreviousImage = () => {
    if (images.length <= 1) return;

    setSelectedImageIndex((previous) =>
      previous === 0
        ? images.length - 1
        : previous - 1
    );
  };

  const showNextImage = () => {
    if (images.length <= 1) return;

    setSelectedImageIndex((previous) =>
      previous === images.length - 1
        ? 0
        : previous + 1
    );
  };

  if (images.length === 0 && !videoUrl) {
    return (
      <section className="mt-8 rounded-2xl border border-[#E5D5BC]/40 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#C4943E]">
            Media
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-[#1A1A1A]">
            Property Gallery
          </h2>
        </div>

        <div className="flex min-h-56 items-center justify-center rounded-xl border border-dashed border-[#E5D5BC] bg-[#F8F5F0] px-5 text-center">
          <div>
            <Images
              size={40}
              className="mx-auto text-[#C4943E]"
            />

            <p className="mt-3 font-medium text-[#2C2416]/70">
              Media will be added soon.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8 rounded-2xl border border-[#E5D5BC]/40 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#C4943E]">
            Media
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-[#1A1A1A]">
            Property Gallery
          </h2>
        </div>

        {images.length > 0 && (
          <p className="text-sm text-[#2C2416]/60">
            {selectedImageIndex + 1} / {images.length}{" "}
            {images.length === 1
              ? "photo"
              : "photos"}
          </p>
        )}
      </div>

      {images.length > 0 && (
        <>
          <div className="relative overflow-hidden rounded-2xl bg-[#F3EFE8]">
            <img
              src={selectedImageUrl}
              alt={`${property.title} - ${
                selectedImageIndex + 1
              }`}
              onError={(event) => {
                event.currentTarget.src =
                  FALLBACK_IMAGE;
              }}
              className="h-72 w-full object-cover transition duration-500 sm:h-[520px]"
            />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/50 to-transparent" />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPreviousImage}
                  aria-label="Previous property image"
                  className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-[#C4943E] hover:text-[#1A1A1A]"
                >
                  <ChevronLeft size={22} />
                </button>

                <button
                  type="button"
                  onClick={showNextImage}
                  aria-label="Next property image"
                  className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-[#C4943E] hover:text-[#1A1A1A]"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-4 rounded-lg bg-black/70 px-3 py-2 text-sm font-semibold text-white backdrop-blur">
              {selectedImageIndex + 1} of{" "}
              {images.length}
            </div>
          </div>

          {images.length > 1 && (
            <div className="mt-5 flex gap-3 overflow-x-auto pb-2">
              {images.map((image, index) => {
                const imageUrl =
                  getImageUrl(image);

                return (
                  <button
                    type="button"
                    key={`${imageUrl}-${index}`}
                    onClick={() =>
                      setSelectedImageIndex(index)
                    }
                    className={`h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                      selectedImageIndex === index
                        ? "border-[#C4943E] shadow-md"
                        : "border-transparent opacity-70 hover:border-[#E5D5BC] hover:opacity-100"
                    }`}
                    aria-label={`View image ${
                      index + 1
                    }`}
                  >
                    <img
                      src={imageUrl}
                      alt={`${property.title} thumbnail ${
                        index + 1
                      }`}
                      onError={(event) => {
                        event.currentTarget.src =
                          FALLBACK_IMAGE;
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
        <div
          className={
            images.length > 0 ? "mt-10" : ""
          }
        >
          <div className="mb-4 flex items-center gap-2">
            <PlayCircle
              size={21}
              className="text-[#C4943E]"
            />

            <h3 className="text-lg font-semibold text-[#1A1A1A]">
              Property Video
            </h3>
          </div>

          <video
            controls
            preload="metadata"
            className="w-full rounded-2xl bg-black"
          >
            <source src={videoUrl} />

            Your browser does not support video
            playback.
          </video>
        </div>
      )}
    </section>
  );
}

export default PropertyMedia;