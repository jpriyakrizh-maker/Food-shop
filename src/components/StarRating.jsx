import React from 'react';
import { Star } from 'lucide-react';
const StarRating = ({ rating, max = 5, onRate, interactive = false }) => {
    return (<div className="flex gap-1">
            {[...Array(max)].map((_, i) => (<button key={i} disabled={!interactive} onClick={() => onRate && onRate(i + 1)} className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform duration-200`}>
                    <Star size={18} className={`${i < Math.floor(rating)
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-200'} transition-colors duration-200`}/>
                </button>))}
            <span className="ml-2 text-sm font-medium text-gray-600">{rating.toFixed(1)}</span>
        </div>);
};
export default StarRating;
