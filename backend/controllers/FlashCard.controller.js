import Flashcard from '../models/FlashCard.models.js';

export const getAllFlashcards = async (req, res) => {
  try {
    const flashcards = await Flashcard.find();
    res.json(flashcards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addFlashcard = async (req, res) => {
  const { question, answer } = req.body;
  try {
    const newFlashcard = new Flashcard({
      question,
      answer,
      level: 1,
      nextReview: getNextReviewDate(1), 
    });

    await newFlashcard.save();
    res.status(201).json(newFlashcard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getNextReviewDate = (boxLevel) => {
  const reviewIntervals = [1, 3, 7, 14, 30];  // Days for each level
  return new Date(Date.now() + reviewIntervals[boxLevel - 1] * 24 * 60 * 60 * 1000);
};

export const updateFlashcard = async (req, res) => {
  const { id } = req.params;
  const { correct } = req.body; 
  // console.log(correct);
  try {
    const flashcard = await Flashcard.findById(id);
    if (!flashcard) return res.status(404).json({ message: 'Flashcard not found' });
    flashcard.level = correct ? flashcard.level + 1 : 1; 
    flashcard.nextReview = getNextReviewDate(flashcard.level);

    await flashcard.save();
    // console.log(flashcard)
    res.json(flashcard);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
};

export const deleteFlashcard = async (req, res) => {
  const { id } = req.params;

  try {
    const flashcard = await Flashcard.findByIdAndDelete(id);
    if (!flashcard) return res.status(404).json({ message: 'Flashcard not found' });
    res.json({ message: 'Flashcard deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
};
