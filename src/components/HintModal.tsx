import { motion, AnimatePresence } from "framer-motion";
import { X, Music, ExternalLink, Calendar, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { Hint } from "@/data/hints";

interface HintModalProps {
  hint: Hint | null;
  isOpen: boolean;
  onClose: () => void;
}

export const HintModal = ({ hint, isOpen, onClose }: HintModalProps) => {
  const [secretRevealed, setSecretRevealed] = useState(false);

  if (!hint) return null;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-lg mx-auto z-50"
          >
            <div className="card-valentine relative max-h-[80vh] overflow-y-auto">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <X size={20} />
              </button>

              {/* Date */}
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{formatDate(hint.date)}</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-display font-bold text-foreground mb-3 pr-8">
                {hint.title}
              </h2>

              {/* Text */}
              <p className="text-foreground/80 mb-4 leading-relaxed">{hint.text}</p>

              {/* Image */}
              {hint.image && (
                <img
                  src={hint.image}
                  alt="Hint"
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
              )}

              {/* Links */}
              <div className="flex flex-wrap gap-2 mb-4">
                {hint.musicLink && (
                  <a
                    href={hint.musicLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm bg-secondary px-4 py-2 rounded-full hover:bg-secondary/80 transition-colors"
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
                    className="inline-flex items-center gap-2 text-sm bg-secondary px-4 py-2 rounded-full hover:bg-secondary/80 transition-colors"
                  >
                    <ExternalLink size={16} />
                    See More
                  </a>
                )}
              </div>

              {/* Secret Message */}
              {hint.secretMessage && (
                <div className="mt-4 pt-4 border-t border-border">
                  <button
                    onClick={() => setSecretRevealed(!secretRevealed)}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {secretRevealed ? <EyeOff size={16} /> : <Eye size={16} />}
                    {secretRevealed ? "Hide Secret" : "Reveal Secret Message"}
                  </button>
                  <AnimatePresence>
                    {secretRevealed && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 p-4 bg-secondary/50 rounded-lg text-sm italic text-foreground/90"
                      >
                        {hint.secretMessage}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};