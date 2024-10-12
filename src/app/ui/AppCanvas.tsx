"use client";

import "../styles.css";

import {
  AccumulativeShadows,
  Center,
  Decal,
  Environment,
  RandomizedLight,
  useGLTF,
} from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import React, { useContext, useEffect, useState } from "react";

import { easing } from "maath";
import { state } from "./store";
import { useRef } from "react";
import { useSnapshot } from "valtio";
import { TextureLoader } from "three";
import { DecalStateContext } from "./decalStateContext";
import { ThemeContext } from "./themeContext";

export const AppCanvas = ({
  position = [0, 0, 2.5],
  fov = 25,
  forwardRef,
}: {
  position?: [number, number, number];
  fov?: number;
  forwardRef?: React.RefObject<HTMLElement>;
}) => {
  const [eventSource, setEventSource] = useState<HTMLElement>();

  useEffect(() => {
    if (forwardRef?.current) {
      setEventSource(forwardRef.current);
    }
  }, [forwardRef]);

  return (
    <Canvas
      shadows
      camera={{ position: position as [number, number, number], fov }}
      gl={{ preserveDrawingBuffer: true }}
      eventSource={eventSource}
      eventPrefix="client"
    >
      <ambientLight intensity={0.5} />
      <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />
      <CameraRig>
        <Backdrop />
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  );
};

function Backdrop() {
  const shadows = useRef();
  useFrame((state, delta) =>
    easing.dampC(
      shadows.current.getMesh().material.color,
      state.color,
      0.25,
      delta
    )
  );
  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
    >
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.55}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight
        amount={4}
        radius={5}
        intensity={0.25}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  );
}

function CameraRig({ children }: { children: React.ReactNode }) {
  const group = useRef();
  const snap = useSnapshot(state);

  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [snap.intro ? -state.viewport.width / 4 : 0, 0, 2],
      0.25,
      delta
    );
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    );
  });
  return <group ref={group}>{children}</group>;
}

function Shirt(props: any) {
  const { theme } = useContext(ThemeContext);
  const { decals, selectedDecal } = useContext(DecalStateContext);
  const [selectedDecalUrl, setSelectedDecalUrl] = useState<string>();

  useEffect(() => {
    if (selectedDecal) {
      const decal = decals.find((decal) => decal.name === selectedDecal);
      setSelectedDecalUrl(decal?.decalLink || "");
    }
  }, [selectedDecal, decals]);

  const texture = selectedDecalUrl
    ? useLoader(TextureLoader, selectedDecalUrl)
    : null;

  const { nodes, materials } = useGLTF("/shirt_baked_collapsed.glb");
  useFrame((state, delta) =>
    easing.dampC(materials.lambert1.color, theme, 0.25, delta)
  );
  return (
    <mesh
      castShadow
      geometry={nodes.T_Shirt_male.geometry}
      material={materials.lambert1}
      material-roughness={1}
      {...props}
      dispose={null}
    >
      {texture ? (
        <Decal
          position={[0, 0.04, 0.15]}
          rotation={[0, 0, 0]}
          scale={0.15}
          map={texture}
          mapAnisotropy={16}
        />
      ) : null}
    </mesh>
  );
}
