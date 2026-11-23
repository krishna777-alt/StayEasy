import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { api } from "../../api/axios";
import SearchBar from "../componets/Hotel/SearchBar";
import Heading from "../componets/Hotel/Heading";
import Filters from "../componets/Hotel/Filters";
import HotelCards from "../componets/Hotel/HotelCards";
import {
  resetFilters,
  selectFilteredHotels,
  selectHotelFilters,
  selectHotels,
  setHotels,
  setMaxPrice,
  setSelectedAmenities,
  setSelectedGuestRatings,
  setSelectedLocations,
  setSelectedRatings,
  setSelectedTypes,
  setSortOption,
  toggleWishlist,
} from "../../features/hotel/hotelSlice";

function toHotelCard(hotel) {
  const rating = Number(hotel.rating) || 0;

  return {
    id: String(hotel._id),
    name: hotel.name,
    tagline: hotel.tagline,
    description: hotel.description,
    propertyType: hotel.propertyType || "Hotel",
    locationAddress: hotel.location,
    location: hotel.location || "",
    rating,
    guestRatingText:
      rating >= 4.5
        ? "Excellent"
        : rating >= 4
          ? "Very good"
          : rating > 0
            ? "Good"
            : "New",
    reviewsCount: Number(hotel.reviewsCount) || 0,
    pricePerNight: Number(hotel.priceFrom) || 0,
    isWishlisted: false,
    image: Array.isArray(hotel.images)
      ? (hotel.images.find(
          (image) => typeof image === "string" && image.trim(),
        ) ?? "")
      : "",
    amenities: Array.isArray(hotel.amenities)
      ? hotel.amenities
          .map((amenity) =>
            typeof amenity === "string" ? amenity : amenity?.title,
          )
          .filter((amenity) => typeof amenity === "string" && amenity.length)
      : [],
  };
}

function Hotel() {
  const dispatch = useDispatch();
  const {
    maxPrice,
    selectedRatings,
    selectedTypes,
    selectedAmenities,
    selectedGuestRatings,
    selectedLocations,
    sortOption,
  } = useSelector(selectHotelFilters);
  const hotels = useSelector(selectHotels);
  const filteredHotels = useSelector(selectFilteredHotels);
  const propertyTypes = [...new Set(hotels.map((hotel) => hotel.propertyType))];
  const amenities = [
    ...new Set(hotels.flatMap((hotel) => hotel.amenities)),
  ];
  const guestRatings = [
    ...new Set(hotels.map((hotel) => hotel.guestRatingText)),
  ];
  const locations = [
    ...new Set(hotels.map((hotel) => hotel.location).filter(Boolean)),
  ];
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  // Search State
  const [searchLocation, setSearchLocation] = useState("");
  const [appliedSearchLocation, setAppliedSearchLocation] = useState("");
  const [checkInDate, setCheckInDate] = useState("2026-12-01");
  const [checkOutDate, setCheckOutDate] = useState("2026-12-07");
  const [guestCount, setGuestCount] = useState("2 Guests, 1 Room");

  useEffect(() => {
    const controller = new AbortController();

    async function loadHotels() {
      setIsLoading(true);
      setLoadError("");

      try {
        const { data } = await api.get("/hotels/display_hotels", {
          signal: controller.signal,
        });

        if (!Array.isArray(data?.hotels)) {
          throw new Error(data?.message || "The hotel response was invalid.");
        }

        dispatch(setHotels(data.hotels.map(toHotelCard)));
      } catch (error) {
        if (!controller.signal.aborted) {
          dispatch(setHotels([]));
          setLoadError(
            error.response?.data?.message ||
              error.message ||
              "Unable to load hotels.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadHotels();

    return () => controller.abort();
  }, [dispatch, retryCount]);

  const handleCheckboxChange = (selection, setSelection, value) => {
    const updatedSelection = selection.includes(value)
      ? selection.filter((item) => item !== value)
      : [...selection, value];
    dispatch(setSelection(updatedSelection));
  };

  const searchTerm = appliedSearchLocation.toLowerCase();
  const searchedHotels = searchTerm
    ? filteredHotels.filter((hotel) =>
        [hotel.name, hotel.locationAddress, hotel.tagline, hotel.description]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(searchTerm)),
      )
    : filteredHotels;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans pb-16">
      {/* ------------------------------------------------------------------ */}
      {/* 1. TOP SEARCH BAR HEADER                                           */}
      {/* ------------------------------------------------------------------ */}
      <SearchBar
        searchLocation={searchLocation}
        setCheckInDate={setCheckInDate}
        setSearchLocation={setSearchLocation}
        setCheckOutDate={setCheckOutDate}
        setGuestCount={setGuestCount}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        guestCount={guestCount}
        onSearch={() => setAppliedSearchLocation(searchLocation.trim())}
      />

      {/* ------------------------------------------------------------------ */}
      {/* 2. BREADCRUMBS & HEADING                                           */}
      {/* ------------------------------------------------------------------ */}
      <Heading
        searchLocation={searchLocation}
        filteredHotels={searchedHotels}
      />

      {/* ------------------------------------------------------------------ */}
      {/* 3. MAIN CONTENT: SIDEBAR FILTERS + HOTELS LIST                     */}
      {/* ------------------------------------------------------------------ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* ================================================================ */}
        {/* LEFT FILTER SIDEBAR                                              */}
        {/* ================================================================ */}
        <Filters
          setMaxPrice={(value) => dispatch(setMaxPrice(value))}
          setSelectedRatings={(value) => dispatch(setSelectedRatings(value))}
          setSelectedTypes={(value) => dispatch(setSelectedTypes(value))}
          setSelectedAmenities={(value) =>
            dispatch(setSelectedAmenities(value))
          }
          setSelectedGuestRatings={(value) =>
            dispatch(setSelectedGuestRatings(value))
          }
          setSelectedLocations={(value) =>
            dispatch(setSelectedLocations(value))
          }
          onResetFilters={() => dispatch(resetFilters())}
          maxPrice={maxPrice}
          selectedRatings={selectedRatings}
          handleCheckboxChange={handleCheckboxChange}
          selectedTypes={selectedTypes}
          selectedAmenities={selectedAmenities}
          selectedGuestRatings={selectedGuestRatings}
          selectedLocations={selectedLocations}
          propertyTypes={propertyTypes}
          amenityOptions={amenities}
          guestRatingOptions={guestRatings}
          locationOptions={locations}
        />

        {/* ================================================================ */}
        {/* RIGHT HOTEL CARDS CONTAINER                                      */}
        {/* ================================================================ */}
        <HotelCards
          setSortOption={(value) => dispatch(setSortOption(value))}
          sortOption={sortOption}
          filteredHotels={searchedHotels}
          toggleWishlist={(id) => dispatch(toggleWishlist(id))}
          isLoading={isLoading}
          error={loadError}
          onRetry={() => setRetryCount((count) => count + 1)}
        />
      </div>
    </div>
  );
}
export default Hotel;
