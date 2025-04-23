import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAdById, deleteAd } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { images } from "../utils/constants";

const AdDetail = () => {
  const { id } = useParams();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadAd = async () => {
      try {
        console.log(`Fetching ad with ID: ${id}`);
        const data = await fetchAdById(id);
        console.log('Received ad data:', data);
        
        if (isMounted) {
          if (!data) {
            throw new Error('No ad data received');
          }
          setAd(data);
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching ad:', err);
        if (isMounted) {
          setError(err.message || 'Failed to load advertisement');
          setAd(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadAd();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteAd(id, token);
      navigate("/", {
        state: { message: "Advertisement deleted successfully" },
      });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!ad)
    return <div className="text-center py-8">Advertisement not found</div>;

  // Format user information
  const ownerName = `${ad.owner?.firstName || "Unknown"} ${
    ad.owner?.lastName || ""
  }`.trim();
  const maskedPhone = showPhone ? "9876543210" : "98******10";
  const maskedEmail = showEmail ? "user@example.com" : "us*****@example.com";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Section (2/3 width) */}
        <div className="w-full md:w-2/3 space-y-6">
          {/* Main Details Card */}
          <div className="border border-gray-200 rounded-lg p-6 space-y-6">
            {/* Title, Location, Date */}
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">{ad.title}</h1>
              <div className="flex items-center space-x-6 text-gray-500">
                <div className="flex items-center">
                  <LocationOnIcon className="text-rose-500 mr-2" />
                  <span>Paris, France</span>
                </div>
                <div className="flex items-center">
                  <CalendarTodayIcon className="text-rose-500 mr-2" />
                  <span>Posted 1 day ago</span>
                </div>
              </div>
            </div>

            {/* Image */}
            <div
              className="bg-gray-100 rounded-lg overflow-hidden flex justify-center items-center"
              style={{ height: "400px" }}
            >
              <img
                src={ad.image || "https://via.placeholder.com/800x400"}
                alt={ad.title}
                className="h-full w-auto object-contain"
              />
            </div>
          </div>

          {/* Overview Card */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {ad.description}
            </p>
          </div>
        </div>

        {/* Right Section (1/3 width) */}
        <div className="w-full md:w-1/3 space-y-6">
          {/* Price Card */}
          <div className="border border-gray-200 rounded-lg p-6">
            <p className="text-gray-500 text-sm mb-2">Price</p>
            <div className="flex justify-between items-center">
              <span className="text-rose-500 text-2xl font-bold">
                ${ad.price}
              </span>
              <LocalOfferIcon className="text-gray-400" />
            </div>
          </div>

          {/* Seller Card */}
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
              <img
                src={ad.owner.image||images.man}
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-gray-500 text-sm">Member since Nov 2024</p>
            <h3 className="text-xl font-bold">
              {ownerName || "Unknown Seller"}
            </h3>

            {/* Contact Cards */}
            <div className="w-full space-y-3">
              {/* Phone Card */}
              <div
                className="bg-gray-100 rounded-lg p-3 cursor-pointer hover:bg-gray-200 transition-colors"
                onClick={() => setShowPhone(!showPhone)}
              >
                <div className="flex items-center justify-center gap-3 w-full">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <PhoneIcon className="text-rose-500 text-lg" />
                  </div>
                  <div className="flex-1 min-w-0 text-center">
                    <p className="text-gray-500 text-xs flex w-full justify-start">Click to show</p>
                    <p className="font-medium text-sm truncate flex w-full justify-start">{maskedPhone}</p>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div
                className="bg-gray-100 rounded-lg p-3 cursor-pointer hover:bg-gray-200 transition-colors"
                onClick={() => setShowEmail(!showEmail)}
              >
                <div className="flex items-center justify-center gap-3 w-full">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <EmailIcon className="text-rose-500 text-lg" />
                  </div>
                  <div className="flex-1 min-w-0 text-center ">
                    <p className="text-gray-500 flex w-full justify-start text-xs">Click to show</p>
                    <p className="font-medium text-sm truncate flex w-full justify-start">{maskedEmail}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons (for logged in users) */}
      {user && (
        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="border border-gray-300 hover:bg-gray-100 text-gray-700 py-2 px-6 rounded-md transition-colors"
          >
            Back to Listings
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-md transition-colors"
          >
            Delete Advertisement
          </button>
        </div>
      )}
    </div>
  );
};

export default AdDetail;