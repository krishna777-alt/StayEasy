import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotels: [],
  maxPrice: 10000,
  selectedRatings: [],
  selectedTypes: [],
  selectedAmenities: [],
  selectedGuestRatings: [],
  selectedLocations: [],
  sortOption: "recommended",
};

const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    setHotels: (state, action) => {
      state.hotels = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    setSelectedRatings: (state, action) => {
      state.selectedRatings = action.payload;
    },
    setSelectedTypes: (state, action) => {
      state.selectedTypes = action.payload;
    },
    setSelectedAmenities: (state, action) => {
      state.selectedAmenities = action.payload;
    },
    setSelectedGuestRatings: (state, action) => {
      state.selectedGuestRatings = action.payload;
    },
    setSelectedLocations: (state, action) => {
      state.selectedLocations = action.payload;
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },
    toggleWishlist: (state, action) => {
      const hotel = state.hotels.find(({ id }) => id === action.payload);
      if (hotel) {
        hotel.isWishlisted = !hotel.isWishlisted;
      }
    },
    resetFilters: (state) => {
      state.maxPrice = 10000;
      state.selectedRatings = [];
      state.selectedTypes = [];
      state.selectedAmenities = [];
      state.selectedGuestRatings = [];
      state.selectedLocations = [];
    },
  },
});

const selectHotelState = (state) => state.hotel;
export const selectHotels = (state) => selectHotelState(state).hotels;
export const selectHotelFilters = (state) => selectHotelState(state);

export const selectFilteredHotels = createSelector(
  [selectHotelState],
  ({
    hotels,
    maxPrice,
    selectedRatings,
    selectedTypes,
    selectedAmenities,
    selectedGuestRatings,
    selectedLocations,
    sortOption,
  }) =>
    hotels
      .filter((hotel) => {
        if (hotel.pricePerNight > maxPrice) return false;

        if (
          selectedRatings.length > 0 &&
          !selectedRatings.some((rating) => {
            if (rating === "5 stars") return hotel.rating >= 4.5;
            if (rating === "4 stars")
              return hotel.rating >= 4.0 && hotel.rating < 4.5;
            if (rating === "3 stars") return hotel.rating < 4.0;
            return false;
          })
        ) {
          return false;
        }

        if (
          selectedTypes.length > 0 &&
          !selectedTypes.includes(hotel.propertyType)
        ) {
          return false;
        }

        if (
          selectedAmenities.length > 0 &&
          !selectedAmenities.every((amenity) => hotel.amenities.includes(amenity))
        ) {
          return false;
        }

        if (
          selectedGuestRatings.length > 0 &&
          !selectedGuestRatings.includes(hotel.guestRatingText)
        ) {
          return false;
        }

        if (
          selectedLocations.length > 0 &&
          !selectedLocations.includes(hotel.location)
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortOption === "price-low")
          return a.pricePerNight - b.pricePerNight;
        if (sortOption === "price-high")
          return b.pricePerNight - a.pricePerNight;
        if (sortOption === "rating-high") return b.rating - a.rating;
        return 0;
      }),
);

export const {
  setHotels,
  setMaxPrice,
  setSelectedRatings,
  setSelectedTypes,
  setSelectedAmenities,
  setSelectedGuestRatings,
  setSelectedLocations,
  setSortOption,
  toggleWishlist,
  resetFilters,
} = hotelSlice.actions;

export default hotelSlice.reducer;