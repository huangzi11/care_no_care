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

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtyKPOtGM74-VEG_jD56Wjun96SWhILGg",
  authDomain: "info340seattle.firebaseapp.com",
  projectId: "info340seattle",
  storageBucket: "info340seattle.appspot.com",
  messagingSenderId: "646812634569",
  appId: "1:646812634569:web:e2ba1c9c5d5ad8175f6c18",
  measurementId: "G-XNZPJFNRPR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

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
