import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import noImage from '../assets/images/no-image.png'; 

const AdCard = ({ ad, view }) => {
  const isList = view === "list";

  return (
    <div
      className={`bg-white rounded-3xl border border-gray-200 hover:border-rose-500 transition-colors overflow-hidden ${
        isList ? "flex gap-4 items-start" : ""
      }`}
    >
      <Link
        to={`/ads/${ad.id}`}
        state={{ fromList: true }} // Optional: pass state if needed
        className={`w-full ${isList ? "flex gap-4 items-start" : "block"}`}
      >
        {/* Image */}
        <div
          className={`${
            isList ? "w-32 h-32 flex-shrink-0" : "h-48"
          } bg-gray-100 flex justify-center`}
        >
          <img
            src={ad.image || noImage}
            alt={ad.title}
            className="h-full w-full object-contain"
          />
        </div>

        {/* Info */}
        <div className={`flex flex-col justify-between ${isList ? "p-4" : "p-4"} w-full`}>
          {/* Location & Time */}
          <p className="text-gray-500 text-xs mb-1">
            Paris <span className="mx-1">•</span> 1 day ago
          </p>

          {/* Title */}
          <h3 className="font-semibold text-base text-gray-800 line-clamp-2 mb-2">
            {ad.title}
          </h3>

          {/* Price & Eye Icon */}
          <div className="flex justify-between items-center">
            <p className="text-rose-500 font-bold text-xl">${ad.price}</p>
            <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center transition-colors duration-200 hover:border-rose-500 group">
              <VisibilityIcon
                className="text-gray-400 group-hover:text-rose-500"
                style={{ fontSize: "18px" }}
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AdCard;