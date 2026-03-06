import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: "user_001",
    name: "Sayar Samanta",
    username: "sayar123",
    email: "sayar@example.com",
    role: "admin",

    profileImg:
      "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/linkedin-profile-picture-maker/dummy_image/thumb/004.webp",

    bio: "Fullstack Developer & Content Creator",

    quote: "Code is like humor. When you have to explain it, it’s bad.",

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

    settings: {
      theme: "light",
      notifications: true,
    },
    about: {
      intro: {
        headline: "Fullstack Developer Crafting Modern Web Experiences",
        subText:
          "Passionate about building scalable, performant, and visually appealing applications.",
        story:
          "I started my journey focusing on frontend development and gradually expanded into backend systems and scalable architecture. I enjoy solving complex problems with clean and maintainable solutions.",
      },
  
      skills: [
        {
          id: "skill_001",
          name: "React",
          percentage: 90,
          type: "frontend",
        },
        {
          id: "skill_002",
          name: "Tailwind CSS",
          percentage: 85,
          type: "frontend",
        },
        {
          id: "skill_003",
          name: "Node.js",
          percentage: 88,
          type: "backend",
        },
        {
          id: "skill_004",
          name: "MongoDB",
          percentage: 80,
          type: "backend",
        },
      ],
  
      featuredProjects: [
        {
          id: "fp_001",
          title: "DevTinder",
          description:
            "A developer matchmaking platform with premium subscriptions and real-time chat.",
          image: "https://picsum.photos/600/400?random=10",
          tech: ["React", "Node.js", "MongoDB", "Redux Toolkit"],
          liveLink: "https://example.com",
          githubLink: "https://github.com/example",
        },
        {
          id: "fp_002",
          title: "Premium Portfolio",
          description:
            "Animated personal portfolio with admin dashboard and dynamic content management.",
          image: "https://picsum.photos/600/400?random=11",
          tech: ["React", "Framer Motion", "Node.js"],
          liveLink: "https://example.com",
          githubLink: "https://github.com/example",
        },
      ],
  
      achievements: [
        {
          id: "ach_001",
          title: "Top Performer Award",
          issuer: "TechCorp",
          year: "2024",
          description:
            "Recognized for delivering high-performance scalable frontend architecture.",
          icon: "Trophy",
        },
        {
          id: "ach_002",
          title: "1000+ Users Served",
          issuer: "Personal SaaS Project",
          year: "2025",
          description:
            "Built and launched a SaaS product serving over 1000 active users.",
          icon: "Rocket",
        },
      ],
  
      education: [
        {
          id: "edu_001",
          degree: "B.Tech in Computer Science",
          institution: "XYZ University",
          location: "Kolkata, India",
          duration: "2018 – 2022",
          grade: "8.5 CGPA",
          description:
            "Specialized in Software Engineering, Data Structures, and Web Technologies.",
          logo: "https://picsum.photos/100/100?random=20",
        },
        {
          id: "edu_002",
          degree: "Higher Secondary (Science)",
          institution: "ABC School",
          location: "West Bengal, India",
          duration: "2016 – 2018",
          grade: "85%",
          description:
            "Focused on Mathematics, Physics, and Computer Science fundamentals.",
          logo: "https://picsum.photos/100/100?random=21",
        },
      ],
  
      personalInterests: [
        "Photography",
        "Automobile Road Trips",
        "Exploring New Technologies",
        "UI/UX Design Trends",
      ],
    },
  },


};

const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    setAboutData(state, action) {
      state.data = action.payload;
    },
    clearAboutData(state) {
      state.data = null;
    },
    updateIntro(state, action) {
      state.intro = { ...state.intro, ...action.payload };
    },
    // Generic array update helper
    updateArrayById(state, action) {
      const { arrayName, items } = action.payload; // e.g., { arrayName: "skills", items: [{id, ...}] }
      if (!Array.isArray(state[arrayName])) return;

      items.forEach((newItem) => {
        const index = state[arrayName].findIndex(
          (item) => item.id === newItem.id
        );
        if (index !== -1) {
          // Update existing item
          state[arrayName][index] = { ...state[arrayName][index], ...newItem };
        } else {
          // Add new item
          state[arrayName].push(newItem);
        }
      });
    },
    removeArrayItemsById(state, action) {
      const { arrayName, ids } = action.payload; // e.g., { arrayName: "skills", ids: ["skill_001"] }
      if (!Array.isArray(state[arrayName])) return;
      state[arrayName] = state[arrayName].filter(
        (item) => !ids.includes(item.id)
      );
    },
    updatePersonalInterests(state, action) {
      const { add, remove } = action.payload; // { add: [], remove: [] }
      if (add) {
        state.personalInterests = Array.from(
          new Set([...state.personalInterests, ...add])
        );
      }
      if (remove) {
        state.personalInterests = state.personalInterests.filter(
          (i) => !remove.includes(i)
        );
      }
    },
  },
});

export const {
  setAboutData,
  clearAboutData,
  updateArrayById,
  updateIntro,
  updatePersonalInterests,
} = aboutSlice.actions;
export default aboutSlice.reducer;
