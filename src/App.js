import React, { useState, useEffect } from "react";
import { AllCards } from "./pages/QuizResult.js";
import { FilterForm } from './pages/QuizForm.js';
import { Routes, Route, Navigate } from 'react-router-dom';
import _ from 'lodash';
import Header from "./components/header";
import Footer from "./components/footer";
import LoginPage from "./pages/SignIn";
import { getAuth } from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth";
import LogOutModal from "./pages/LogOut.js";
import CommunityPage from './pages/CommunityPage';
import CommunityDetail from './pages/CommunityDetail';
import HomePage from './pages/HomePage';

const App = (props) => {
  // quiz checkbox
  const [infoData, setinfoData] = useState(props.info_data);
  const [order, setOrder] = useState(props.info_data);
  const [filterOptions, setFilterOptions] = useState(() => {
    if (props.card && props.card.category) {
      const combinedBadge = [...props.info_data.category.split(', ')];
      return combinedBadge;
    } else {
      return [];
    }
  });

  const applySort = (value) => {
    if (value === '') {
      setOrder(_.sortBy(order, ['id']))
    }
  }
  
  // Because all option are in the category and different option will have different filter ways,
  // I need to use if here but revise the hardcoding for filterOptions
  const applyFilters = (e) => {
    let filteredData = infoData.filter((info) => {
      for (const [key, value] of Object.entries(filterOptions)) {
        if (value) {
          if (key === 'Student Organization' && !info.category.includes('Student Organization')) {
            return false;
          }
          if (key === 'Election' && !info.category.includes('Election')) {
            return false;
          } else if (key === 'Scholarships' && !info.category.includes('Scholarships')) {
            return false;
          } else if (key === 'Diversity' && !info.category.includes('Diversity')) {
            return false;
          } else if (key === 'Industry' && !info.category.includes('Industry')) {
            return false;
          } else if (key === 'Career Opportunities' && !info.category.includes('Career Opportunities')) {
            return false;
          } else if (key === 'Panel Talk' && !info.category.includes('Panel Talk')) {
            return false;
          }
        }
      }
      return true;
    });
    setOrder(filteredData);
  }

  const handleCheckbox = (e) => {
    let name = e.target.name;
    setFilterOptions({ ...filterOptions, [name]: !filterOptions[name] })
  }

  // Start up user authentication
  const [user, loading] = useAuthState(getAuth());
  const currentUser = user;

  // Dealing with log out modal
  const [showLogOut, setShowLogOut] = useState(false);

  return (

    <div className="background">
      <Header user={currentUser} loading={loading} showLogOut={setShowLogOut} />
      <LogOutModal show={showLogOut} setShowLogOut={setShowLogOut} />
      <Routes>
        <Route path="homepage" index element={<AllCards data={order} />} ></Route>
        <Route path="community" element={<CommunityPage info_data={props.info_data} />} ></Route>
        <Route path="community/:infoName" element={<CommunityDetail info_data={props.info_data} comment_data={props.comment_data}/>} ></Route>
        <Route path="quiz" element={<FilterForm applySortCallback={applySort} applyFilterCallback={applyFilters} data={infoData} filterOptions={filterOptions} handleCheckbox={handleCheckbox} />} >
        </Route>
        <Route path="signin" element={<LoginPage user={currentUser} loading={loading} />} />
        <Route path="*" element={<Navigate to="/homepage" />} />
      </Routes>
      <Footer />
    </div>

  );
}


export default App;