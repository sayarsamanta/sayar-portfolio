import React from "react";

const AboutIntroEditor = ({ about, setAbout }) => {
  const { bio, brief, qoute, headline, subText, story } = about.intro || {};
  return (
    <div className="rounded-2xl border border-[var(--border)] p-6 space-y-4">
      <h3 className="text-lg font-semibold mb-2">Intro / About Info</h3>
      <div className="space-y-3">
        <input
          placeholder="Bio (Home Page)"
          value={bio || ""}
          onChange={(e) =>
            setAbout({
              ...about,
              intro: { ...about.intro, bio: e.target.value },
            })
          }
          className="w-full rounded-lg border border-[var(--border)] 
bg-[var(--input-bg)] 
px-4 py-2.5 
text-sm text-[var(--text-primary)] 
placeholder:text-sm placeholder:text-[var(--text-secondary)] placeholder:opacity-70
focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
        <input
          placeholder="Brief (Home Page)"
          value={brief || ""}
          onChange={(e) =>
            setAbout({
              ...about,
              intro: { ...about.intro, brief: e.target.value },
            })
          }
          className="w-full rounded-lg border border-[var(--border)] 
bg-[var(--input-bg)] 
px-4 py-2.5 
text-sm text-[var(--text-primary)] 
placeholder:text-sm placeholder:text-[var(--text-secondary)] placeholder:opacity-70
focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
        <input
          placeholder="Qoute (Home Page)"
          value={qoute || ""}
          onChange={(e) =>
            setAbout({
              ...about,
              intro: { ...about.intro, qoute: e.target.value },
            })
          }
          className="w-full rounded-lg border border-[var(--border)] 
bg-[var(--input-bg)] 
px-4 py-2.5 
text-sm text-[var(--text-primary)] 
placeholder:text-sm placeholder:text-[var(--text-secondary)] placeholder:opacity-70
focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
      </div>
      <div className="space-y-3 mt-4">
        <input
          placeholder="Headline (About Page)"
          value={headline || ""}
          onChange={(e) =>
            setAbout({
              ...about,
              intro: { ...about.intro, headline: e.target.value },
            })
          }
          className="w-full rounded-lg border border-[var(--border)] 
bg-[var(--input-bg)] 
px-4 py-2.5 
text-sm text-[var(--text-primary)] 
placeholder:text-sm placeholder:text-[var(--text-secondary)] placeholder:opacity-70
focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
        <input
          placeholder="SubText (About Page)"
          value={subText || ""}
          onChange={(e) =>
            setAbout({
              ...about,
              intro: { ...about.intro, subText: e.target.value },
            })
          }
          className="w-full rounded-lg border border-[var(--border)] 
bg-[var(--input-bg)] 
px-4 py-2.5 
text-sm text-[var(--text-primary)] 
placeholder:text-sm placeholder:text-[var(--text-secondary)] placeholder:opacity-70
focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
        <textarea
          placeholder="Story (About Page)"
          value={story || ""}
          onChange={(e) =>
            setAbout({
              ...about,
              intro: { ...about.intro, story: e.target.value },
            })
          }
          className="w-full rounded-lg border border-[var(--border)] 
bg-[var(--input-bg)] 
px-4 py-2.5 h-32 resize-none
text-sm text-[var(--text-primary)] 
placeholder:text-sm placeholder:text-[var(--text-secondary)] placeholder:opacity-70
focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
      </div>
    </div>
  );
};

export default AboutIntroEditor;
