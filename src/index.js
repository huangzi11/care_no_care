import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import info_data from './data/info_data.json';
import comment_data from './data/comment_data.json';
import 'bootstrap/dist/css/bootstrap.min.css';
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
// Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyDMQ4x0A-_Dq9hHYzPS6Y-qXIgS1APo7z4",
  authDomain: "info442-wi24.firebaseapp.com",
  databaseURL: "https://info442-wi24-default-rtdb.firebaseio.com",
  projectId: "info442-wi24",
  storageBucket: "info442-wi24.appspot.com",
  messagingSenderId: "230580287778",
  appId: "1:230580287778:web:4df8d21892121f2f97cd7b",
  measurementId: "G-BEC24YCWRZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
   <BrowserRouter>
    <App info_data={info_data} comment_data={comment_data}/>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
