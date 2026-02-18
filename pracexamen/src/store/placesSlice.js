import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  places: [],
  favorites: [],
  loading: false,
  error: null
};

const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {

    setPlaces: (state, action) => {
      state.places = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    addFavorite: (state, action) => {
      if (state.favorites.length < 5) {
        const exists = state.favorites.find(
          item => item.name === action.payload.name
        );

        if (!exists) {
          state.favorites.push(action.payload);
        }
      }
    },

    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        item => item.name !== action.payload.name
      );
    },

    clearFavorites: (state) => {
      state.favorites = [];
    }
  }
});

export const {
  setPlaces,
  setLoading,
  setError,
  addFavorite,
  removeFavorite,
  clearFavorites
} = placesSlice.actions;

export default placesSlice.reducer;