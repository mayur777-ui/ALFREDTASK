import { useState } from 'react';
import { toast } from 'react-toastify';
import { addFlashcard } from '../services/flashcardService';

const FlashcardForm = ({ onAddFlashcard }) => {
  const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '' });

  const handleAddFlashcard = async () => {
    if (newFlashcard.question && newFlashcard.answer) {
      try {
        const addedFlashcard = await addFlashcard(newFlashcard);
        onAddFlashcard(addedFlashcard);
        setNewFlashcard({ question: '', answer: '' });
        toast.success('Flashcard added');
      } catch (err) {
        toast.error('Error adding flashcard');
      }
    } else {
      toast.error('Please fill in both question and answer');
    }
  };

  return (
    <div className="mt-8 p-8 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <input
        type="text"
        value={newFlashcard.question}
        onChange={(e) => setNewFlashcard({ ...newFlashcard, question: e.target.value })}
        placeholder="Enter question"
        className="border p-4 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        value={newFlashcard.answer}
        onChange={(e) => setNewFlashcard({ ...newFlashcard, answer: e.target.value })}
        placeholder="Enter answer"
        className="border p-4 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleAddFlashcard}
        className="bg-blue-500 text-white px-8 py-3 rounded-full w-full hover:bg-blue-600 transition duration-300"
      >
        Add Flashcard
      </button>
    </div>
  );
};

export default FlashcardForm;
