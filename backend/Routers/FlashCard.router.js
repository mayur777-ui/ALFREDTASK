import express from "express";
import { getAllFlashcards, addFlashcard, updateFlashcard, deleteFlashcard } from "../controllers/FlashCard.controller.js";
import validateFlashcard from "../middelwares/validation.js";

const router = express.Router();

// Route to get all flashcards
router.get("/flashcards", getAllFlashcards);

// Route to add a new flashcard
router.post("/flashcards", validateFlashcard, addFlashcard);

// Route to update a flashcard
router.put("/flashcards/:id", updateFlashcard);

// Route to delete a flashcard
router.delete("/flashcards/:id", deleteFlashcard);

export default router;
