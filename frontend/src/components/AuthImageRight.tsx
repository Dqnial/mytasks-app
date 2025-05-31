import React, { useCallback } from "react";
import Particles from "react-particles";
import type { Engine, Container } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

interface AuthImageRightProps {
  title: string;
  subtitle: string;
}

const AuthImageRight: React.FC<AuthImageRightProps> = ({ title, subtitle }) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      console.log("Particles loaded", container);
    },
    []
  );

  return (
    <div
      className="hidden lg:flex relative items-center justify-center bg-base-300"
      style={{ position: "relative" }}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        className="absolute inset-0"
        options={{
          fullScreen: { enable: false },
          background: { color: { value: "transparent" } },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: { enable: true, mode: "push" },
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
            modes: {
              push: { quantity: 4 },
              repulse: { distance: 200, duration: 0.4 },
            },
          },
          particles: {
            color: { value: "#888888" },
            links: {
              color: "#888888",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 0.5,
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              outModes: { default: "bounce" },
            },
            number: { value: 60, density: { enable: true, area: 800 } },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
      />
      <div className="z-10 text-center max-w-md p-6">
        <h2 className="text-4xl font-bold">{title}</h2>
        <p className="text-base-content/60 mt-4">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImageRight;
