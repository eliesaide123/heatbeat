import { useState, useEffect } from "react";
import { GatePage } from "@/components/GatePage";
import { MainPage } from "@/components/MainPage";

const Index = () => {
  const [hasAccepted, setHasAccepted] = useState<boolean | null>(null);

  // Check localStorage on mount
  useEffect(() => {
    const accepted = localStorage.getItem("valentine-accepted");
    setHasAccepted(accepted === "true");
  }, []);

  const handleAccept = () => {
    localStorage.setItem("valentine-accepted", "true");
    setHasAccepted(true);
  };

  const handleReset = () => {
    localStorage.removeItem("valentine-accepted");
    localStorage.removeItem("valentine-unlocked-dates");
    setHasAccepted(false);
  };

  // Show loading state while checking localStorage
  if (hasAccepted === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-soft">
        <div className="animate-pulse">
          <div className="w-16 h-16 rounded-full bg-primary/20" />
        </div>
      </div>
    );
  }

  // Show gate page if not yet accepted
  if (!hasAccepted) {
    return <GatePage onAccept={handleAccept} />;
  }

  // Show main countdown page
  return (
    <MainPage onReset={handleReset} />
  );
};

export default Index;
