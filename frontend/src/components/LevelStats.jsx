const LevelStats = ({ levelCount }) => {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {[1, 2, 3, 4, 5].map(level => (
          <div key={level} className="p-6 bg-white rounded-lg shadow-md text-center transition transform hover:scale-105 duration-300">
            <p className="text-xl font-semibold text-gray-700">{level}</p>
            <p className="text-sm text-gray-500">{levelCount[level] || 0} flashcards</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default LevelStats;
  