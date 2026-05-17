import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

/* Components=>> */
import Layout from './components/Layout'
import LandingPage from './components/LandingPage'
import States from './components/State';
import SinglePlace from './components/SinglePlace';
import StatePlaces from './components/StatePlaces';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Layout Wrapper */}
        <Route path="/" element={<Layout />}>
          
          {/* Default LandingPage */}
          <Route index element={<LandingPage />} />
          
          {/* States Page */}
          <Route path="states" element={<States />} />
          
          {/* 🎯 KHEL KHATAM: Exact single dynamic route match with 'id' parameter */}
          <Route path="place/:id" element={<SinglePlace />} />
            
          {/* State Places Page */}
          <Route path="state/:stateId" element={<StatePlaces />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;