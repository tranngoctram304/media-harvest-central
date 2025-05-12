
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import DownloadVideo from "./pages/DownloadVideo";
import NotFound from "./pages/NotFound";

// Define the application routes
const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DownloadVideo />,
      },
      {
        path: "download-video",
        element: <DownloadVideo />,
      },
      // Add more routes here as needed
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  }
]);

export default routes;
