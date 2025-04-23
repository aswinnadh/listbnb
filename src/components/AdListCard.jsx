import React from 'react';
import { Link } from "react-router-dom";
import { images } from '../utils/constants';

const AdListCard = ({ ad, showEditButton = true }) => {
  if (!ad) return null;

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-rose-500 transition-colors overflow-hidden flex p-4 mb-4">
      <div className="w-32 h-32 flex-shrink-0 bg-gray-100 flex justify-center items-center">
        <img
          src={ad.image || images.noImage}
          alt={ad.title || 'Advertisement'}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-between ml-4 w-full">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-base text-gray-800 line-clamp-2">
            {ad.title || 'No Title'}
          </h3>
          <div className="flex gap-2">
            {showEditButton && (
              <Link 
                to={`/edit-ad/${ad.id}`}
                className="bg-rose-500 text-white px-4 py-2 rounded-full text-sm"
              >
                Edit Ad
              </Link>
            )}
            <Link 
              to={`/ads/${ad.id}`}
              className="border border-gray-300 px-4 py-2 rounded-full text-sm"
            >
              View
            </Link>
          </div>
        </div>

        <p className="text-gray-500 text-xs mt-2">
          {ad.location || 'Location not specified'} • {ad.postedDate || 'Recently'}
        </p>

        <p className="text-rose-500 font-bold text-xl mt-2">
          ${ad.price ? ad.price.toFixed(2) : '0.00'}
        </p>
      </div>
    </div>
  );
};

export default AdListCard;