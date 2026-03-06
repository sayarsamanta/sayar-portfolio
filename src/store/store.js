import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user/UserSlice";
import aboutReducer from "./slices/about/aboutSlice";
import projectReducer from "./slices/projects/projectSlice";
import experienceReducer from "./slices/experience/expSlice";
export const store = configureStore({
  reducer: {
    // Add your reducers here
    about: aboutReducer,
    projects: projectReducer,
    experience: experienceReducer,
  },
});

export default store;
