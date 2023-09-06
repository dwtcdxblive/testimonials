import React, { useState } from 'react';
import axios from 'axios';
import bg from '../assets/background.mp4'

const TestimonialSubmission = () => {
  const [testimonialData, setTestimonialData] = useState({
    author: '',
    content: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Client-side validation
    if (!testimonialData.author || !testimonialData.content) {
      setErrorMessage('Please fill in both the author and content fields.');
      return;
    }

    // Display loading indicator
    setIsLoading(true);

    // Send a POST request to submit the testimonial
    axios
      .post('/api/testimonials', testimonialData)
      .then((response) => {
        // Handle successful submission
        setSuccessMessage('Testimonial submitted successfully.');
        setTestimonialData({ author: '', content: '' });
      })
      .catch((error) => {
        // Handle submission error
        setErrorMessage('Error submitting testimonial. Please try again later.');
      })
      .finally(() => {
        // Hide loading indicator
        setIsLoading(false);
      });
  };

  return (
    <div>
      <video width="100%" height="100%" src={bg} autoPlay loop muted></video>
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
          <label htmlFor='content'>Content:</label>
          <textarea
            id='content'
            value={testimonialData.content}
            onChange={(e) =>
              setTestimonialData({ ...testimonialData, content: e.target.value })
            }
            required
          ></textarea>
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {successMessage && <p className='success-message'>{successMessage}</p>}
            {errorMessage && <p className='error-message'>{errorMessage}</p>}
            <button type='submit'>Submit</button>
          </>
        )}
      </form>
    </div>
  );
};

export default TestimonialSubmission;
