import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: "user_001",
    name: "Sayar Samanta",
    username: "sayar123",
    email: "sayar@example.com",
    role: "admin", // or "user"
    profileImg:
      "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/linkedin-profile-picture-maker/dummy_image/thumb/004.webp",
    bio: "Fullstack Developer & Content Creator",
    brief:
      "I help clients build modern, scalable web applications using React, Node.js, and MongoDB. Passionate about UI/UX, clean code, and performance optimization.",
    qoute: "Code is like humor. When you have to explain it, it’s bad.",
    social: {
      github: "https://github.com/sayar123",
      linkedin: "https://linkedin.com/in/sayar123",
      twitter: "https://twitter.com/sayar123",
      portfolio: "https://sayar.dev",
    },
    stats: {
      projects: 12,
      experienceYears: 5,
      clients: 20,
    },
    skills: ["React", "Node.js", "MongoDB", "Tailwind CSS", "Redux Toolkit"],
    settings: {
      theme: "light",
      notifications: true,
    },
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
    updateUser(state, action) {
      const updatedData = action.payload;

      // Top-level fields
      if (updatedData.name) state.user.name = updatedData.name;
      if (updatedData.email) state.user.email = updatedData.email;
      if (updatedData.profileImg)
        state.user.profileImg = updatedData.profileImg;
      if (updatedData.bio) state.user.bio = updatedData.bio;
      if (updatedData.brief) state.user.brief = updatedData.brief;
      if (updatedData.qoute) state.user.qoute = updatedData.qoute;

      // Nested objects
      if (updatedData.social) {
        state.user.social = { ...state.user.social, ...updatedData.social };
      }
      if (updatedData.stats) {
        state.user.stats = { ...state.user.stats, ...updatedData.stats };
      }
      if (updatedData.settings) {
        state.user.settings = {
          ...state.user.settings,
          ...updatedData.settings,
        };
      }

      // Arrays (merge instead of replace)
      if (updatedData.skills) {
        const newSkills = updatedData.skills.filter(
          (skill) => !state.user.skills.includes(skill)
        );
        state.user.skills = [...state.user.skills, ...newSkills];
      }
    },
    removeSkills(state, action) {
      const skillsToRemove = action.payload; // e.g., ["Node.js"]
      state.user.skills = state.user.skills.filter(
        (skill) => !skillsToRemove.includes(skill)
      );
    },
  },
});

export const { setUser, clearUser, updateUser, removeSkills } =
  userSlice.actions;
export default userSlice.reducer;
