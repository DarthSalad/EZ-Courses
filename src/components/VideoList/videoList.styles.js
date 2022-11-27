import { createStyles } from "@mantine/core";

export const useStyle = createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    borderRadius: theme.radius.md,
    // border: `solid 2px ${theme.colors[theme.primaryColor][4]}`,
    cursor: "pointer",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
  selected: {
    border: `solid 2px ${theme.colors[theme.primaryColor][4]}`,
  }
}));
