import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionLayout from "../SectionLayout";
import FloatingConnectButton from "../FloatingConnectButton";
import AboutSectionRenderer from "./AboutSectionRenderer";
import ProfileAvatar from "../profilepic/ProfileAvatar";
const MAX_LENGTH = 200;
const AboutContent = ({
  profileImg,
  intro: { headline, subText, story },
  skills,
  achievements,
  education,
  personalInterests,
}) => {
  const [skillCategory, setSkillCategory] = useState("All");
  const [expanded, setExpanded] = useState(false);
  const isLong = story.length > MAX_LENGTH;
  const displayedText =
    !expanded && isLong ? story.slice(0, MAX_LENGTH) : story;

  const filteredSkills =
    skillCategory === "All"
      ? skills
      : skills.filter((s) => s.type === skillCategory);
  return (
    <motion.div
      className="min-h-screen px-6 md:px-20 py-14 flex flex-col gap-10 relative
             transition-colors duration-500 bg-[var(--background)] text-[var(--text-primary)] font-body"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      {/* Hero / Intro */}
      <section className="w-full py-14 px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          {/* Profile Image */}
          {profileImg && (
            <div className="lg:hidden">
              <ProfileAvatar src={profileImg} />
              </div>
            
          )}

          {/* Headline */}
          {headline && (
            <h1 className="text-3xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent sm:mt-4">
              {headline}
            </h1>
          )}

          {/* SubText */}
          {subText && (
            <p className="mt-4 text-lg md:text-xl font-medium text-[var(--text-secondary)] max-w-2xl">
              {subText}
            </p>
          )}

          {/* Story */}
          {story && (
            <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--text-secondary)] max-w-3xl">
              {displayedText}
              {isLong && !expanded && "... "}
            </p>
          )}

          {/* See More / Less */}
          {isLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-4 text-sm font-medium text-[var(--primary)] hover:underline transition-all"
            >
              {expanded ? "See less" : "See more"}
            </button>
          )}
        </div>
      </section>
      {skills && (
        <SectionLayout
          title="Skills & Expertise"
          description="Technologies and tools I use to build scalable and modern web applications."
        >
          {/* filter pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[...new Set(skills?.map((skill) => skill.type))].map((cat) => (
              <button
                key={cat}
                onClick={() => setSkillCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-heading font-medium transition-all duration-300
              ${
                skillCategory === cat
                  ? "bg-[var(--primary)] text-white shadow-lg scale-105"
                  : "bg-[var(--card)] border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--primary)] hover:text-white"
              }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <AboutSectionRenderer type="skills" items={filteredSkills} />
        </SectionLayout>
      )}
      {achievements?.length && (
        <SectionLayout
          title="Achievements"
          description="Milestones and accomplishments throughout my journey."
        >
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 text-left">
            {/* achievements */}
            <AboutSectionRenderer type="achievements" items={achievements} />
          </div>
        </SectionLayout>
      )}
      {education?.length && (
        <SectionLayout
          title="Education"
          description="My academic background and foundational learning."
        >
          <div className="flex flex-col gap-6 text-left">
            {/* education cards */}
            <AboutSectionRenderer type="education" items={education} />
          </div>
        </SectionLayout>
      )}

      {personalInterests?.length && (
        <SectionLayout
          title="Personal Interests"
          description="Beyond coding, here are things I genuinely enjoy."
          maxWidth="max-w-4xl"
          showDivider={false}
        >
          <div className="flex flex-wrap justify-center gap-4">
            {/* interests */}
            {
              <AboutSectionRenderer
                type="interests"
                items={personalInterests}
              />
            }
          </div>
        </SectionLayout>
      )}

      {/* Floating Connect Button */}
      <FloatingConnectButton />
    </motion.div>
  );
};

export default AboutContent;
