import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Heart } from "lucide-react";
import { siteConfig } from "@/data/hints";

export const MessageInABottle = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const loveNote = siteConfig.loveNote;

  useEffect(() => {
    if (isOpen) {
      setIsTyping(true);
      let index = 0;
      const interval = setInterval(() => {
        if (index < loveNote.length) {
          setDisplayedText(loveNote.slice(0, index + 1));
          index++;
        } else {
          setIsTyping(false);
          clearInterval(interval);
        }
      }, 30);

      return () => clearInterval(interval);
    } else {
      setDisplayedText("");
    }
  }, [isOpen, loveNote]);

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <Mail size={20} className="text-muted-foreground" />
        <h3 className="text-lg font-display font-semibold text-foreground">Message in a Bottle</h3>
      </div>

      {!isOpen ? (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="w-full card-valentine text-center py-8 hover:shadow-lg transition-shadow cursor-pointer border-2 border-dashed border-primary/30"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Mail className="mx-auto text-primary mb-3" size={40} />
          </motion.div>
          <p className="text-foreground font-medium">A special message awaits...</p>
          <p className="text-sm text-muted-foreground mt-1">Tap to open</p>
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-valentine"
        >
          <div className="flex items-center gap-2 mb-4">
            <Heart className="text-primary" size={20} fill="currentColor" />
            <span className="text-sm text-muted-foreground italic">A love note for you...</span>
          </div>
          
          <p className="text-foreground/90 leading-relaxed min-h-[100px]">
            {displayedText}
            {isTyping && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-0.5 h-5 bg-primary ml-1 align-middle"
              />
            )}
          </p>

          {!isTyping && displayedText.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 pt-4 border-t border-border text-right"
            >
              <p className="text-sm text-muted-foreground italic">
                Forever yours 💕
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};