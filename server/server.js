const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectToDatabase } = require('./db'); // Adjust the path as needed

// Call the function to connect to the database
connectToDatabase();

const app = express();
const port = process.env.PORT || 5000;

const testimonialSchema = new mongoose.Schema({
  author: String,
  content: String,
  status: String,
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

app.use(cors());
app.use(bodyParser.json());

// API Route to Submit Testimonial
app.post('/api/testimonials', async (req, res) => {
  try {
    const { author, content } = req.body;

    // Create a new testimonial using the Testimonial model
    const newTestimonial = new Testimonial({
      author,
      content,
      status: 'pending', // Set it as pending by default
    });

    // Save the testimonial to the database
    await newTestimonial.save();

    res.status(201).json(newTestimonial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// API Route to Get Pending Testimonials (Admin Page)
app.get('/api/testimonials/pending', async (req, res) => {
  try {
    // Find pending testimonials using the Testimonial model
    const pendingTestimonials = await Testimonial.find({ status: 'pending' });

    res.json(pendingTestimonials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// API Route to Approve or Reject Testimonial (Admin Action)
app.put('/api/testimonials/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body; // Action can be 'approve' or 'reject'

    // Find the testimonial by ID using the Testimonial model
    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    if (action === 'approve') {
      testimonial.status = 'approved';
    } else if (action === 'reject') {
      testimonial.status = 'rejected';
    } else {
      return res.status(400).json({ message: 'Invalid action' });
    }

    // Save the updated testimonial to the database
    await testimonial.save();

    res.json(testimonial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
