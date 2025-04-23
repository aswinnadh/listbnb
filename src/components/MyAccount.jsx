// MyAccount.js
import React from "react";
import { Link } from "react-router-dom";
import AdListCard from "./AdListCard";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";
import { images } from "../utils/constants";

const MyAccount = ({ user, profile, ads, loading }) => {
  if (loading) {
    return <div>Loading account info...</div>;
  }

  const displayProfile = profile || user;
  const userAds = ads.filter((ad) => ad.userId === displayProfile?.id);

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <img
              src={displayProfile?.imageUrl || images.man}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border"
            />
            <div>
              <h2 className="text-lg font-bold">
                {displayProfile?.name || displayProfile?.email || "Unnamed User"}
              </h2>
              <p className="text-gray-500 text-sm">Member since 2019</p>
            </div>
          </div>

          <Link 
            to="/dashboard?tab=edit-profile"
            className="border border-gray-300 rounded-full px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 transition w-max self-start sm:self-auto"
          >
            Edit Profile
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500 mt-2">
          <div className="flex items-center gap-2">
            <MdLocationOn className="text-md" />
            <span>{displayProfile?.location || "Unknown Location"}</span>
          </div>
          <div className="flex items-center gap-2">
            <MdEmail className="text-md" />
            <span>{displayProfile?.email || "Not Provided"}</span>
          </div>
          <div className="flex items-center gap-2">
            <MdPhone className="text-md" />
            <span>{displayProfile?.phone || "Not Provided"}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {userAds.length > 0 ? (
          userAds.map((ad) => <AdListCard key={ad.id} ad={ad} />)
        ) : (
          <p className="text-gray-500">No ads to show.</p>
        )}
      </div>
    </>
  );
};

export default MyAccount;