import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const FlashcardItem = ({ flashcard, onUpdateLevel, onDelete }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <motion.div
      key={flashcard._id}
      className="relative w-80 min-h-[250px] p-6 bg-white border rounded-lg shadow-lg"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Flip Animation for Question & Answer */}
      <AnimatePresence mode="wait">
        {!showAnswer ? (
          <motion.div
            key="question"
            className="flex flex-col justify-center items-center"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-gray-800 text-center">
              {flashcard.question}
            </h3>
            <p className="mt-2 text-sm text-gray-500">Level: {flashcard.level}</p>
          </motion.div>
        ) : (
          <motion.div
            key="answer"
            className="flex flex-col justify-center items-center"
            initial={{ rotateY: -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg font-medium text-gray-800 text-center">
              {flashcard.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show/Hide Answer Button */}
      <button
        onClick={() => setShowAnswer(!showAnswer)}
        className="mt-6 px-4 py-2 w-full rounded-lg bg-green-500 hover:bg-green-600 text-white"
      >
        {showAnswer ? "Hide Answer" : "Show Answer"}
      </button>

      {/* Action Buttons with Proper Spacing */}
      <motion.div
        className="mt-6 flex flex-wrap justify-between gap-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <button
          onClick={() => onUpdateLevel(flashcard._id, true)}
          className={`px-4 py-2 flex-1 rounded-lg ${
            flashcard.level === 5
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
          disabled={flashcard.level === 5}
        >
          Correct
        </button>
        <button
          onClick={() => onUpdateLevel(flashcard._id, false)}
          className="px-4 py-2 flex-1 rounded-lg bg-red-500 hover:bg-red-600 text-white"
        >
          Incorrect
        </button>
        <button
          onClick={() => onDelete(flashcard._id)}
          className="px-4 py-2 flex-1 rounded-lg bg-gray-500 hover:bg-gray-600 text-white"
        >
          Delete
        </button>
      </motion.div>
    </motion.div>
  );
};

export default FlashcardItem;
