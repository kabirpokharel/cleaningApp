import { DefaultTheme } from "react-native-paper";

const defaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    backgroundColor: "#ffffff",
    primary: "tomato",
    accent: "yellow",
  },
};

const primary = {
  dark: false,
  roundness: 4,
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#034748",
    accent: "#11B5E4",
    background: "#FFFFFF",
    surface: "#FFFFFF",
    text: "#001021",
    error: "#B71F0E",
    disabled: "#BEC6C6",
    placeholder: "#1481BA",
    backdrop: "#001021",
  },
  // fonts: configureFonts(fonts),
  animation: { scale: 1.0 },
};

const primaryDark = {
  dark: false,
  roundness: 4,
  colors: {
    primary: "#1481BA",
    accent: "#11B5E4",
    background: "#343434",
    surface: "#3a3a3a",
    text: "#FFFFFF",
    error: "#B71F0E",
    disabled: "#FFFFFF",
    placeholder: "#034748",
    backdrop: "#343434",
  },
  // fonts: configureFonts(fonts),
  animation: { scale: 1.0 },
};

export { defaultTheme, primary, primaryDark };
