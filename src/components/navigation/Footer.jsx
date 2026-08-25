import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube } from "react-icons/fa";

import sukhneerLogo from "../../assets/logo/Sukhneer-logo.png";

function Footer() {
  return (
    <footer className="border-t border-[#E5D5BC]/20 bg-[#1A1A1A] text-[#E5D5BC]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 py-7 sm:flex-row sm:px-8">
        
        {/* Logo */}
        <Link
          to="/"
          className="transition duration-200 hover:opacity-80"
        >
          <img
            src={sukhneerLogo}
            alt="Sukhneer"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Copyright */}
        <p className="text-center text-sm text-[#E5D5BC]/70">
          © {new Date().getFullYear()} Sukhneer. All rights reserved.
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          <a
            href="https://www.facebook.com/sukhneer"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Sukhneer on Facebook"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E5D5BC]/30 text-[#E5D5BC] transition hover:border-[#C4943E] hover:bg-[#C4943E] hover:text-[#1A1A1A]"
          >
            <FaFacebookF size={18} />
          </a>

          <a
            href="https://www.youtube.com/channel/UCVycmDyGyULOAL6iPOStCiQ"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Sukhneer on YouTube"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E5D5BC]/30 text-[#E5D5BC] transition hover:border-[#C4943E] hover:bg-[#C4943E] hover:text-[#1A1A1A]"
          >
            <FaYoutube size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;