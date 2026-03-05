import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import AboutContent from "../../components/about/AboutContent";
import AboutIntroEditor from "./sections/AboutIntroEditor";
import AboutSkillEditor from "./sections/AboutSkillEditor";
import AboutAchievementEditor from "./sections/AboutAchievementEditor";
import AboutEducationEditor from "./sections/AboutEducationEditor";
import AboutInterestEditor from "./sections/AboutInterestEditor";
export default function AdminAboutPage({}) {
  const user = useSelector((state) => state.user.user);
  const aboutFromStore = useSelector((state) => state.about);
  const [about, setAbout] = useState({
    intro: { profileImg: "", headline: "", subText: "", story: "", quote: "" },
    skills: [],
    achievements: [],
    education: [],
    featuredProjects: [],
    personalInterests: [],
  });
  const [skillForm, setSkillForm] = useState({
    id: "",
    name: "",
    percentage: 0,
    type: "",
  });
  const [achForm, setAchForm] = useState({
    id: "",
    title: "",
    year: "",
    description: "",
    icon: "",
  });
  const [eduForm, setEduForm] = useState({
    id: "",
    degree: "",
    institution: "",
    duration: "",
    location: "",
    grade: "",
    description: "",
    logo: "",
  });

  const [interestInput, setInterestInput] = useState("");
  const { profileImg } = user || {};
  useEffect(() => {
    async function fetchAbout() {
      try {
        // const res = await axios.get("/api/about");
        // const data = res.data || {};
        setAbout({
          intro: aboutFromStore.intro,

          skills: aboutFromStore.skills || [],
          achievements: aboutFromStore.achievements || [],
          education: aboutFromStore.education || [],
          featuredProjects: aboutFromStore.featuredProjects || [],
          personalInterests: aboutFromStore.personalInterests || [],
        });
      } catch (err) {
        console.error(err);
      }
    }
    fetchAbout();
  }, []);

  const updateItem = (field, item) => {
    const id = item.id || uuidv4();
    const updatedArray = about[field].map((i) =>
      i.id === id ? { ...i, ...item } : i
    );
    if (!updatedArray.find((i) => i.id === id))
      updatedArray.push({ ...item, id });
    setAbout({ ...about, [field]: updatedArray });
  };

  const removeItem = (field, id) => {
    setAbout({ ...about, [field]: about[field].filter((i) => i.id !== id) });
  };

  const addInterest = () => {
    if (interestInput.trim()) {
      setAbout({
        ...about,
        personalInterests: [...about.personalInterests, interestInput.trim()],
      });
      setInterestInput("");
    }
  };

  const removeInterest = (idx) => {
    setAbout({
      ...about,
      personalInterests: about.personalInterests.filter((_, i) => i !== idx),
    });
  };

  const saveAll = async () => {
    try {
      console.log(about);
      //   await axios.put("/api/about", about);
      //   alert("About section updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating about section");
    }
  };
  return (
    <div
      className={`h-[calc(100vh-80px)] 
      grid grid-cols-1 
      2xl:grid-cols-[minmax(520px,0.8fr)_minmax(420px,1.2fr)] 
      gap-8 p-6 overflow-hidden text-[var(--text-primary)] font-sans`}
    >
      {/* LEFT PANEL */}
      <div className="space-y-8 overflow-y-auto pr-2 max-h-[calc(100vh-120px)]">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-semibold">About Section</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Edit your portfolio’s About section content below.
          </p>
        </div>
        <AboutIntroEditor about={about} setAbout={setAbout} />
        {/* Skills */}
        <AboutSkillEditor
          about={about}
          skillForm={skillForm}
          setSkillForm={setSkillForm}
          updateItem={updateItem}
          removeItem={removeItem}
        />
        {/* Achievements */}
        <AboutAchievementEditor
          achForm={achForm}
          setAchForm={setAchForm}
          about={about}
          removeItem={removeItem}
        />
        {/* Education */}
        <AboutEducationEditor
          updateItem={updateItem}
          about={about}
          eduForm={eduForm}
          setEduForm={setEduForm}
          removeItem={removeItem}
        />
        {/* Personal Interests */}
        <AboutInterestEditor
          interestInput={interestInput}
          setInterestInput={setInterestInput}
          about={about}
          addInterest={addInterest}
          removeInterest={removeInterest}
        />
        {/* Save All */}
        <div>
          <button
            onClick={saveAll}
            className="px-6 py-3 bg-[var(--primary)] text-[var(--text-button)] rounded-md shadow-md"
          >
            Save All
          </button>
        </div>
      </div>
      {/* RIGHT PREVIEW PANEL */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 overflow-y-auto h-full ">
        <h3 className="text-lg font-semibold mb-4">Live About Preview</h3>
        <AboutContent profileImg={profileImg} {...about} />
      </div>
    </div>
  );
}
