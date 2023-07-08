import { extendTheme } from "@chakra-ui/react";

const theme1 = extendTheme({
  colors: {
    primary: {
      1: "#FEE2E2",
      2: "#FECACA",
      3: "#FECACA",
      4: "#FECACA",
      5: "#FECACA",
    },
  },
});

const theme2 = extendTheme({
  colors: {
    primary: {
        1: "#FEE2E2",
        2: "#FECACA",
        3: "#FECACA",
        4: "#FECACA",
        5: "#FECACA",
    },
  },
});

export { theme1, theme2 };
