import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import SectionLayout from "../SectionLayout";
import AboutSectionRenderer from "./AboutSectionRenderer";
import ProfileAvatar from "../profilepic/ProfileAvatar";
import PreviewEmptyState from "./PreviewEmptyState";
import placeholder from "../../assets/placeholder.jpg";

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

  const filteredSkills = useMemo(() => {
    if (skillCategory === "All") {
      return skills;
    } else {
      return skills.filter((s) => s.type === skillCategory);
    }
  }, [skills, skillCategory]);

  return (
    <motion.div
      className={`${
        !fromPreview
          ? `px-6 md:px-14 lg:px-24 xl:px-32
      py-16 lg:py-20`
          : ``
      } min-h-screen
      flex flex-col gap-14
      relative
      transition-colors duration-500
      mb-10
      font-body`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      style={{ background: fromPreview ? "" : "var(--gradient-bg)" }}
    >
      {" "}
      <section className="w-full py-10">
        {" "}
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          {(profileImg || placeholder) && (
            <div className={fromPreview ? `block` : `lg:hidden`}>
              <ProfileAvatar src={profileImg || placeholder} />{" "}
            </div>
          )}
          {headline || subText || story ? (
            <section className="flex flex-col justify-center items-center">
              {headline && (
                <h1
                  className="
              text-3xl sm:text-4xl lg:text-5xl
              font-bold
              bg-gradient-to-r from-indigo-500 to-purple-500
              bg-clip-text text-transparent
              mt-4
              max-w-4xl tracking-tight inline-block py-2
            "
                >
                  {headline}
                </h1>
              )}

              {subText && (
                <p
                  className="
              mt-5
              text-lg md:text-xl lg:text-2xl
              font-medium
              text-[var(--text-secondary)]
              max-w-3xl
              leading-relaxed
            "
                >
                  {subText}
                </p>
              )}

              {story && (
                <p
                  className="
              mt-8
              text-base md:text-lg lg:text-[19px]
              leading-8
              text-[var(--text-secondary)]
              max-w-4xl
              opacity-90
            "
                >
                  {story}
                </p>
              )}
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
          maxWidth="max-w-5xl"
        >
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button
              onClick={() => setSkillCategory("All")}
              className={`px-5 py-2 rounded-full text-sm transition-all duration-300 ${
                skillCategory === "All"
                  ? "shadow-md border border-white/20 transform scale-105 font-bold"
                  : "border border-[var(--border)] text-[var(--text-secondary)] font-medium hover:brightness-105 hover:scale-105"
              }`}
              style={
                skillCategory === "All"
                  ? { background: "var(--gradient-bg)", color: "var(--text-light)" }
                  : {}
              }
            >
              All
            </button>

            {[...new Set(skills?.map((skill) => skill.type))].map((cat) => (
              <button
                key={cat}
                onClick={() => setSkillCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm transition-all duration-300 ${
                  skillCategory === cat
                    ? "shadow-md border border-white/20 transform scale-105 font-bold"
                    : "border border-[var(--border)] text-[var(--text-secondary)] font-medium hover:brightness-105 hover:scale-105"
                }`}
                style={
                  skillCategory === cat
                    ? { background: "var(--gradient-bg)", color: "var(--text-light)" }
                    : {}
                }
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
          <div className="grid grid-cols-1 gap-6 text-left">
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
          maxWidth="max-w-5xl"
          showDivider={false}
        >
          <div className="flex flex-wrap justify-center gap-4">
            <AboutSectionRenderer type="interests" items={personalInterests} />
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
