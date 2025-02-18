import React,{ useState, useEffect } from 'react';
// import { fetchFlashcards } from '../services/flashcardService.js';
import FlashcardItem from './FlashcardItem';

const FlashcardList = ({ flashcards, onUpdateLevel, onDelete, loading }) => {
  const [error, setError] = useState('');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
      {error && <div className="text-red-500 text-center col-span-full">{error}</div>}
      {loading ? (
        <div className="text-center col-span-full">Loading...</div>
      ) : (
        flashcards.map(flashcard => (
          <FlashcardItem
            key={flashcard._id}
            flashcard={flashcard}
            onUpdateLevel={onUpdateLevel}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

export default FlashcardList;
