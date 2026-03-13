import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import AboutContent from "../../components/about/AboutContent";
import AboutIntroEditor from "./sections/AboutIntroEditor";
import AboutSkillEditor from "./sections/AboutSkillEditor";
import AboutAchievementEditor from "./sections/AboutAchievementEditor";
import AboutEducationEditor from "./sections/AboutEducationEditor";
import AboutInterestEditor from "./sections/AboutInterestEditor";
import ProfileAvatar from "../../components/profilepic/ProfileAvatar";
import toast from "react-hot-toast";
import useAboutAPI from "../../hooks/useAboutAPI";
import placeholder from "../../assets/placeholder.jpg";
export default function AdminAboutPage({}) {
  const aboutFromStore = useSelector((state) => state.about);
  const { saveAbout, loading } = useAboutAPI();
  const [about, setAbout] = useState({
    intro: { profileImg: "", headline: "", subText: "", story: "", qoute: "", bio: "", brief: "" },
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
    type: "",
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
  const { profileImg } = about.intro || {};
  const [interestInput, setInterestInput] = useState("");
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
    const updatedArray = about[field].map((i) => (i.id === id ? { ...i, ...item } : i));
    if (!updatedArray.find((i) => i.id === id)) updatedArray.push({ ...item, id });
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

  const validateIntro = () => {
    const { headline, subText, story } = about?.intro || {};

    if (!headline && !subText && !story) {
      toast.error(`intro section cannot be empty`);
      return false;
    }

    return true;
  };

  const saveAll = async () => {
    await saveAbout(about, validateIntro);
  };
  return (
    <div
      className={`h-[calc(100vh-80px)] 
      grid grid-cols-1 
      2xl:grid-cols-[minmax(520px,1fr)_minmax(420px,1fr)] 
      gap-8 p-6 overflow-hidden text-[var(--text-primary)] font-sans`}
    >
      {/* LEFT PANEL */}
      <div className="space-y-8 overflow-y-auto pr-2 max-h-[calc(100vh-120px)] hide-scrollbar">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-semibold">About Section</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Edit your portfolio’s About section content below.
          </p>
        </div>
        <div className="flex justify-center">
          <ProfileAvatar
            src={profileImg || placeholder}
            editable
            isPlaceHolder={!profileImg}
            onDelete={() => {
              if (confirm("Remove profile image?")) {
                setAbout((prev) => ({
                  ...prev,
                  intro: {
                    ...prev.intro,
                    profileImg: null,
                    profileFile: null,
                  },
                }));
              }
            }}
            onChange={({ file }) => {
              const preview = URL.createObjectURL(file);
              setAbout({
                ...about,
                intro: {
                  ...about.intro,
                  profileImg: preview,
                  profileFile: file,
                },
              });
            }}
          />
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
          updateItem={updateItem}
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
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              </>
            ) : (
              "Save All"
            )}
          </button>
        </div>
      </div>
      {/* RIGHT PREVIEW PANEL */}
      <div className="rounded-2xl overflow-y-auto h-full hide-scrollbar border border-[var(--border)] p-5 shadow-md">
        <h2 className="text-2xl font-semibold">Live About Preview</h2>
        <AboutContent
          fromPreview={true}
          profileImg={about?.intro?.profileImg || placeholder}
          {...about}
        />
      </div>
    </div>
  );
}
