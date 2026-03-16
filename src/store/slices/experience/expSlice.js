import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  exp: [],
};

const expSlice = createSlice({
  name: "experience",
  initialState,
  reducers: {
    setExperience(state, action) {
      state.exp = action.payload;
    },
    addExperience(state, action) {
      state.exp.push(action.payload);
    },
    updateExperience(state, action) {
      const { id, updatedData } = action.payload;
      const exp = state.exp.find((e) => e._id === id);
      if (exp) {
        Object.assign(exp, updatedData);
      }
    },
    deleteExperience(state, action) {
      state.exp = state.exp.filter((e) => e.slug !== action.payload);
    },
  },
});

export const { setExperience, addExperience, updateExperience, deleteExperience } =
  expSlice.actions;
export default expSlice.reducer;
