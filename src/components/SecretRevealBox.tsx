import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { siteConfig, type Hint } from "@/data/hints";
import confetti from "canvas-confetti";

interface SecretRevealBoxProps {
  hint14Feb: Hint | undefined;
  onUnlock14Feb: () => void;
}

export const SecretRevealBox = ({ hint14Feb, onUnlock14Feb }: SecretRevealBoxProps) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0); // This is for general incorrect attempts
  const [attemptsPerHour, setAttemptsPerHour] = useState(0);
  const [lastAttemptTimestamp, setLastAttemptTimestamp] = useState<number>(0);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState(0); // in seconds

  useEffect(() => {
    const storedAttempts = localStorage.getItem("revealAttemptsPerHour");
    const storedTimestamp = localStorage.getItem("revealLastAttemptTimestamp");

    const ONE_HOUR_MS = 60 * 60 * 1000;
    const now = Date.now();

    if (storedAttempts && storedTimestamp) {
      const attempts = parseInt(storedAttempts, 10);
      const timestamp = parseInt(storedTimestamp, 10);

      if (now - timestamp < ONE_HOUR_MS) {
        setAttemptsPerHour(attempts);
        if (attempts >= 5) {
          setIsRateLimited(true);
          const remainingMs = ONE_HOUR_MS - (now - timestamp);
          setCooldownRemaining(Math.ceil(remainingMs / 1000));
          setError("You've tried too many times! Please wait.");
        }
      } else {
        // More than an hour passed, reset
        localStorage.removeItem("revealAttemptsPerHour");
        localStorage.removeItem("revealLastAttemptTimestamp");
        setAttemptsPerHour(0);
        setIsRateLimited(false);
      }
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRateLimited && cooldownRemaining > 0) {
      timer = setInterval(() => {
        setCooldownRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsRateLimited(false);
            setError("");
            localStorage.removeItem("revealAttemptsPerHour");
            localStorage.removeItem("revealLastAttemptTimestamp");
            setAttemptsPerHour(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRateLimited, cooldownRemaining]);

  const handleChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Take only the last character
    setOtp(newOtp);
    console.log("New OTP array after change:", newOtp);

    // Auto-focus to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // If all digits are entered, try to unlock
    if (newOtp.every(d => d !== "")) {
      // Pass the newOtp directly to handleUnlock to avoid stale state
      setTimeout(() => handleUnlock(newOtp), 0);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const getErrorMessage = (attemptCount: number) => {
    const messages = [
      "Hmm, that's not it... try again! 💭",
      "Nope! Think harder, my love 🤔",
      "So close... or maybe not? 😅",
      "Here's a hint: It's something special to us 💕",
      "You've got this! Think about our memories 🌟",
      "You've tried too many times! Please wait an hour. ❤️", // Rate limit message
    ];
    return messages[Math.min(attemptCount - 1, messages.length - 1)];
  };

  const handleUnlock = (finalOtp: string[] = otp) => { // Accept finalOtp as parameter, default to current otp state
    if (isRateLimited) return;

    const enteredWord = finalOtp.join(""); // Use finalOtp here
    console.log("OTP Array (in handleUnlock):", otp);
    console.log("Entered Word (in handleUnlock):", enteredWord);
    console.log("Entered Word (uppercase, in handleUnlock):", enteredWord.toUpperCase());
    console.log("Comparison result (in handleUnlock):", enteredWord.toUpperCase() === "NINATO");
    if (enteredWord.toUpperCase() === "NINATO") { // Comparison itself remains .toUpperCase()
      setError("");
      onUnlock14Feb();

      // Reset everything
      setOtp(Array(6).fill(""));
      setAttempts(0);
      setAttemptsPerHour(0);
      setLastAttemptTimestamp(0);
      setIsRateLimited(false);

      localStorage.removeItem("revealAttemptsPerHour");
      localStorage.removeItem("revealLastAttemptTimestamp");

      // 🎉 Confetti
      const duration = 5000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });

        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();

      return;
    }

    // ❌ Incorrect word
    setAttempts((prev) => prev + 1);
    setError(getErrorMessage(attempts + 1));
    setOtp(Array(6).fill(""));
    inputRefs.current[0]?.focus();
  };

  return (

    <motion.div

      initial={{ opacity: 0, scale: 0.9 }}

      animate={{ opacity: 1, scale: 1 }}

      className="card-valentine overflow-hidden"

    >

      <AnimatePresence mode="wait">

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

            <div className="flex justify-center gap-2 mb-4">

              {otp.map((digit, index) => (

                <Input

                  key={index}

                  type="text"

                  maxLength={1}

                  value={digit}

                  onChange={(e) => handleChange(index, e.target.value)}

                  onKeyDown={(e) => handleKeyDown(index, e)}

                  ref={(el) => (inputRefs.current[index] = el)}

                  className="w-10 h-10 text-center text-xl font-bold bg-background/50 border-primary/30 focus:border-primary"

                />

              ))}

            </div>



            <AnimatePresence>



              {error && (



                <motion.p



                  initial={{ opacity: 0, y: -10 }}



                  animate={{ opacity: 1, y: 0 }}



                  exit={{ opacity: 0 }}



                  className="text-sm text-primary"



                >



                  {isRateLimited ? `Try again in ${Math.floor(cooldownRemaining / 60)}m ${cooldownRemaining % 60}s` : error}



                </motion.p>



              )}



            </AnimatePresence>

            <Button

              onClick={handleUnlock}

              className="w-full btn-valentine"

              disabled={otp.some(d => d === "") || isRateLimited}

            >

              <Unlock size={18} />

              Unlock the Secret

            </Button>

            <p className="text-xs text-muted-foreground/70">

              Hint: Think about a very special name... 💕, it has a letter 'A'

            </p>            </div>

        </motion.div>

      </AnimatePresence>

    </motion.div>

  );
};
