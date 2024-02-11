import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginComponent from "./LoginComponent";
import HomeComponent from "./HomeComponent";
import SignInSide from "./SingInSide";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SignInSide />} />
        <Route path="/home" element={<HomeComponent />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
