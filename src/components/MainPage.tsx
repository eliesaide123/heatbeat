import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, RotateCcw } from "lucide-react";
import { CountdownTimer } from "./CountdownTimer";
import { HintCard } from "./HintCard";
import { PastHints } from "./PastHints";
import { HintModal } from "./HintModal";
import { MessageInABottle } from "./MessageInABottle";
import { MemoryLane } from "./MemoryLane";
import { FloatingHearts } from "./FloatingHearts";
import { SecretRevealBox } from "./SecretRevealBox";
import { hints, siteConfig, type Hint } from "@/data/hints";

interface MainPageProps {
  onReset: () => void;
}

export const MainPage = ({ onReset }: MainPageProps) => {
  const [unlockedDates, setUnlockedDates] = useState<string[]>([]);
  const [selectedHint, setSelectedHint] = useState<Hint | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load unlocked dates from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("valentine-unlocked-dates");
    if (stored) {
      setUnlockedDates(JSON.parse(stored));
    }
  }, []);

  

    // Get today's date string in the configured timezone

    const getTodayString = () => {

      // We can't use toISOString() as it's always UTC

      // Instead, we format the date parts manually in the target timezone

      const today = new Date();

      const formatter = new Intl.DateTimeFormat('en-CA', {

        timeZone: siteConfig.timezone || undefined,

        year: 'numeric',

        month: '2-digit',

        day: '2-digit',

      });

      return formatter.format(today);

    };

  

    // Check if a hint for a given date is unlocked based on time

    const isHintUnlocked = (date: string) => {

      const now = new Date();

      const nowInTimezone = new Date(now.toLocaleString('en-US', { timeZone: siteConfig.timezone || undefined }));

  

      const unlockDate = new Date(date);

      // Special case for Valentine's day

      if (date === '2026-02-14') {

        unlockDate.setHours(20, 30, 0, 0); // 8:30 PM

      } else {

        unlockDate.setHours(0, 0, 0, 0); // Midnight

      }

  

      return nowInTimezone >= unlockDate;

    };

  

    // Check if today is Valentine's Day

    const isValentinesDay = () => {

      const today = new Date();

      const todayInTimezone = new Date(today.toLocaleString('en-US', { timeZone: siteConfig.timezone || undefined }));

      return todayInTimezone.getMonth() === 1 && todayInTimezone.getDate() === 14;

    };

     // Find today's hint

     const todayString = getTodayString();

     const potentialTodayHint = hints.find((h) => h.date === todayString);

     const todayHint = potentialTodayHint && isHintUnlocked(potentialTodayHint.date) ? potentialTodayHint : null;

     const isTodayUnlocked = unlockedDates.includes(todayString);

    

     const handleUnlockToday = () => {

       if (!isTodayUnlocked && todayHint) {

         const newUnlocked = [...unlockedDates, todayString];

         setUnlockedDates(newUnlocked);

         localStorage.setItem("valentine-unlocked-dates", JSON.stringify(newUnlocked));

       }

     };

    

     const handleHintClick = (hint: Hint) => {

       setSelectedHint(hint);

       setIsModalOpen(true);

     };

    

     return (

       <div className="min-h-screen bg-gradient-soft relative">

         <FloatingHearts />

    

         <div className="relative z-10 max-w-lg mx-auto px-4 py-8 pb-24">

           {/* Header */}

           <motion.div

            initial={{ opacity: 0, y: -20 }}

            animate={{ opacity: 1, y: 0 }}

            className="text-center mb-8"

          >

            <motion.div

              animate={{ scale: [1, 1.1, 1] }}

              transition={{ duration: 2, repeat: Infinity }}

              className="inline-block mb-4"

            >

              <Heart className="text-primary" size={48} fill="currentColor" />

            </motion.div>

            <h1 className="text-3xl sm:text-4xl font-display font-bold text-gradient-romantic mb-2">

              Valentine Countdown

            </h1>

            <p className="text-muted-foreground">

              For {siteConfig.valentineName} 💕

            </p>

          </motion.div>

  

                    {/* Countdown Timer */}

  

                    <motion.div

  

                      initial={{ opacity: 0, y: 20 }}

  

                      animate={{ opacity: 1, y: 0 }}

  

                      transition={{ delay: 0.2 }}

  

                      className="card-valentine mb-8"

  

                    >

  

                      <CountdownTimer />

  

                    </motion.div>

  

          

  

                    {/* Secret Reveal Box */}

  

                    <motion.div

  

                      initial={{ opacity: 0, y: 20 }}

  

                      animate={{ opacity: 1, y: 0 }}

  

                      transition={{ delay: 0.25 }}

  

                      className="mb-8"

  

                    >

  

                      <SecretRevealBox

  

                        hint14Feb={hints.find(h => h.date === "2026-02-14")}

  

                        onUnlock14Feb={() => handleHintClick(hints.find(h => h.date === "2026-02-14")!)}

  

                      />

  

                    </motion.div>

  

          {/* Today's Hint */}

          {todayHint && (

            <motion.div

              initial={{ opacity: 0, y: 20 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{ delay: 0.3 }}

              className="mb-8"

            >

              <HintCard

                hint={todayHint}

                isUnlocked={isTodayUnlocked}

                isToday={true}

                onUnlock={handleUnlockToday}

              />

            </motion.div>

          )}

  

          {/* No hint for today message */}

          {!todayHint && (

            <motion.div

              initial={{ opacity: 0, y: 20 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{ delay: 0.3 }}

              className="card-valentine mb-8 text-center py-8"

            >

              <p className="text-lg text-foreground mb-2">Come back later for your next clue 👀</p>

              <p className="text-sm text-muted-foreground">Patience is a virtue, my love.</p>

            </motion.div>

          )}

  

          {/* Past Hints */}

          <motion.div

            initial={{ opacity: 0, y: 20 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ delay: 0.4 }}

            className="mb-8"

          >

            <PastHints

              hints={hints.filter(hint => isHintUnlocked(hint.date))}

              unlockedDates={unlockedDates}

              onHintClick={handleHintClick}

            />

          </motion.div>

  

          {/* Memory Lane */}

          <motion.div

            initial={{ opacity: 0, y: 20 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ delay: 0.5 }}

            className="mb-8"

          >

            <MemoryLane />

          </motion.div>

  

          {/* Message in a Bottle */}

          <motion.div

            initial={{ opacity: 0, y: 20 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ delay: 0.6 }}

            className="mb-8"

          >

            <MessageInABottle />

          </motion.div>

  

          {/* Footer */}

          <motion.footer

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            transition={{ delay: 0.8 }}

            className="text-center pt-8 pb-4 border-t border-border/50"

          >

            <p className="text-sm text-muted-foreground mb-4">

              Made with 💕 just for you

            </p>

            <button

              onClick={onReset}

              className="inline-flex items-center gap-1 text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors"

            >

              <RotateCcw size={12} />

              {/* Reset (for testing) */}

            </button>

          </motion.footer>

        </div>

  

        {/* Hint Modal */}

        <HintModal

          hint={selectedHint}

          isOpen={isModalOpen}

          onClose={() => setIsModalOpen(false)}

        />

      </div>

    );

  };

  