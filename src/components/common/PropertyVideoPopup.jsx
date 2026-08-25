import { useEffect, useRef, useState } from "react";
import {
  Pause,
  Play,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

const VIDEO_ID = "XIBxysTurIs";
function PropertyVideoPopup() {
  const [showVideo, setShowVideo] = useState(true);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [videoMuted, setVideoMuted] = useState(true);

  const iframeRef = useRef(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    const command = videoPlaying ? "playVideo" : "pauseVideo";

    iframeRef.current.contentWindow?.postMessage(
      JSON.stringify({
        event: "command",
        func: command,
        args: [],
      }),
      "*",
    );
  }, [videoPlaying]);

  useEffect(() => {
    if (!iframeRef.current) return;

    iframeRef.current.contentWindow?.postMessage(
      JSON.stringify({
        event: "command",
        func: videoMuted ? "mute" : "unMute",
        args: [],
      }),
      "*",
    );
  }, [videoMuted]);

  if (!showVideo) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 w-[320px] overflow-hidden rounded-xl border border-[#E5D5BC] bg-[#1A1A1A] shadow-2xl sm:w-[380px]">
      
      {/* Close Button */}
      <button
        type="button"
        onClick={() => setShowVideo(false)}
        className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur transition hover:bg-[#C4943E] hover:text-[#1A1A1A]"
        aria-label="Close video"
      >
        <X size={18} />
      </button>

      {/* Video */}
      <div className="relative aspect-video bg-black">
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${VIDEO_ID}?enablejsapi=1&autoplay=1&mute=1&controls=0&loop=1&playlist=${VIDEO_ID}&rel=0`}
          title="Sukhneer Property Showcase"
          className="h-full w-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-white">
            Explore Sukhneer Properties
          </p>

          <p className="mt-1 text-xs text-[#E5D5BC]">
            Discover more properties with us
          </p>
        </div>

        <div className="flex gap-2">
          {/* Play / Pause */}
          <button
            type="button"
            onClick={() => setVideoPlaying((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2C2416] text-[#C4943E] transition hover:bg-[#C4943E] hover:text-[#1A1A1A]"
            aria-label="Play or pause video"
          >
            {videoPlaying ? (
              <Pause size={17} />
            ) : (
              <Play size={17} />
            )}
          </button>

          {/* Mute / Unmute */}
          <button
            type="button"
            onClick={() => setVideoMuted((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2C2416] text-[#C4943E] transition hover:bg-[#C4943E] hover:text-[#1A1A1A]"
            aria-label="Mute or unmute video"
          >
            {videoMuted ? (
              <VolumeX size={17} />
            ) : (
              <Volume2 size={17} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropertyVideoPopup;