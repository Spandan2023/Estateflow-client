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
      <Route path="/" element={<Landing />} />

      {/* Property Listing */}
      <Route
        path="/properties"
        element={<PublicProperties />}
      />

      {/* Individual Property Details */}
      <Route
        path="/properties/:id"
        element={<PropertyDetails />}
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