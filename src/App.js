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
      const combinedBadge = [...props.restaurants_data.category.split(', '), props.restaurants_data.star, props.restaurants_data.price];
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
          if (key === 'American' && !restaurant.category.includes('American')) {
            return false;
          }
          if (key === 'Chinese' && !restaurant.category.includes('Chinese')) {
            return false;
          } else if (key === 'Indian' && !restaurant.category.includes('Indian')) {
            return false;
          } else if (key === 'Hawaiian' && !restaurant.category.includes('Hawaiian')) {
            return false;
          } else if (key === 'Vietnamese' && !restaurant.category.includes('Vietnamese')) {
            return false;
          } else if (key === 'Japanese' && !restaurant.category.includes('Japanese')) {
            return false;
          } else if (key === 'Mexican' && !restaurant.category.includes('Mexican')) {
            return false;
          } else if (key === 'Mediterranean' && !restaurant.category.includes('Mediterranean')) {
            return false;
          } else if (key === 'Vegetarian' && !restaurant.category.includes('Vegetarian')) {
            return false;
          } else if (key === 'Vegan' && !restaurant.category.includes('Vegan')) {
            return false;
          } else if (key === 'Gluten-free' && !restaurant.category.includes('Gluten-free')) {
            return false;
          } else if (key === 'Seafood' && restaurant.category.includes('Seafood')) {
            return false;
          } else if (key === 'Bar' && !restaurant.category.includes('Bar')) {
            return false;
          } else if (key === 'Barbeque' && !restaurant.category.includes('Barbeque')) {
            return false;
          } else if (key === 'Venues & Event Spaces' && !restaurant.category.includes('Venues & Event Spaces')) {
            return false;
          } else if (key === 'Cafe' && !restaurant.category.includes('Cafe')) {
            return false;
          } else if (key === 'Breakfast & Brunch' && !restaurant.category.includes('Breakfast & Brunch')) {
            return false;
          } else if (key === 'Bakeries' && !restaurant.category.includes('Bakeries')) {
            return false;
          } else if (key === 'Desserts' && !restaurant.category.includes('Desserts')) {
            return false;
          } else if (key === 'Noodles' && !restaurant.category.includes('Noodles')) {
            return false;
          } else if (key === 'Desserts' && !restaurant.category.includes('Desserts')) {
            return false;
          } else if (key === 'Burgers' && !restaurant.category.includes('Burgers')) {
            return false;
          } else if (key === 'Bubble Tea' && !restaurant.category.includes('Bubble Tea')) {
            return false;
          } else if (key === 'Hot Pot' && !restaurant.category.includes('Hot Pot')) {
            return false;
          } else if (key === 'Tacos' && !restaurant.category.includes('Tacos')) {
            return false;
          } else if (key === '1' && restaurant.star !== '1') {
            return false;
          } else if (key === '2' && restaurant.star !== '2') {
            return false;
          } else if (key === '3' && restaurant.star !== '3') {
            return false;
          } else if (key === '4' && restaurant.star !== '4') {
            return false;
          } else if (key === '5' && restaurant.star !== '5') {
            return false;
          } else if (key === '$' && restaurant.price !== '$') {
            return false;
          } else if (key === '$$' && restaurant.price !== '$$') {
            return false;
          } else if (key === '$$$' && restaurant.price !== '$$$') {
            return false;
          } else if (key === '$$$$' && restaurant.price !== '$$$$') {
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