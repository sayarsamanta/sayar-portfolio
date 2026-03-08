import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  exp: [
    // {
    //   id: 1,
    //   role: "Full Stack Developer",
    //   company: "TechCorp Inc.",
    //   duration: "Jan 2023 - Present",
    //   description:
    //     "Built scalable end-to-end web applications using React, Node.js, and MongoDB. Led a team of 3 developers and improved deployment performance by 35% through optimized CI/CD pipelines.",
    //   tech: ["React", "Node.js", "MongoDB", "Tailwind", "Framer Motion"],
    // },
    // {
    //   id: 2,
    //   role: "Frontend Developer",
    //   company: "Designify Labs",
    //   duration: "Jun 2021 - Dec 2022",
    //   description:
    //     "Developed high-performance UI systems, reusable component libraries, and smooth animations. Improved Lighthouse performance scores from 72 to 95+.",
    //   tech: ["React", "Tailwind", "Framer Motion", "GSAP"],
    // },
    // {
    //   id: 3,
    //   role: "Intern - Web Developer",
    //   company: "Startup Hub",
    //   duration: "Jan 2021 - May 2021",
    //   description:
    //     "Built landing pages and implemented authentication flows. Contributed to backend APIs and assisted in database schema design.",
    //   tech: ["React", "Node.js", "Express", "MongoDB"],
    // },
    // {
    //   id: 4,
    //   role: "Freelance Full Stack Developer",
    //   company: "Self-Employed",
    //   duration: "2022 - Present",
    //   description:
    //     "Delivered custom web solutions for small businesses including portfolio sites, admin dashboards, and subscription-based platforms with payment integration.",
    //   tech: ["Next.js", "Razorpay", "Firebase", "Tailwind", "Vercel"],
    // },
    // {
    //   id: 5,
    //   role: "Frontend Engineer (Contract)",
    //   company: "SaaSify Solutions",
    //   duration: "Mar 2022 - Aug 2022",
    //   description:
    //     "Worked on a SaaS analytics dashboard, implementing complex data visualizations and improving UI responsiveness across devices.",
    //   tech: ["React", "TypeScript", "Recharts", "Redux Toolkit", "Material UI"],
    // },
    // {
    //   id: 6,
    //   role: "Open Source Contributor",
    //   company: "GitHub Community",
    //   duration: "2021 - Present",
    //   description:
    //     "Contributed to open-source projects by fixing UI bugs, improving documentation, and adding reusable components.",
    //   tech: ["JavaScript", "TypeScript", "Git", "React"],
    // },
  ],
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
      const exp = state.exp.find((e) => e.id === id);
      if (exp) {
        Object.assign(exp, updatedData);
      }
    },
    deleteExperience(state, action) {
      state.exp = state.exp.filter((e) => e.id !== action.payload);
    },
  },
});

export const { setExperience, addExperience, updateExperience, deleteExperience } =
  expSlice.actions;
export default expSlice.reducer;
