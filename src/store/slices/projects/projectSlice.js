import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [
    // {
    //   id: 1,
    //   name: "DevTinder",
    //   type: "Fullstack",
    //   description:
    //     "A developer networking platform designed to help engineers find collaboration partners and build meaningful tech connections.",
    //   role: "Full Stack Developer",
    //   duration: "Jan 2025 – Mar 2025",
    //   status: "Live",
    //   team: "Solo",
    //   year: "2025",
    //   github: "https://github.com/yourusername/devtinder",
    //   live: "https://devtinder.live",
    //   problem:
    //     "Developers struggle to find reliable collaboration partners for side projects and hackathons.",
    //   solution:
    //     "Built a swipe-based developer matching platform with real-time features and premium subscriptions.",
    //   features: [
    //     "JWT Authentication & Protected Routes",
    //     "Swipe-based Matching System",
    //     "Real-time Notifications",
    //     "Premium Subscription via Razorpay",
    //     "Profile Customization",
    //   ],
    //   tech: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    //   screenshots: [
    //     "https://picsum.photos/800/500?random=1",
    //     "https://picsum.photos/800/500?random=2",
    //   ],
    // },
    // {
    //   id: 2,
    //   name: "SaaSify",
    //   type: "Fullstack",
    //   description:
    //     "A modern SaaS boilerplate with authentication, subscription billing, and analytics dashboard.",
    //   role: "Frontend Heavy Full Stack Developer",
    //   duration: "Apr 2025 – Jun 2025",
    //   status: "Live",
    //   team: "Solo",
    //   year: "2025",
    //   github: "https://github.com/yourusername/saasify",
    //   live: "https://saasify.live",
    //   problem:
    //     "Indie founders waste time repeatedly building authentication, payments, and admin dashboards from scratch.",
    //   solution:
    //     "Developed a scalable SaaS starter kit with secure authentication, Stripe billing, and analytics.",
    //   features: [
    //     "JWT Authentication",
    //     "Stripe Subscription Integration",
    //     "Admin Analytics Dashboard",
    //     "Role-based Access Control",
    //     "Dark/Light Theme Support",
    //   ],
    //   tech: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
    //   screenshots: [
    //     "https://picsum.photos/800/500?random=3",
    //     "https://picsum.photos/800/500?random=4",
    //   ],
    // },
    // {
    //   id: 3,
    //   name: "MotionFolio",
    //   type: "Frontend",
    //   description:
    //     "A premium animated developer portfolio with smooth transitions and modern UI storytelling.",
    //   role: "Frontend Developer",
    //   duration: "Feb 2026 – Present",
    //   status: "In Progress",
    //   team: "Solo",
    //   year: "2026",
    //   github: "https://github.com/yourusername/motionfolio",
    //   live: "https://motionfolio.live",
    //   problem:
    //     "Most developer portfolios lack personality, advanced animation, and structured storytelling.",
    //   solution:
    //     "Designed and built a highly interactive portfolio with reusable components and smooth animations.",
    //   features: [
    //     "Framer Motion Animations",
    //     "Reusable Section Layout",
    //     "Dark/Light Theme Architecture",
    //     "Dynamic Project Modals",
    //     "Fully Responsive Design",
    //   ],
    //   tech: ["React", "Tailwind CSS", "Framer Motion"],
    //   screenshots: [
    //     "https://picsum.photos/800/500?random=5",
    //     "https://picsum.photos/800/500?random=6",
    //   ],
    // },
    // {
    //   id: 4,
    //   name: "HireSense AI",
    //   type: "Fullstack",
    //   description:
    //     "An AI-powered resume analyzer that evaluates resumes and provides ATS optimization insights.",
    //   role: "Full Stack Developer",
    //   duration: "Aug 2025 – Oct 2025",
    //   status: "Live",
    //   team: "Solo",
    //   year: "2025",
    //   github: "https://github.com/yourusername/hiresense-ai",
    //   live: "https://hiresense.live",
    //   problem:
    //     "Job seekers often fail ATS screening due to poor keyword optimization and formatting issues.",
    //   solution:
    //     "Built an AI-driven resume analyzer that scores resumes and suggests improvements instantly.",
    //   features: [
    //     "Resume PDF Upload",
    //     "AI Keyword Optimization",
    //     "ATS Compatibility Score",
    //     "Improvement Suggestions",
    //     "Downloadable Report",
    //   ],
    //   tech: ["React", "Node.js", "OpenAI API", "MongoDB"],
    //   screenshots: [
    //     "https://picsum.photos/800/500?random=7",
    //     "https://picsum.photos/800/500?random=8",
    //   ],
    // },
    // {
    //   id: 5,
    //   name: "FinTrack",
    //   type: "Fullstack",
    //   description:
    //     "A personal finance management app to track expenses, income, and financial goals.",
    //   role: "Full Stack Developer",
    //   duration: "Nov 2025 – Jan 2026",
    //   status: "Live",
    //   team: "Solo",
    //   year: "2026",
    //   github: "https://github.com/yourusername/fintrack",
    //   live: "https://fintrack.live",
    //   problem:
    //     "Many individuals struggle to monitor daily expenses and understand their spending habits.",
    //   solution:
    //     "Developed a minimal yet powerful finance tracker with analytics and category insights.",
    //   features: [
    //     "Expense & Income Tracking",
    //     "Category-based Analytics",
    //     "Monthly Reports",
    //     "Interactive Charts",
    //     "Secure Authentication",
    //   ],
    //   tech: ["React", "Express.js", "MongoDB", "Chart.js"],
    //   screenshots: [
    //     "https://picsum.photos/800/500?random=9",
    //     "https://picsum.photos/800/500?random=10",
    //   ],
    // },
  ],
};
const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects(state, action) {
      state.data = action.payload;
    },
    editProjects(state, action) {
      const { id, updatedData } = action.payload;
      const projects = state.projects.find((p) => p.id === id);

      if (projects) {
        Object.assign(projects, updatedData);
      }
    },
    deleteProjects(state, action) {
      state.projects = state.projects.filter((project) => project.id !== action.payload);
    },
  },
});

export const { setProjects, editProjects, deleteProjects } = projectSlice.actions;
export default projectSlice.reducer;
