import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./scenes/homePage";
import SignIn from "./scenes/login";
import SignUp from "./scenes/signUp";
import LoggedInRoutes from "./productedRoutes/LoggedInRoutes";
import NotLoggedInRoutes from "./productedRoutes/NotLoggedInRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<LoggedInRoutes />}>
            <Route path="/" element={<HomePage />} />
          </Route>

          <Route element={<NotLoggedInRoutes />}>
            <Route path="/login" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
