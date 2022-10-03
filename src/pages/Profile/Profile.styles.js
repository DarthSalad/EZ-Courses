import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  main: {
    height: "fit-content",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    background: `linear-gradient(-22deg, ${
      theme.colors[theme.primaryColor][4]
    } 11%, ${theme.colors[theme.primaryColor][7]} 125% )`,

    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: "3rem",
    fontWeight: "1000",
    marginBottom: "4rem",
    marginTop: "-2rem",
  }
}));
