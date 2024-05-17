import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import SideNavLayout from "./layouts/SideNavLayout";
import "highlight.js/styles//a11y-dark.min.css";
import "./assets/css/main.css";
import "@ionic/react/css/core.css";
import ChatLayout from "./layouts/ChatLayout";
import PromptLayout from "./layouts/PromptLayout";
import UploadLayout from "./layouts/UploadLayout";


const AppLayout = () => {
  return (
    <>
      <SideNavLayout />
      <Outlet />
    </>

  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <ChatLayout />,
      },

      {
        path: "/chat",
        element: <ChatLayout />,
      },
      {
        path: "/prompt",
        element: (
          <Suspense fallback={<h1>Loading....</h1>}>
            <PromptLayout />
          </Suspense>
        ),
      },
      {
        path: "/upload",
        element: <UploadLayout />
      },
    ],
    errorElement: <h1> Error Page</h1>,
  },
]);



const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(<RouterProvider router={appRouter} />);
