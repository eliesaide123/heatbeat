import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { siteConfig } from "@/data/hints";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isValentinesDay, setIsValentinesDay] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      let targetDate = new Date(siteConfig.targetDate + "T00:00:00");
      
      // If target date has passed, set to next year's Feb 14
      if (now > targetDate) {
        targetDate = new Date(now.getFullYear() + 1, 1, 14);
      }

      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setIsValentinesDay(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="relative">
        <div className="bg-card rounded-2xl p-3 sm:p-4 min-w-[60px] sm:min-w-[80px] shadow-lg border border-border">
          <motion.span
            key={value}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-4xl font-bold text-gradient-romantic font-display block text-center"
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </div>
      </div>
      <span className="text-xs sm:text-sm text-muted-foreground mt-2 uppercase tracking-wider">
        {label}
      </span>
    </motion.div>
  );

  if (isValentinesDay) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Heart className="mx-auto text-primary mb-4" size={60} fill="currentColor" />
        </motion.div>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-gradient-romantic">
          It's Valentine's Day! 💘
        </h2>
        <p className="text-muted-foreground mt-2">The day we've been waiting for!</p>
      </motion.div>
    );
  }

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="text-center">
      <p className="text-sm text-muted-foreground mb-2">Today is</p>
      <p className="text-lg font-medium text-foreground mb-4">{today}</p>
      
      <div className="flex justify-center gap-2 sm:gap-4 mb-6">
        <TimeBlock value={timeLeft.days} label="Days" />
        <TimeBlock value={timeLeft.hours} label="Hours" />
        <TimeBlock value={timeLeft.minutes} label="Mins" />
        <TimeBlock value={timeLeft.seconds} label="Secs" />
      </div>
      
      <motion.p
        className="text-lg sm:text-xl font-medium text-foreground"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        until February 14 💘
      </motion.p>
    </div>
  );
};