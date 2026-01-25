import { createBrowserRouter } from "react-router";
import MainLayout from "./layouts/MainLayout.jsx";
import HomePage from "./Pages/HomePage.jsx";
import AboutMe from "./Pages/AboutMe.jsx";
import Projects from "./Pages/Projects.jsx";
import ContactMe from "./Pages/ContactMe.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about-me",
        element: <AboutMe />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "contact-me",
        element: <ContactMe />,
      },
    ],
  },
]);

export default router;
