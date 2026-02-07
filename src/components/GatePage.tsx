import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { FloatingHearts } from "./FloatingHearts";

interface GatePageProps {
  onAccept: () => void;
}

const noButtonTexts = [
  "No",
  "Are you sure? 🥺",
  "Come on... 😭",
  "Pretty please?",
  "Ok fine... YES? 💘",
];

export const GatePage = ({ onAccept }: GatePageProps) => {
  const [noAttempts, setNoAttempts] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [showSuccess, setShowSuccess] = useState(false);
  const [yesScale, setYesScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNoHover = () => {
    if (noAttempts >= noButtonTexts.length - 1) return;
    
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const maxX = rect.width / 2 - 100;
    const maxY = rect.height / 3;

    const newX = (Math.random() - 0.5) * maxX * 2;
    const newY = (Math.random() - 0.5) * maxY * 2;

    setNoPosition({ x: newX, y: newY });
    setNoAttempts((prev) => prev + 1);
    setYesScale((prev) => Math.min(prev + 0.1, 1.5));
  };

  const handleNoClick = () => {
    // Even if they somehow click No, redirect to Yes
    handleYesClick();
  };

  const handleYesClick = () => {
    setShowSuccess(true);
    
    // Fire confetti!
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ff6b9d", "#ff8fab", "#ffc2d1", "#ffb3c6"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ff6b9d", "#ff8fab", "#ffc2d1", "#ffb3c6"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Transition to main page after animation
    setTimeout(() => {
      onAccept();
    }, 2500);
  };

  const currentNoText = noButtonTexts[Math.min(noAttempts, noButtonTexts.length - 1)];
  const noButtonShrink = Math.max(1 - noAttempts * 0.1, 0.6);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-soft relative overflow-hidden"
    >
      <FloatingHearts />
      
      <AnimatePresence mode="wait">
        {!showSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="card-valentine max-w-md w-full text-center z-10 relative"
          >
            {/* Sparkles decoration */}
            <motion.div 
              className="absolute -top-4 -right-4 text-valentine-gold"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={32} />
            </motion.div>
            
            {/* Heart icon */}
            <motion.div 
              className="mb-6"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart 
                className="mx-auto text-primary" 
                size={80} 
                fill="currentColor"
              />
            </motion.div>

            {/* Question */}
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gradient-romantic">
              Will you be my Valentine?
            </h1>
            
            <p className="text-muted-foreground mb-8 text-lg">
              Choose wisely... or not. The universe has already decided 💫
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center relative min-h-[120px]">
              {/* YES Button */}
              <motion.button
                onClick={handleYesClick}
                className="btn-valentine text-xl px-12"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ scale: yesScale }}
              >
                YES 💖
              </motion.button>

              {/* NO Button - Dodges on hover */}
              <motion.button
                onMouseEnter={handleNoHover}
                onTouchStart={handleNoHover}
                onClick={handleNoClick}
                className="btn-valentine-outline text-lg"
                animate={{
                  x: noPosition.x,
                  y: noPosition.y,
                  scale: noButtonShrink,
                  rotate: noAttempts * 5,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                style={{ transformOrigin: "center" }}
              >
                {currentNoText}
              </motion.button>
            </div>

            {noAttempts >= 2 && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-sm text-muted-foreground italic"
              >
                the universe said no ❤️
              </motion.p>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-valentine max-w-md w-full text-center z-10"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 0.5 }}
            >
              <Heart 
                className="mx-auto text-primary mb-6" 
                size={100} 
                fill="currentColor"
              />
            </motion.div>
            
            <h2 className="text-4xl font-display font-bold text-gradient-romantic mb-4">
              YAY! 💖
            </h2>
            <p className="text-xl text-foreground">
              Welcome to our countdown!
            </p>
            <p className="text-muted-foreground mt-2">
              Something magical awaits...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};