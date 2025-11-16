import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login.jsx';
import Signup from './pages/Signup.jsx';
import Home from './pages/Home.jsx';
import Tours from './pages/tour.jsx';
import TourDetails from "./pages/TourDetails";
import Dashboard from './pages/Dashboard.jsx';
import { AuthProvider } from "./state/AuthContext";
import { BookingProvider } from "./state/BookingContext";
import Event from './pages/Events.jsx';
import About from './pages/about.jsx';

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/:slug" element={<TourDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/events" element={<Event />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;
