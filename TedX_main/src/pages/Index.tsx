import { useState } from "react";
import Hero from "@/components/Hero";
import RegistrationForm from "@/components/RegistrationForm";
import DigitalPass from "@/components/DigitalPass";

type AppState = "hero" | "registration" | "pass";

interface UserData {
  name: string;
  email: string;
}

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("hero");
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleRegisterClick = () => {
    setCurrentState("registration");
  };

  const handleRegistrationSubmit = (data: UserData) => {
    setUserData(data);
    setCurrentState("pass");
  };

  const handleBackToHero = () => {
    setCurrentState("hero");
  };

  const handleBackToRegistration = () => {
    setCurrentState("registration");
  };

  const handleNewRegistration = () => {
    setUserData(null);
    setCurrentState("registration");
  };

  switch (currentState) {
    case "registration":
      return (
        <RegistrationForm 
          onBack={handleBackToHero}
          onSubmit={handleRegistrationSubmit}
        />
      );
    
    case "pass":
      return userData ? (
        <DigitalPass 
          userData={userData}
          onBack={handleBackToRegistration}
          onNewRegistration={handleNewRegistration}
        />
      ) : null;
    
    default:
      return <Hero onRegisterClick={handleRegisterClick} />;
  }
};

export default Index;
