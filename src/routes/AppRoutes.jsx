import { Route, Routes } from "react-router-dom";

import Landing from "../pages/Landing";
import PublicProperties from "../pages/Properties";
import PropertyDetails from "../pages/PropertyDetails";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      {/* ================= PUBLIC WEBSITE ================= */}

      {/* Landing Page */}
      <Route path="/" element={<NotFound />} />

      {/* Property Listing */}
      <Route
        path="/properties"
        element={<NotFound />}
      />

      {/* Individual Property Details */}
      <Route
        path="/properties/:id"
        element={<NotFound />}
      />

      {/* ================= 404 ================= */}

      {/* Everything else */}
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}

export default AppRoutes;