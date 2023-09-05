// PublicPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PublicPage = () => {
  const [approvedTestimonials, setApprovedTestimonials] = useState([]);

  useEffect(() => {
    // Fetch approved testimonials from the backend
    axios
      .get('/api/testimonials')
      .then((response) => {
        setApprovedTestimonials(response.data);
      })
      .catch((error) => {
        console.error('Error fetching approved testimonials:', error);
      });
  }, []);

  return (
    <div>
      <h1>Public Page</h1>
      <ul>
        {approvedTestimonials.map((testimonial) => (
          <li key={testimonial._id}>
            {testimonial.content} by {testimonial.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PublicPage;
