import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/data/hints";
import confetti from "canvas-confetti";

export const SecretRevealBox = () => {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);

  const handleUnlock = () => {
    if (password.toLowerCase().trim() === siteConfig.secretPassword.toLowerCase().trim()) {
      setIsUnlocked(true);
      setError("");
      
      // Epic confetti celebration
      const duration = 5000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#ff6b9d", "#c44569", "#ff8a5c", "#ffd93d"],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#ff6b9d", "#c44569", "#ff8a5c", "#ffd93d"],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    } else {
      setAttempts((prev) => prev + 1);
      setError(getErrorMessage(attempts + 1));
      setPassword("");
    }
  };

  const getErrorMessage = (attemptCount: number) => {
    const messages = [
      "Hmm, that's not it... try again! 💭",
      "Nope! Think harder, my love 🤔",
      "So close... or maybe not? 😅",
      "Here's a hint: It's something special to us 💕",
      "You've got this! Think about our memories 🌟",
    ];
    return messages[Math.min(attemptCount - 1, messages.length - 1)];
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card-valentine overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="locked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center py-6"
          >
            <motion.div
              animate={{ 
                rotateY: [0, 10, -10, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                <Lock className="text-primary" size={32} />
              </div>
            </motion.div>

            <h3 className="text-xl font-display font-bold text-foreground mb-2">
              🎁 The Secret Reveal 🎁
            </h3>
            <p className="text-muted-foreground mb-6">
              Enter our secret word to unlock the grand plan...
            </p>

            <div className="max-w-xs mx-auto space-y-4">
              <Input
                type="text"
                placeholder="Enter the magic word..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                className="text-center bg-background/50 border-primary/30 focus:border-primary"
              />

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-primary"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <Button
                onClick={handleUnlock}
                className="w-full btn-valentine"
                disabled={!password.trim()}
              >
                <Unlock size={18} />
                Unlock the Secret
              </Button>

              <p className="text-xs text-muted-foreground/70">
                Hint: {siteConfig.secretPasswordHint}
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="unlocked"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="text-center py-6"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto shadow-lg">
                <Sparkles className="text-primary-foreground" size={40} />
              </div>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-display font-bold text-gradient-romantic mb-4"
            >
              🎉 Happy Valentine's Day! 🎉
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <div className="bg-background/50 rounded-xl p-6 border border-primary/20">
                <h4 className="font-semibold text-foreground mb-3 flex items-center justify-center gap-2">
                  <Heart className="text-primary" size={20} fill="currentColor" />
                  The Grand Plan
                  <Heart className="text-primary" size={20} fill="currentColor" />
                </h4>
                <p className="text-foreground leading-relaxed whitespace-pre-line">
                  {siteConfig.finalRevealMessage}
                </p>
              </div>

              {siteConfig.finalRevealLink && (
                <motion.a
                  href={siteConfig.finalRevealLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="inline-flex items-center gap-2 btn-valentine"
                >
                  <Sparkles size={18} />
                  See More Details
                </motion.a>
              )}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 text-sm text-muted-foreground"
            >
              I love you more than words can say 💕
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
