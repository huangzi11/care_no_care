import React, { useState, useEffect } from "react";
import { AllCards } from "./pages/HomeCard.js";
import { CommunityPage } from "./pages/Chat.js";
import { Routes, Route, Navigate } from "react-router-dom";
import _ from "lodash";
import Header from "./components/header";
import Footer from "./components/footer";
import LoginPage from "./pages/SignIn";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import LogOutModal from "./pages/LogOut.js";
import CommunityDetail from "./pages/CommunityDetail";
import ComparisonTable from "./pages/RankPage.js";
import ChatDetail from "./pages/ChatDetail.js";

const App = (props) => {
  // Initialize infoData and order states
  const [order, setOrder] = useState(props.info_data);

  const applySort = (value) => {
    if (value === "") {
      setOrder(_.sortBy(order, ["id"]));
    }
  };

  // Because all option are in the category and different option will have different filter ways,
  // I need to use if here but revise the hardcoding for filterOptions
  const applyFilters = (e) => {
    let filteredData = infoData.filter((info) => {
      for (const [key, value] of Object.entries(filterOptions)) {
        if (value) {
          if (
            key === "Student Organization" &&
            !info.category.includes("Student Organization")
          ) {
            return false;
          }
          if (key === "Election" && !info.category.includes("Election")) {
            return false;
          } else if (
            key === "Scholarships" &&
            !info.category.includes("Scholarships")
          ) {
            return false;
          } else if (
            key === "Diversity" &&
            !info.category.includes("Diversity")
          ) {
            return false;
          } else if (
            key === "Industry" &&
            !info.category.includes("Industry")
          ) {
            return false;
          } else if (
            key === "Career Opportunities" &&
            !info.category.includes("Career Opportunities")
          ) {
            return false;
          } else if (
            key === "Panel Talk" &&
            !info.category.includes("Panel Talk")
          ) {
            return false;
          }
        }
      }
      return true;
    });
    setOrder(filteredData);
  };
  const [filterOptions, setFilterOptions] = useState(() => {
    const savedOptions = localStorage.getItem("filterOptions");
    return savedOptions ? JSON.parse(savedOptions) : {};
  });

  const [infoData, setInfoData] = useState(() => {
    const savedInfoData = localStorage.getItem("infoData");
    return savedInfoData ? JSON.parse(savedInfoData) : props.info_data; // Fallback to props.info_data if nothing is saved
  });

  useEffect(() => {
    localStorage.setItem("filterOptions", JSON.stringify(filterOptions));
    // Consider efficiency and necessity before persisting infoData
    // localStorage.setItem('infoData', JSON.stringify(infoData));
  }, [filterOptions, infoData]);

  useEffect(() => {
    applyFilters(); // Call a function that applies filters based on filterOptions to info_data
  }, []);

  const getFilterOptions = () => filterOptions;
  const handleCheckbox = (event) => {
    const { name, checked } = event.target;
    setFilterOptions((prev) => ({ ...prev, [name]: checked }));
  };
  // User authentication state
  const [user, loading] = useAuthState(getAuth());
  const currentUser = user;

  // Log out modal state
  const [showLogOut, setShowLogOut] = useState(false);

  return (
    <div className="background">
      <Header user={currentUser} loading={loading} showLogOut={setShowLogOut} />
      <LogOutModal show={showLogOut} setShowLogOut={setShowLogOut} />
      <Routes>
        <Route path="/homepage" element={<AllCards data={order} />} />
        <Route
          path="/trending"
          element={<ComparisonTable info_data={infoData} />}
        />
        <Route
          path="/community/:infoName"
          element={
            <CommunityDetail
              info_data={props.info_data}
              comment_data={props.comment_data}
              username={user ? user.displayName : "Anonymous"}
            />
          }
        />
        <Route path="/chat" element={<CommunityPage />} />
        <Route path="/chat/:infoName" element={<ChatDetail info_data={props.info_data} comment_data={props.comment_data} username={props.username} />} />
        <Route
          path="/signin"
          element={<LoginPage user={currentUser} loading={loading} />}
        />
        <Route path="*" element={<Navigate to="/homepage" />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
