import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Hero from "../components/properties/Hero";
import FilterBar from "../components/properties/FilterBar";
import Stats from "../components/properties/Stats";
import PropertyGrid from "../components/properties/PropertyGrid";
import LoadMore from "../components/properties/LoadMore";

import { getAllProperties } from "../services/propertyService";

const ITEMS_PER_PAGE = 12;

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [city, setCity] = useState("All");
  const [sort, setSort] = useState("Newest");

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);

      const data = await getAllProperties();

      setProperties(data);
      setFilteredProperties(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let updated = [...properties];

    // Search
    if (search.trim()) {
      updated = updated.filter((property) =>
        property.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category
    if (category !== "All") {
      updated = updated.filter(
        (property) => property.category === category
      );
    }

    // City
    if (city !== "All") {
      updated = updated.filter(
        (property) => property.city === city
      );
    }

    // Sorting
    switch (sort) {
      case "Price Low":
        updated.sort((a, b) => a.price - b.price);
        break;

      case "Price High":
        updated.sort((a, b) => b.price - a.price);
        break;

      case "Newest":
      default:
        updated.reverse();
        break;
    }

    setFilteredProperties(updated);
    setVisibleCount(ITEMS_PER_PAGE);
  }, [search, category, city, sort, properties]);

  const stats = useMemo(() => {
    return {
      total: properties.length,
      cities: [...new Set(properties.map((p) => p.city))].length,
      categories: [...new Set(properties.map((p) => p.category))].length,
      featured: properties.filter((p) => p.featured).length,
    };
  }, [properties]);

  return (
    <>
      <Navbar />

      <main className="bg-slate-50 min-h-screen">

        <Hero />

        <FilterBar
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          city={city}
          setCity={setCity}
          sort={sort}
          setSort={setSort}
          properties={properties}
        />

        <Stats stats={stats} />

        <PropertyGrid
          loading={loading}
          properties={filteredProperties.slice(0, visibleCount)}
        />

        {visibleCount < filteredProperties.length && (
          <LoadMore
            onClick={() =>
              setVisibleCount((prev) => prev + ITEMS_PER_PAGE)
            }
          />
        )}

      </main>

      <Footer />
    </>
  );
};

export default Properties;