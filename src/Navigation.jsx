import { createBrowserRouter } from "react-router";
import MainLayout from "./layouts/MainLayout.jsx";


import Projects from "./Pages/Projects.jsx";
import ContactMe from "./Pages/ContactMe.jsx";
import Home from "./pages/Home/Home.jsx";
import About from "./Pages/About/About.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home/>,
      },
      {
        path: "about-me",
        element: <About/>,
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
