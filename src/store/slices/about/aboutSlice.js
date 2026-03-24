import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  user: null,
};

const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    setAboutData(state, action) {
      state.data = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    clearAboutData(state) {
      state.data = null;
      state.user = null;
    },
    updateIntro(state, action) {
      if (!state.data) state.data = {};
      state.data.intro = { ...state.data.intro, ...action.payload };
    },
    updateArrayById(state, action) {
      const { arrayName, items } = action.payload;
      if (!state.data || !Array.isArray(state.data[arrayName])) return;

      items.forEach((newItem) => {
        const index = state.data[arrayName].findIndex((item) => item.id === newItem.id);
        if (index !== -1) {
          state.data[arrayName][index] = { ...state.data[arrayName][index], ...newItem };
        } else {
          state.data[arrayName].push(newItem);
        }
      });
    },
    removeArrayItemsById(state, action) {
      const { arrayName, ids } = action.payload;
      if (!state.data || !Array.isArray(state.data[arrayName])) return;
      state.data[arrayName] = state.data[arrayName].filter((item) => !ids.includes(item.id));
    },
    updatePersonalInterests(state, action) {
      if (!state.data) state.data = {};
      const { add, remove } = action.payload;
      if (!state.data.personalInterests) state.data.personalInterests = [];

      if (add) {
        state.data.personalInterests = Array.from(
          new Set([...state.data.personalInterests, ...add])
        );
      }
      if (remove) {
        state.data.personalInterests = state.data.personalInterests.filter(
          (i) => !remove.includes(i)
        );
      }
    },
  },
});

export const {
  setAboutData,
  setUser,
  clearAboutData,
  updateArrayById,
  updateIntro,
  updatePersonalInterests,
  removeArrayItemsById,
} = aboutSlice.actions;

export default aboutSlice.reducer;
