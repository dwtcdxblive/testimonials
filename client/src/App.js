// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes
import AdminPage from './components/AdminPage';
import PublicPage from './components/PublicPage';
import TestimonialSubmission from './components/TestimonialSubmission';

function App() {
  return (
    <Router>
      <Routes>
        {' '}
        {/* Use Routes */}
        <Route path='/admin' element={<AdminPage />} /> {/* Use element prop */}
        <Route path='/public' element={<PublicPage />} />
        <Route path='/submit' element={<TestimonialSubmission />} />
        <Route path='/' element={<PublicPage />} /> {/* Default route */}
      </Routes>
    </Router>
  );
}

export default App;
