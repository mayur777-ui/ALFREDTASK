import mongoose from 'mongoose';

const flashcardSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    default: 1,
  },
  nextReview: {  
    type: Date,
    required: true,
    default:new Date()
  }
});

const Flashcard = mongoose.model('Flashcard', flashcardSchema);

export default Flashcard;
