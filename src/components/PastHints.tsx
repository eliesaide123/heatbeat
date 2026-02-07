import { motion } from "framer-motion";
import { Clock, ChevronRight } from "lucide-react";
import type { Hint } from "@/data/hints";

interface PastHintsProps {
  hints: Hint[];
  unlockedDates: string[];
  onHintClick: (hint: Hint) => void;
}

export const PastHints = ({ hints, unlockedDates, onHintClick }: PastHintsProps) => {
  const pastHints = hints.filter((hint) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const hintDate = new Date(hint.date + "T00:00:00");
    return hintDate < today && unlockedDates.includes(hint.date);
  });

  if (pastHints.length === 0) {
    return null;
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <Clock size={20} className="text-muted-foreground" />
        <h3 className="text-lg font-display font-semibold text-foreground">Past Hints</h3>
      </div>

      <div className="grid gap-3">
        {pastHints.map((hint, index) => (
          <motion.button
            key={hint.date}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onHintClick(hint)}
            className="w-full flex items-center justify-between p-4 bg-card rounded-xl shadow-sm hover:shadow-md transition-all border border-border hover:border-primary/30"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-sm font-medium">
                {formatDate(hint.date).split(" ")[1]}
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground">{hint.title}</p>
                <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                  {hint.text.slice(0, 50)}...
                </p>
              </div>
            </div>
            <ChevronRight size={20} className="text-muted-foreground" />
          </motion.button>
        ))}
      </div>
    </div>
  );
};