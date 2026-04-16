"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, useTexture } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import type { Group, Mesh } from "three";

function Book() {
  const group = useRef<Group | null>(null);
  const left = useRef<Mesh | null>(null);
  const right = useRef<Mesh | null>(null);
  const texture = useTexture("/paper.jpg");
  const elapsedTime = useRef(0);

  useFrame((_, delta) => {
    elapsedTime.current += delta;
    const t = elapsedTime.current;

    if (group.current) {
      group.current.position.y = Math.sin(t * 1.4) * 0.05;
      group.current.rotation.z = Math.sin(t * 0.8) * 0.03;
    }

    if (left.current && right.current) {
      const openProgress = Math.min(t / 2.2, 1);
      const eased = 1 - Math.pow(1 - openProgress, 3);
      const angle = Math.PI * 0.98 * eased;

      left.current.rotation.y = -angle;
      right.current.rotation.y = angle;
    }
  });

  return (
    <group ref={group} scale={0.8}>
      <mesh ref={left} position={[-0.6, 0, 0]}>
        <boxGeometry args={[1, 1.5, 0.02]} />
        <meshStandardMaterial map={texture} color="#f8f1dc" />
      </mesh>
      <mesh ref={right} position={[0.6, 0, 0]}>
        <boxGeometry args={[1, 1.5, 0.02]} />
        <meshStandardMaterial map={texture} color="#f8f1dc" />
      </mesh>
    </group>
  );
}

function CameraAnimation() {
  const time = useRef(0);

  useFrame((state, delta) => {
    time.current += delta;
    const t = time.current;

    state.camera.position.x = Math.sin(t * 0.4) * 0.2;
    state.camera.position.y = Math.sin(t * 0.3) * 0.05;
    state.camera.position.z = 3 - Math.min(t * 0.2, 1.2);
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function CinematicIntro({ onComplete }: { onComplete?: () => void }) {
  const [phase, setPhase] = useState<"visible" | "fading" | "hidden">("visible");
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Skip heavy intro on mobile
  useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => {
        onComplete?.();
      }, 1500); // intro خفيف للموبايل

      return () => clearTimeout(timer);
    }
  }, [isMobile, onComplete]);

  useEffect(() => {
    if (isMobile) return;

    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const fadeTimer = setTimeout(() => {
      setPhase("fading");

      const hideTimer = setTimeout(() => {
        setPhase("hidden");
        onComplete?.();
      }, 1000);

      return () => clearTimeout(hideTimer);
    }, 5000);

    return () => {
      document.documentElement.style.overflow = prevOverflow;
      clearTimeout(fadeTimer);
    };
  }, [isMobile, onComplete]);

  if (phase === "hidden") return null;

  return (
    <div
      style={{ height: "100vh" }}
      className={`fixed inset-0 z-[9999] transition-opacity duration-1000 ${
        phase === "fading" ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Desktop فقط */}
      {!isMobile && (
        <Canvas camera={{ position: [0, 0, 3], fov: 40 }}>
          <color attach="background" args={["#0b1220"]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 3, 4]} intensity={1.2} />

          <Suspense fallback={null}>
            <Stars radius={10} depth={20} count={300} factor={2} />
            <Book />
          </Suspense>

          <CameraAnimation />
        </Canvas>
      )}

      {/* Overlay Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-3xl md:text-5xl font-black tracking-widest">
        <div className="mb-2">
          {"EduPlatform".split("").map((c, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.08}s` }}>
              {c}
            </span>
          ))}
        </div>
        <span className="text-xs tracking-[0.4em] opacity-70">
          Explained in the simplest way
        </span>
      </div>
    </div>
  );
}