import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import Load from "./components/Load/Load";
import { AuthContext, AuthProvider } from "./api/auth.api";
// import { useContext } from "react";
import Logout from "./pages/Auth/logout";

const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const PageNotFound = lazy(() => import("./pages/pageNotFound/PageNotFound"));
const Home = lazy(() => import("./pages/Home/Home"));
const CoursePage = lazy(() => import("./pages/Course/CoursePage"));

function App() {
  // const auth = useContext(AuthContext);
  const [colorScheme, setColorScheme] = React.useState(
    localStorage.getItem("colorScheme") || "dark"
  );
  const [primaryColor, setPrimaryColor] = React.useState(
    localStorage.getItem("primaryColor") || "red"
  );

  const toggleColorScheme = (value) => {
    if (!value) {
      localStorage.setItem(
        "colorScheme",
        colorScheme === "dark" ? "light" : "dark"
      );
      setColorScheme(colorScheme === "dark" ? "light" : "dark");
    } else {
      localStorage.setItem("primaryColor", value);
      setPrimaryColor(value);
    }
  };

  return (
    <AuthProvider>
      <MantineProvider
        theme={{ colorScheme, primaryColor, loader: "bars" }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NotificationsProvider position="top-center" zIndex={2077}>
          <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
          >
            <BrowserRouter>
              <Suspense fallback={<Load></Load>}>
                <Routes>
                  {/* <Route exact path="/" element={auth ? <Login /> : <Home /> }/> */}
                  <Route exact path="/" element={<Home />} />
                  <Route exact path="/login" element={<Login />} />
                  <Route exact path="/logout" element={<Logout />} />
                  <Route exact path="/register" element={<Register />} />
                  <Route exact path="/profile" element={<Profile />} />
                  <Route exact path="/course/:id/:uuid" element={<CoursePage />} />
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </ColorSchemeProvider>
        </NotificationsProvider>
      </MantineProvider>
    </AuthProvider>
  );
}

export default App;
