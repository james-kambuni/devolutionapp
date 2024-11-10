import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./assets/css/tailwind.output.css";
import App from "./App";
import { SidebarProvider } from "./context/SidebarContext";
import { UserProvider } from './context/UserContext';
import ThemedSuspense from "./components/ThemedSuspense";
import { Windmill } from "@windmill/react-ui";
import windmillTheme from "./windmillTheme";
import './index.css'

ReactDOM.render(
  <UserProvider>
    <SidebarProvider>
      <Suspense fallback={<ThemedSuspense />}>
        <Windmill usePreferences theme={windmillTheme}>
          <App />
        </Windmill>
      </Suspense>
    </SidebarProvider>
  </UserProvider>,
  document.getElementById("root")
);
