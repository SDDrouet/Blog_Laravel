import { useState } from "react";

// Componente de estrellas interactivas para tu formulario
const StarRating = ({ value, onChange, error }) => {
  const [hoverValue, setHoverValue] = useState(0);
  
  const fullStar = '★';
  const emptyStar = '☆';
  
  const handleClick = (rating) => {
    onChange(rating);
  };
  
  const handleMouseEnter = (rating) => {
    setHoverValue(rating);
  };
  
  const handleMouseLeave = () => {
    setHoverValue(0);
  };
  
  const displayValue = hoverValue || value;
  
  return (
    <div className="space-y-2">
      <div className="flex gap-0">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => handleClick(rating)}
            onMouseEnter={() => handleMouseEnter(rating)}
            onMouseLeave={handleMouseLeave}
            className={`
              text-2xl duration-100 transform hover:scale-125
              ${rating <= displayValue 
                ? 'text-rose-500 drop-shadow-sm' 
                : 'text-gray-300 dark:text-gray-600'
              }
              hover:text-rose-400 cursor-pointer select-none
            `}
            style={{ textShadow: rating <= displayValue ? '0 0 3px rgba(244, 63, 94, 0.3)' : 'none' }}
            aria-label={`Calificar con ${rating} estrella${rating !== 1 ? 's' : ''}`}
          >
            {rating <= displayValue ? fullStar : emptyStar}
          </button>
        ))}
      </div>
      
      {/* Texto descriptivo opcional */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        {displayValue > 0 && (
          <span>
            {displayValue} estrella{displayValue !== 1 ? 's' : ''} 
          </span>
        )}
        {displayValue === 0 && <span>Haz clic en una estrella para calificar</span>}
      </div>
      
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default StarRating;