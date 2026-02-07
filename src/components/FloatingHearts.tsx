import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface FloatingHeart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
}

export const FloatingHearts = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    const initialHearts: FloatingHeart[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 10,
    }));
    setHearts(initialHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-valentine-pink opacity-40"
          style={{
            left: `${heart.x}%`,
            bottom: "-50px",
            fontSize: `${heart.size}px`,
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            rotate: [0, 360],
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Heart fill="currentColor" size={heart.size} />
        </motion.div>
      ))}
    </div>
  );
};