import { useEffect, useMemo, useState } from "react";

import Footer from "../components/navigation/Footer";
import Hero from "../components/properties/Hero";
import FilterBar from "../components/properties/FilterBar";
import Stats from "../components/properties/Stats";
import PropertyGrid from "../components/properties/PropertyGrid";
import LoadMore from "../components/properties/LoadMore";

import PropertyVideoPopup from "../components/common/PropertyVideoPopup";

import { getPublicProperties } from "../services/propertyService";

const ITEMS_PER_PAGE = 12;

const Properties = () => {

  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [city, setCity] = useState("All");
  const [sort, setSort] = useState("Newest");

  const [visibleCount, setVisibleCount] =
    useState(ITEMS_PER_PAGE);


  useEffect(() => {
    fetchProperties();
  }, []);


  const fetchProperties = async () => {

    try {

      setLoading(true);

      const response =
        await getPublicProperties();

      setProperties(
        response.properties || [],
      );

      setFilteredProperties(
        response.properties || [],
      );

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
        property.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase(),
          ),
      );

    }


    // Category
    if (category !== "All") {

      updated = updated.filter(
        (property) =>
          property.category === category,
      );

    }


    // City
    if (city !== "All") {

      updated = updated.filter(
        (property) =>
          property.city === city,
      );

    }


    // Sorting
    switch (sort) {

      case "Price Low":

        updated.sort(
          (a, b) =>
            Number(a.price || 0) -
            Number(b.price || 0),
        );

        break;


      case "Price High":

        updated.sort(
          (a, b) =>
            Number(b.price || 0) -
            Number(a.price || 0),
        );

        break;


      case "Newest":
      default:

        updated.sort(
          (a, b) =>
            new Date(b.createdAt || 0) -
            new Date(a.createdAt || 0),
        );

        break;

    }


    setFilteredProperties(updated);

    setVisibleCount(ITEMS_PER_PAGE);

  }, [
    search,
    category,
    city,
    sort,
    properties,
  ]);


  const stats = useMemo(() => {

    return {

      total: properties.length,

      cities: [
        ...new Set(
          properties
            .map((p) => p.city)
            .filter(Boolean),
        ),
      ].length,

      categories: [
        ...new Set(
          properties
            .map((p) => p.category)
            .filter(Boolean),
        ),
      ].length,

      featured: properties.filter(
        (p) => p.isFeatured,
      ).length,

    };

  }, [properties]);


  return (
    <>

      <main className="min-h-screen bg-[#F9F8F6]">

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
          properties={filteredProperties.slice(
            0,
            visibleCount,
          )}
        />

        {visibleCount <
          filteredProperties.length && (

          <LoadMore
            onClick={() =>
              setVisibleCount(
                (prev) =>
                  prev + ITEMS_PER_PAGE,
              )
            }
          />

        )}

      </main>

      <PropertyVideoPopup />

      <Footer />

    </>
  );
};

export default Properties;