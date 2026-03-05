import { useSelector } from "react-redux";
import AboutContent from "../../components/about/AboutContent";

export default function About() {
  const user = useSelector((state) => state.user.user);
  const about = useSelector((state) => state.about);

  const { profileImg } = user || {};

  // Toggle light/dark theme class on body

  return <AboutContent profileImg={profileImg} {...about} />;
}
