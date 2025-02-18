import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { updateFlashcard, deleteFlashcard, fetchFlashcards } from './services/flashcardService';

import FlashcardList from './components/FlashcardList';
import FlashcardForm from './components/FlashcardForm';
import LevelStats from './components/LevelStats';
import ToastNotifications from './utility/ToastNotifications';

const App = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [levelCount, setLevelCount] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getFlashcards = async () => {
      setLoading(true);
      try {
        const data = await fetchFlashcards(); 
        setFlashcards(data); 
      } catch (err) {
        toast.error('Error fetching flashcards');
      } finally {
        setLoading(false);
      }
    };

    getFlashcards();
  }, []);
  useEffect(() => {
    const countLevels = flashcards.reduce((acc, f) => {
      acc[f.level] = (acc[f.level] || 0) + 1;
      return acc;
    }, {});
    setLevelCount(countLevels);
  }, [flashcards]);

  // Handle flashcard level update
  const handleUpdateLevel = useCallback(async (id, increase) => {
    try {
      const updatedFlashcard = await updateFlashcard(id, increase);
      setFlashcards(prev => prev.map(f => (f._id === id ? { ...f, level: updatedFlashcard.level } : f)));
    } catch (err) {
      toast.error('Error updating flashcard');
    }
  }, []);

  
  const handleDelete = useCallback(async (id) => {
    try {
      await deleteFlashcard(id);
      setFlashcards(prev => prev.filter(f => f._id !== id)); 
    } catch (err) {
      toast.error('Error deleting flashcard');
    }
  }, []);

  // Handle adding new flashcards
  const handleAddFlashcard = (addedFlashcard) => {
    setFlashcards(prev => [...prev, addedFlashcard]);
  };


  const handleToggleAnswer = (id) => {
    setFlashcards(prev => prev.map(f =>
      f._id === id ? { ...f, showAnswer: !f.showAnswer } : f
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastNotifications />
      <LevelStats levelCount={levelCount} />
      <FlashcardList
        flashcards={flashcards}
        onUpdateLevel={handleUpdateLevel}
        onDelete={handleDelete}
        // onToggleAnswer={handleToggleAnswer}
        loading={loading}
      />
      <FlashcardForm onAddFlashcard={handleAddFlashcard} />
    </div>
  );
};

export default App;
