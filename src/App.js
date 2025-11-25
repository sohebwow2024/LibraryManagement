// import { useState, useEffect, useMemo } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// // react-router components
// import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// // @mui material components
// import { ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
// import Icon from "@mui/material/Icon";

// // Material Dashboard 2 React components
// import MDBox from "components/MDBox";

// // Material Dashboard 2 React example components
// import Sidenav from "examples/Sidenav";
// import Configurator from "examples/Configurator";

// // Material Dashboard 2 React themes
// import theme from "assets/theme";
// import themeRTL from "assets/theme/theme-rtl";

// // Material Dashboard 2 React Dark Mode themes
// import themeDark from "assets/theme-dark";
// import themeDarkRTL from "assets/theme-dark/theme-rtl";

// // RTL plugins
// import rtlPlugin from "stylis-plugin-rtl";
// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";

// // Material Dashboard 2 React routes
// import routes from "routes";

// // Material Dashboard 2 React contexts
// import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// // Images
// import brandWhite from "assets/images/logo-ct.png";
// import brandDark from "assets/images/logo-ct-dark.png";
// import AddBooks from "components/CustomeComponents/AddBooks";
// import SignIn from "components/CustomeComponents/SignIn";

// import PrivateRoute from "routes/PrivateRoute";
// import LibSignOut from "../src/layouts/profile/LibSignOut";
// import LibChangePassword from "../src/layouts/profile/LibChangePassword";

// export default function App() {
//   const [controller, dispatch] = useMaterialUIController();
//   const {
//     miniSidenav,
//     direction,
//     layout,
//     openConfigurator,
//     sidenavColor,
//     transparentSidenav,
//     whiteSidenav,
//     darkMode,
//   } = controller;
//   const [onMouseEnter, setOnMouseEnter] = useState(false);
//   const [rtlCache, setRtlCache] = useState(null);
//   const { pathname } = useLocation();

//   // Cache for the rtl
//   useMemo(() => {
//     const cacheRtl = createCache({
//       key: "rtl",
//       stylisPlugins: [rtlPlugin],
//     });

//     setRtlCache(cacheRtl);
//   }, []);

//   // Open sidenav when mouse enter on mini sidenav
//   const handleOnMouseEnter = () => {
//     if (miniSidenav && !onMouseEnter) {
//       setMiniSidenav(dispatch, false);
//       setOnMouseEnter(true);
//     }
//   };

//   // Close sidenav when mouse leave mini sidenav
//   const handleOnMouseLeave = () => {
//     if (onMouseEnter) {
//       setMiniSidenav(dispatch, true);
//       setOnMouseEnter(false);
//     }
//   };

//   // Change the openConfigurator state
//   const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

//   // Setting the dir attribute for the body element
//   useEffect(() => {
//     document.body.setAttribute("dir", direction);
//   }, [direction]);

//   // Setting page scroll to 0 when changing the route
//   useEffect(() => {
//     document.documentElement.scrollTop = 0;
//     document.scrollingElement.scrollTop = 0;
//   }, [pathname]);

//   const getRoutes = (allRoutes) =>
//     allRoutes.map((route) => {
//       if (route.collapse) {
//         return getRoutes(route.collapse);
//       }

//       if (route.route) {
//         return <Route exact path={route.route} element={route.component} key={route.key} />;
//       }

//       return null;
//     });

//   const configsButton = (
//     <MDBox
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       width="3.25rem"
//       height="3.25rem"
//       bgColor="white"
//       shadow="sm"
//       borderRadius="50%"
//       position="fixed"
//       right="2rem"
//       bottom="2rem"
//       zIndex={99}
//       color="dark"
//       sx={{ cursor: "pointer" }}
//       onClick={handleConfiguratorOpen}
//     >
//       <Icon fontSize="small" color="inherit">
//         settings
//       </Icon>
//     </MDBox>
//   );

