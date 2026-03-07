// template.js
export const userTemplate = {
  about: {
    id: "user_001",
    name: "Sayar Samanta",
    username: "sayar123",
    email: "sayar@example.com",
    role: "admin",

    profileImg:
      "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/linkedin-profile-picture-maker/dummy_image/thumb/004.webp",
    intro: {
      headline: "Fullstack Developer Crafting Modern Web Experiences",
      subText:
        "Passionate about building scalable, performant, and visually appealing applications.",
      story:
        "I started my journey focusing on frontend development and gradually expanded into backend systems. " +
        "I enjoy solving complex problems with clean and maintainable solutions. I love exploring new technologies " +
        "and applying them to real-world projects that make an impact.",
      bio: "Fullstack Developer & Content Creator",
      brief: "Building performant web apps with React, Node.js & MongoDB",
      qoute: "Code is like humor. When you have to explain it, it’s bad.",
    },

    skills: [
      { id: "skill_001", name: "React", percentage: 95, type: "frontend" },
      { id: "skill_002", name: "Tailwind CSS", percentage: 90, type: "frontend" },
      { id: "skill_003", name: "Node.js", percentage: 88, type: "backend" },
      { id: "skill_004", name: "MongoDB", percentage: 85, type: "backend" },
      { id: "skill_005", name: "TypeScript", percentage: 80, type: "frontend" },
      { id: "skill_006", name: "Express.js", percentage: 82, type: "backend" },
    ],

    achievements: [
      {
        id: "ach_001",
        title: "Top Performer Award",
        issuer: "TechCorp",
        year: "2024",
        description: "Recognized for delivering high-performance scalable frontend architecture.",
        icon: "Trophy",
      },
      {
        id: "ach_002",
        title: "1000+ Users Served",
        issuer: "Personal SaaS Project",
        year: "2025",
        description: "Built and launched a SaaS product serving over 1000 active users.",
        icon: "Rocket",
      },
      {
        id: "ach_003",
        title: "Hackathon Winner",
        issuer: "CodeFest",
        year: "2023",
        description: "Won 1st place for building an AI-powered productivity tool in 24 hours.",
        icon: "Medal",
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
        description: "Specialized in Software Engineering, Data Structures, and Web Technologies.",
        logo: "https://picsum.photos/100/100?random=20",
      },
      {
        id: "edu_002",
        degree: "Higher Secondary (Science)",
        institution: "ABC School",
        location: "West Bengal, India",
        duration: "2016 – 2018",
        grade: "85%",
        description: "Focused on Mathematics, Physics, and Computer Science fundamentals.",
        logo: "https://picsum.photos/100/100?random=21",
      },
    ],

    personalInterests: [
      "Photography",
      "Automobile Road Trips",
      "Exploring New Technologies",
      "UI/UX Design Trends",
      "Gaming & AI Experiments",
    ],
    stats: { projects: 4, experienceYears: 7, clients: 10 },

    // featuredProjects: [
    //   {
    //     id: "proj_001",
    //     title: "Portfolio Builder SaaS",
    //     description: "A full-featured SaaS platform to create and host developer portfolios.",
    //     link: "https://portfolio-builder.example.com",
    //     techStack: ["React", "Node.js", "Tailwind CSS", "MongoDB"],
    //   },
    //   {
    //     id: "proj_002",
    //     title: "AI Task Manager",
    //     description: "An AI-powered productivity app that automates task management and reminders.",
    //     link: "https://ai-task.example.com",
    //     techStack: ["React", "Express", "TensorFlow.js"],
    //   },
    //   {
    //     id: "proj_003",
    //     title: "E-commerce Platform",
    //     description: "A scalable e-commerce website with real-time inventory and payment integration.",
    //     link: "https://shop-example.com",
    //     techStack: ["Next.js", "Node.js", "Stripe API", "MongoDB"],
    //   },
    // ],
  },
};
