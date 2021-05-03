// @ts-expect-error: missing declaration files for package
import { default as preset } from "@rebass/preset";

export const theme = Object.assign(
  preset,
  {
    colors: {
      ...preset.colors,
      warn: "#e2444d",
      accent: "#3b9b4a",
      dark: "#243643",
      inverted: "#fff",
      discrete: "#98a6af",
    },
  },
  {}
);
