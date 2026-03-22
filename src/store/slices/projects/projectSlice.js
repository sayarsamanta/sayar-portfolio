import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
};
const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects(state, action) {
      state.projects = action.payload;
    },
    addProject(state, action) {
      state.projects.unshift(action.payload);
    },
    editProjects(state, action) {
      const { id, updatedData } = action.payload;
      const projects = state.projects.find((p) => p._id === id);

      if (projects) {
        Object.assign(projects, updatedData);
      }
      state.projects.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    },
    deleteProjects(state, action) {
      state.projects = state.projects.filter((project) => project.slug !== action.payload);
    },
  },
});

export const { setProjects, editProjects, deleteProjects, addProject } = projectSlice.actions;
export default projectSlice.reducer;
