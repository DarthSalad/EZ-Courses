import {
  Header,
  Menu,
  Group,
  Center,
  Burger,
  Container,
  ActionIcon,
  useMantineColorScheme,
  Button,
} from "@mantine/core";
import Sidebar from "../Sidebar/Sidebar";
import { useDisclosure } from "@mantine/hooks";
import {
  IconSchool,
  IconChevronDown,
  IconSun,
  IconMoonStars,
  IconCircle,
} from "@tabler/icons";
import { Link } from "react-router-dom";
import { useStyles } from "./Navbar.styles";
import { useContext } from "react";
import { AuthContext } from "../../api/auth.api";

const links = [
  { link: "/", label: "Home" },
  {
    link: "/profile",
    label: "Profile",
  },
  // {
  //   link: "/contact",
  //   label: "Contact Us",
  // },
];

const colors = [
  { label: "Red", value: "red" },
  { label: "Pink", value: "pink" },
  { label: "Violet", value: "violet" },
  { label: "Cyan", value: "cyan" },
  { label: "Teal", value: "teal" },
  { label: "Green", value: "green" },
  { label: "Lime", value: "lime" },
  { label: "Orange", value: "orange" },
];

export default function Navbar() {
  // const [auth, wait] = useAuthState(auth);
  const auth = useContext(AuthContext);
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const navigate = (link) => {
    window.location.href=link;
  };

  const dark = colorScheme === "dark";

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link} onClick={() => navigate(item.link)}>
        {item.label}
      </Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" exitTransitionDuration={0}>
          <Menu.Target>
            <a href={link.link} className={classes.link}>
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={12} stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link key={link.label} to={link.link} className={classes.link}>
        {link.label}
      </Link>
    );
  });

  items.push(
    <>
      <Link
        key="Logout"
        to={(auth ? "/logout" : "/register")}
        className={classes.link}
      >
        {(auth ? "Logout" : "Register")}
      </Link>
      <Menu key="Select" trigger="hover" exitTransitionDuration={0}>
        <Menu.Target>
          <Button>Toggle Color</Button>
        </Menu.Target>

        <Menu.Dropdown>
          {colors.map((color) => (
            <Menu.Item
              key={color.value}
              icon={<IconCircle fill={color.value} size={14}></IconCircle>}
              onClick={() => toggleColorScheme(color.value)}
            >
              {color.label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </>
  );

  items.push(
    <Menu key="button" trigger="hover" exitTransitionDuration={0}>
      <Menu.Target>
        <ActionIcon
          variant="default"
          color="white"
          onClick={() => toggleColorScheme()}
          title="Toggle color scheme"
        >
          {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
        </ActionIcon>
      </Menu.Target>
    </Menu>
  );

  return (
    <>
      <Sidebar showModal={opened} setShowModal={toggle}></Sidebar>
      <Header height={56} className={classes.header} mb={120}>
        <Container>
          <div className={classes.inner}>
            <IconSchool size={28} />
            <Group spacing={5} className={classes.links}>
              {items}
            </Group>
            <Burger
              opened={opened}
              onClick={toggle}
              className={classes.burger}
              size="sm"
              color="#fff"
            />
          </div>
        </Container>
      </Header>
    </>
  );
}
