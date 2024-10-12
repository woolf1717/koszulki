import { ReactNode } from "react";
import { DecalStateContextProvider } from "./decalStateContext";
import { ThemeContextProvider } from "./themeContext";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeContextProvider>
      <DecalStateContextProvider>{children}</DecalStateContextProvider>;
    </ThemeContextProvider>
  );
};
