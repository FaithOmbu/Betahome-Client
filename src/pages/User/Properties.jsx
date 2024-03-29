import UserNavbar from "../../components/User components/UserNavbar";
import UserPropertyHeroSection from "../../components/User components/PropertiesSubComponents/UserPropertyHeroSection";
import UserPropertyCardComponent from "../../components/User components/PropertiesSubComponents/UserPropertyCardComponent";
import UserPropertyDiscover from "../../components/User components/PropertiesSubComponents/UserPropertyDiscover";
import UserFooter from "../../components/User components/UserFooter";
import { useGlobalContext } from "../../Hooks/useGlobalContext";
import { useEffect } from "react";
import UserDiscover from "../../components/User components/HomeSubComponents/UserDiscover";

const Properties = () => {
  const { isDark } = useGlobalContext();
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className={isDark ? "DarkMode" : null}>
      <UserNavbar />
      <UserPropertyHeroSection />
      <UserPropertyCardComponent />
      <UserDiscover/>
      {/* <UserPropertyDiscover /> */}
      <UserFooter />
    </div>
  );
};

export default Properties;
