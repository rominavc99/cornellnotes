import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginComponent from "./LoginComponent";
import HomeComponent from "./HomeComponent";
import SignInSide from "./SingInSide";
import ProtectedRoute from "./ProtectedRoute"; 
import AboutUs from "./AboutUs";
import Documentation from "./Documentation";
import Footer from "./Footer";
import { Box } from "@mui/material";
import PrivacyTerms from "./PrivacyTerms";

const AppRouter = () => {
  
  return (
    <Router>
      <Box sx={{ pb: 10 }}>
        <Routes>
          <Route exact path="/" element={<SignInSide />} />
          <Route path="/home" element={<HomeComponent />} />
          <Route exact path="/aboutus" element={<AboutUs />} />
          <Route exact path="/documentation" element={<Documentation />} />
          <Route exact path="/privacy" element={<PrivacyTerms />} />
        </Routes>
      </Box>
      <Footer />
    </Router>
  );
};

export default AppRouter;