//   return direction === "rtl" ? (
//     <CacheProvider value={rtlCache}>
//       <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
//         <CssBaseline />
//         {layout === "dashboard" && (
//           <>
//             <Sidenav
//               color={sidenavColor}
//               brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
//               brandName="LMS"
//               routes={routes}
//               onMouseEnter={handleOnMouseEnter}
//               onMouseLeave={handleOnMouseLeave}
//             />
//             <Configurator />
//             {configsButton}
//           </>
//         )}
//         {layout === "vr" && <Configurator />}
//         <Routes>
//           {getRoutes(routes)}
//           <Route path="*" element={<Navigate to="/Add" />} />
//         </Routes>
//       </ThemeProvider>
//     </CacheProvider>
//   ) : (
//     <ThemeProvider theme={darkMode ? themeDark : theme}>
//       <CssBaseline />
//       {layout === "dashboard" && (
//         <>
//           <Sidenav
//             color={sidenavColor}
//             brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
//             brandName="LMS"
//             routes={routes}
//             onMouseEnter={handleOnMouseEnter}
//             onMouseLeave={handleOnMouseLeave}
//           />
//           <Configurator />
//           {configsButton}
//         </>
//       )}
//       {layout === "vr" && <Configurator />}
//       <Routes>
//          <Route path="/SignIn" element={<SignIn />} />
//         {getRoutes(routes)}
//         <Route path="*" element={<Navigate to="/dashboard" />} />
//         {/* <Route path="/add" element={<AddBooks />} /> */}
//       </Routes>
//     </ThemeProvider>
//   );
// }

import { useState, useEffect, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// React Router
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// MUI
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard Components
import MDBox from "components/MDBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL setup
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Routes + Context
import routes from "routes";
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";

// Custom Components
import SignIn from "layouts/profile/LibSignIn";
import LibSignOut from "layouts/profile/LibSignOut";
import LibChangePassword from "layouts/profile/LibChangePassword";
import PrivateRoute from "routes/PrivateRoute";

export default function App() {
  const location = useLocation();

  // Pages that should NOT show the layout (sidebar/header)
  const hideLayoutRoutes = ["/SignIn", "/LibSignOut", "/LibChangePassword"];
  const shouldShowLayout = !hideLayoutRoutes.includes(location.pathname);

  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;

  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // Cache for RTL
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });
    setRtlCache(cacheRtl);
  }, []);

  // Sidenav hover handlers
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Set direction (LTR / RTL)
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Scroll to top on route change
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  // Route generator
  // const getRoutes = (allRoutes) =>
  //   allRoutes.flatMap((route) => {
  //     if (route.collapse) return getRoutes(route.collapse);
  //     if (route.route) {
  //       return <Route path={route.route} element={route.component} key={route.key} />;
  //     }
  //     return [];
  //   });

  const getRoutes = (allRoutes) =>
    allRoutes.flatMap((route) => {
      if (route.collapse) return getRoutes(route.collapse);
      if (route.route) {
        return <Route path={route.route} element={route.component} key={route.key} />;
      }
      return [];
    });

  // Floating settings button
  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  // ==============================
  // 🔥 MAIN RETURN SECTION
  // ==============================
  const LayoutWrapper = (
    <>
      {/* ✅ Show Sidebar + Configurator only if not on SignIn/Logout/ChangePassword */}
      {shouldShowLayout && layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="LMS"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}

      {layout === "vr" && <Configurator />}

      <Routes>
        {/* Public Routes */}
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignOut" element={<LibSignOut />} />
        {/* Protected Routes (Dashboard, etc.) */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Routes>{getRoutes(routes)}</Routes>
            </PrivateRoute>
          }
        />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/SignIn" />} />
      </Routes>
    </>
  );

  // ==============================
  // 🔥 APPLY THEME + RETURN
  // ==============================
  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
        <CssBaseline />
        {LayoutWrapper}
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {LayoutWrapper}
    </ThemeProvider>
  );
}
