// AdminPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [pendingTestimonials, setPendingTestimonials] = useState([]);

  useEffect(() => {
    // Fetch pending testimonials from the backend
    axios
      .get('/api/testimonials/pending')
      .then((response) => {
        setPendingTestimonials(response.data);
      })
      .catch((error) => {
        console.error('Error fetching pending testimonials:', error);
      });
  }, []);

  const handleApproval = (testimonialId) => {
    // Implement logic to approve a testimonial
    // Send a PUT request to `/api/testimonials/:id` with the 'approve' action
  };

  const handleRejection = (testimonialId) => {
    // Implement logic to reject a testimonial
    // Send a PUT request to `/api/testimonials/:id` with the 'reject' action
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <ul>
        {pendingTestimonials.map((testimonial) => (
          <li key={testimonial._id}>
            {testimonial.content} by {testimonial.author}
            <button onClick={() => handleApproval(testimonial._id)}>
              Approve
            </button>
            <button onClick={() => handleRejection(testimonial._id)}>
              Reject
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
