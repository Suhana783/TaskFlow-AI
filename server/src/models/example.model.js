// Example MongoDB model/schema
// Models will define data structure

import mongoose from 'mongoose';

const exampleSchema = new mongoose.Schema({
  // Add fields here
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Example = mongoose.model('Example', exampleSchema);

export default Example;
