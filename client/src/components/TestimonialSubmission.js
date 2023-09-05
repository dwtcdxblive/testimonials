// TestimonialSubmission.js
import React, { useState } from 'react';
import axios from 'axios';

const TestimonialSubmission = () => {
  const [testimonialData, setTestimonialData] = useState({
    author: '',
    content: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a POST request to submit the testimonial
    axios
      .post('/api/testimonials', testimonialData)
      .then((response) => {
        // Handle successful submission (e.g., show a success message)
        console.log('Testimonial submitted successfully:', response.data);
        setTestimonialData({ author: '', content: '' });
      })
      .catch((error) => {
        // Handle submission error (e.g., display an error message)
        console.error('Error submitting testimonial:', error);
      });
  };

  return (
    <div>
      <h1>Testimonial Submission</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='author'>Author:</label>
          <input
            type='text'
            id='author'
            value={testimonialData.author}
            onChange={(e) =>
              setTestimonialData({ ...testimonialData, author: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label htmlFor='content'>Content</label>
        </div>
      </form>
    </div>
  );
};

export default TestimonialSubmission;
