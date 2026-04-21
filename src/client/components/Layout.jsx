import React from "react";
import LightRays from "./LightRays";

const Layout = ({ children }) => {
  return (
    <div style={{ position: "relative", minHeight: "100vh", backgroundColor: "white" }}>
      {/* Световые лучи */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <LightRays
          raysOrigin="bottom-center"
          raysColor="black"
          raysSpeed={0.7}
          lightSpread={1.6}
          rayLength={1.2}
          followMouse={false}
          mouseInfluence={0.2}
          noiseAmount={0.1}
          distortion={0.05}
          pulsating={true}
          fadeDistance={1.3}
          saturation={0}
        />
      </div>

      {/* Контент поверх лучей */}
      <div style={{ position: "relative", zIndex: 1, color: "white" }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;