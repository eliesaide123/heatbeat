import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Music, ExternalLink, Eye, EyeOff, Calendar, Lock } from "lucide-react";
import type { Hint } from "@/data/hints";

interface HintCardProps {
  hint: Hint;
  isUnlocked: boolean;
  isToday: boolean;
  onUnlock?: () => void;
}

export const HintCard = ({ hint, isUnlocked, isToday, onUnlock }: HintCardProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [secretRevealed, setSecretRevealed] = useState(false);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T23:00:00");
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  if (!isUnlocked && !isToday) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-valentine opacity-60"
      >
        <div className="flex items-center gap-3 text-muted-foreground">
          <Lock size={20} />
          <div>
            <p className="font-medium">{formatDate(hint.date)}</p>
            <p className="text-sm">Come back soon...</p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (isToday && !isRevealed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card-valentine border-2 border-primary/30"
      >
        <div className="text-center py-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Gift className="mx-auto text-primary mb-4" size={48} />
          </motion.div>
          <h3 className="text-xl font-display font-bold mb-2">Today's Hint!</h3>
          <p className="text-muted-foreground mb-4">Ready to reveal today's clue?</p>
          <motion.button
            onClick={() => {
              setIsRevealed(true);
              onUnlock?.();
            }}
            className="btn-valentine"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Open Today's Hint 🎁
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`card-valentine ${isToday ? "border-2 border-primary/30" : ""}`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Calendar size={16} className="text-muted-foreground" />
        <span className="text-sm text-muted-foreground">{formatDate(hint.date)}</span>
        {isToday && (
          <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
            Today
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-xl font-display font-bold text-foreground mb-2">
        {hint.title}
      </h3>

      {/* Main text */}
      <p className="text-foreground/80 mb-4">{hint.text}</p>

      {/* Image */}
      {hint.image && (
        <motion.img
          src={hint.image}
          alt="Hint"
          className="w-full h-68 object-cover rounded-xl mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}

      {/* Links */}
      <div className="flex flex-wrap gap-2 mb-4">
        {hint.musicLink && (
          <a
            href={hint.musicLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm bg-secondary px-3 py-2 rounded-full hover:bg-secondary/80 transition-colors"
          >
            <Music size={16} />
            Listen 🎵
          </a>
        )}
        {hint.extraLink && (
          <a
            href={hint.extraLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm bg-secondary px-3 py-2 rounded-full hover:bg-secondary/80 transition-colors"
          >
            <ExternalLink size={16} />
            See More
          </a>
        )}
      </div>

      {/* Secret Message */}
      <AnimatePresence>
        {hint.secretMessage && (
          <div className="mt-4 pt-4 border-t border-border">
            <button
              onClick={() => setSecretRevealed(!secretRevealed)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {secretRevealed ? <EyeOff size={16} /> : <Eye size={16} />}
              {secretRevealed ? "Hide Secret" : "Reveal Secret Message"}
            </button>
            {secretRevealed && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 p-3 bg-secondary/50 rounded-lg text-sm italic text-foreground/90"
              >
                {hint.secretMessage}
              </motion.p>
            )}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};