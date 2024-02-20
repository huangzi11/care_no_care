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
import ComparePage from './pages/ComparePage';

const App = (props) => {
  // quiz checkbox
  const [RestaurantData, setRestaurantData] = useState(props.restaurants_data);
  const [order, setOrder] = useState(props.restaurants_data);
  const [filterOptions, setFilterOptions] = useState(() => {
    if (props.card && props.card.category) {
      const combinedBadge = [...props.restaurants_data.category.split(', ')];
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
    let filteredData = RestaurantData.filter((restaurant) => {
      for (const [key, value] of Object.entries(filterOptions)) {
        if (value) {
          if (key === 'Student Organization' && !restaurant.category.includes('Student Organization')) {
            return false;
          }
          if (key === 'Election' && !restaurant.category.includes('Election')) {
            return false;
          } else if (key === 'Scholarships' && !restaurant.category.includes('Scholarships')) {
            return false;
          } else if (key === 'Diversity' && !restaurant.category.includes('Diversity')) {
            return false;
          } else if (key === 'Industry' && !restaurant.category.includes('Industry')) {
            return false;
          } else if (key === 'Career Opportunities' && !restaurant.category.includes('Career Opportunities')) {
            return false;
          } else if (key === 'Panel Talk' && !restaurant.category.includes('Panel Talk')) {
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
        <Route path="homepage" element={<HomePage restaurants_data={props.restaurants_data} />} ></Route>
        <Route path="community" element={<CommunityPage restaurants_data={props.restaurants_data} />} ></Route>
        <Route path="community/:restaurantName" element={<CommunityDetail restaurants_data={props.restaurants_data} comment_data={props.comment_data}/>} ></Route>
        <Route path="quiz" element={<FilterForm applySortCallback={applySort} applyFilterCallback={applyFilters} data={RestaurantData} filterOptions={filterOptions} handleCheckbox={handleCheckbox} />} >
          <Route index element={<AllCards data={order} />} />
        </Route>
        <Route path="compare" element={<ComparePage restaurants_data={props.restaurants_data} />} ></Route>
        <Route path="signin" element={<LoginPage user={currentUser} loading={loading} />} />
        <Route path="*" element={<Navigate to="/homepage" />} />
      </Routes>
      <Footer />
    </div>

  );
}


export default App;