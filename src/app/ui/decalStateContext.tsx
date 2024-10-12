"use client";

import { createContext, ReactNode } from "react";
import { useFetchDecals } from "../hooks/useFetchDecals";

const initialState = {
  decals: [],
  setDecals: () => {},
  selectedDecal: null,
  setSelectedDecal: (decal: string | null) => {},
};

export const DecalStateContext = createContext(initialState);

export const DecalStateContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { decals, setDecals, selectedDecal, setSelectedDecal } =
    useFetchDecals();
  return (
    <DecalStateContext.Provider
      value={{ decals, setDecals, selectedDecal, setSelectedDecal }}
    >
      {children}
    </DecalStateContext.Provider>
  );
};
