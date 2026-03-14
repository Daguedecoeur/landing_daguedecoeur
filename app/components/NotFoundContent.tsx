"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { D12Die } from "./D12Die";

function FloatingParticle({ index }: { index: number }) {
  const size = 2 + (index % 3);
  const left = (index * 17 + 5) % 95;
  const animDuration = 4 + (index % 5);
  const animDelay = (index * 0.7) % 5;
  const top = (index * 23 + 10) % 90;

  return (
    <div
      className="absolute rounded-full bg-gold/30 sparkle-particle"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}%`,
        top: `${top}%`,
        animationDuration: `${animDuration}s`,
        animationDelay: `${animDelay}s`,
      }}
    />
  );
}

export function NotFoundContent() {
  const router = useRouter();
  const [isRolling, setIsRolling] = useState(false);

  const handleRollDice = useCallback(() => {
    if (isRolling) return;
    setIsRolling(true);

    setTimeout(() => {
      router.push("/");
    }, 2200);
  }, [isRolling, router]);

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Background particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <FloatingParticle key={i} index={i} />
      ))}

      {/* Radial glow behind dice */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={`w-[500px] h-[500px] rounded-full transition-opacity duration-700 ${
            isRolling
              ? "opacity-60"
              : "opacity-30"
          }`}
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Dice display */}
      <div
        className={`relative z-10 flex items-center gap-2 md:gap-6 mb-8 transition-all duration-500 ${
          isRolling ? "scale-110" : ""
        }`}
      >
        <D12Die label="4" isRolling={isRolling} delay={0} />
        <D12Die label="04" isRolling={isRolling} delay={150} />
      </div>

      {/* Text content */}
      <div className="relative z-10 text-center">
        <h1 className="font-cinzel text-3xl md:text-5xl text-gold mb-4 tracking-wide">
          Page non trouvée
        </h1>
        <p className="font-lato text-cream/70 text-base md:text-lg max-w-md mx-auto mb-10 leading-relaxed">
          Votre quête vous a mené dans des terres inconnues…
          <br />
          <span className="text-cream/50 text-sm">
            Les dés décideront de votre destin.
          </span>
        </p>

        {/* CTA Button */}
        <button
          onClick={handleRollDice}
          disabled={isRolling}
          className={`
            group relative inline-flex items-center gap-3 
            px-8 py-4 rounded-lg 
            font-cinzel text-lg font-semibold tracking-wider
            transition-all duration-300
            ${
              isRolling
                ? "bg-gold/20 text-gold/50 cursor-not-allowed scale-95"
                : "bg-gold text-deep-violet hover:bg-gold/90 hover:shadow-[0_0_35px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 active:scale-95"
            }
          `}
        >
          <span
            className={`text-2xl transition-transform duration-300 ${
              isRolling ? "animate-spin" : "group-hover:rotate-45"
            }`}
          >
            🎲
          </span>
          {isRolling ? "Les dés sont lancés…" : "Lancez les dés !"}
        </button>
      </div>
    </div>
  );
}
