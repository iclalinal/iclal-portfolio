import { m } from "framer-motion";

interface ParticleProps {
  count?: number;
  size?: "sm" | "md";
  opacity?: "low" | "medium";
}

export default function AnimatedParticles({ 
  count = 3, 
  size = "sm", 
  opacity = "low" 
}: ParticleProps) {
  const positions = [
    { left: "20%", top: "25%" },
    { left: "80%", top: "15%" },
    { left: "35%", top: "75%" },
    { left: "65%", top: "45%" },
    { left: "15%", top: "60%" },
    { left: "85%", top: "70%" },
  ].slice(0, count);

  const sizeClass = size === "sm" ? "w-px h-px" : "w-1 h-1";
  const opacityRange = opacity === "low" ? [0.1, 0.3, 0.1] : [0.2, 0.5, 0.2];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {positions.map((position, i) => (
        <m.div
          key={i}
          className={`absolute ${sizeClass} bg-cyan-400/20 rounded-full`}
          style={{ left: position.left, top: position.top }}
          animate={{
            y: [-10, -20, -10],
            opacity: opacityRange,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6 + (i % 3),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
}
