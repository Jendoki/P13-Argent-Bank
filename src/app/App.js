import React from "react";
import { Provider } from 'react-redux'
import { store } from './store';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"

import HomePage from '../components/pages/home/HomePage'
import LoginPage from '../components/pages/login/LoginPage'
import UserPage from '../components/pages/user/UserPage'

function App() {
  return (
    <>
      <Provider store={store}>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/user" element={<UserPage />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
