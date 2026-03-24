import { configureStore } from "@reduxjs/toolkit";
import aboutReducer from "./slices/about/aboutSlice";
import experienceReducer from "./slices/experience/expSlice";
import projectReducer from "./slices/projects/projectSlice";
export const store = configureStore({
  reducer: {
    
    about: aboutReducer,
    projects: projectReducer,
    experience: experienceReducer,
  },
});

export default store;
