import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionLayout from "../SectionLayout";
import AboutSectionRenderer from "./AboutSectionRenderer";
import ProfileAvatar from "../profilepic/ProfileAvatar";
import PreviewEmptyState from "./PreviewEmptyState";
import placeholder from "../../assets/placeholder.jpg";
const MAX_LENGTH = 200;
const AboutContent = ({
  intro,
  skills,
  achievements,
  education,
  personalInterests,
  fromPreview = false,
}) => {
  const { headline, subText, story, profileImg } = intro || {};
  const [skillCategory, setSkillCategory] = useState("All");
  const [expanded, setExpanded] = useState(false);
  const isLong = story?.length > MAX_LENGTH;
  const displayedText = !expanded && isLong ? story.slice(0, MAX_LENGTH) : story;

  const filteredSkills =
    skillCategory === "All" ? skills : skills.filter((s) => s.type === skillCategory);
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
      <section className="w-full py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          {/* Profile Image */}
          {(profileImg || placeholder) && (
            <div className={fromPreview ? `block` : `lg:hidden`}>
              <ProfileAvatar src={profileImg || placeholder} />
            </div>
          )}

          {headline || subText || story ? (
            <section className="flex flex-col justify-center items-center">
              {/* existing content */}
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
              {expanded ||
                (isLong && (
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="mt-4 text-sm font-medium text-[var(--primary)] hover:underline transition-all"
                  >
                    {"See more"}
                  </button>
                ))}
            </section>
          ) : (
            <PreviewEmptyState
              title="Intro Preview"
              message="Your headline, sub text and story will appear here."
            />
          )}
        </div>
      </section>
      {skills?.length > 0 ? (
        <SectionLayout
          title="Skills & Expertise"
          description="Technologies and tools I use to build scalable and modern web applications."
          maxWidth="max-w-4xl"
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
      ) : (
        <PreviewEmptyState
          title="Skills Preview"
          message="Add skills from the admin panel to preview them here."
        />
      )}

      {achievements?.length > 0 ? (
        <SectionLayout
          title="Achievements"
          description="Milestones and accomplishments throughout my journey."
        >
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 text-left">
            {/* achievements */}
            <AboutSectionRenderer type="achievements" items={achievements} />
          </div>
        </SectionLayout>
      ) : (
        <PreviewEmptyState
          title="Achievements Preview"
          message="Your achievements will appear here."
        />
      )}

      {education?.length > 0 ? (
        <SectionLayout
          title="Education"
          description="My academic background and foundational learning."
        >
          <div className="flex flex-col gap-6 text-left">
            {/* education cards */}
            <AboutSectionRenderer type="education" items={education} />
          </div>
        </SectionLayout>
      ) : (
        <PreviewEmptyState title="Education Preview" message="Your educations will appear here." />
      )}

      {personalInterests?.length > 0 ? (
        <SectionLayout
          title="Personal Interests"
          description="Beyond coding, here are things I genuinely enjoy."
          maxWidth="max-w-4xl"
          showDivider={false}
        >
          <div className="flex flex-wrap justify-center gap-4">
            {/* interests */}
            {<AboutSectionRenderer type="interests" items={personalInterests} />}
          </div>
        </SectionLayout>
      ) : (
        <PreviewEmptyState
          title="Personal Interest Preview"
          message="Your personal interests will appear here."
        />
      )}
    </motion.div>
  );
};

export default AboutContent;
