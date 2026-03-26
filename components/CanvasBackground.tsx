"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function NoisePlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uOpacity: { value: 0.08 },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        transparent={true}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform float uOpacity;
          varying vec2 vUv;

          float random(vec2 p) {
            return fract(sin(dot(p.xy, vec2(12.9898,78.233))) * 43758.5453123);
          }

          void main() {
             vec2 uv = vUv * 100.0;
             float noise = random(uv + fract(uTime * 10.0));
             gl_FragColor = vec4(vec3(0.5), noise * uOpacity);
          }
        `}
      />
    </mesh>
  );
}

export default function CanvasBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none mix-blend-difference">
      <Canvas orthographic camera={{ position: [0, 0, 1] }}>
        <NoisePlane />
      </Canvas>
    </div>
  );
}
