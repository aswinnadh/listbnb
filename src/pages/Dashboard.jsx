import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdForm from "../components/AdForm";
import ProfileForm from "../components/ProfileForm";
import MyAccount from "../components/MyAccount";
import Sidebar from "../components/SideBar";
import {
  fetchUserProfile,
  updateUserProfile,
  fetchAds,
  createAd,
} from "../utils/api";
import { useAuth } from "../context/AuthContext";
import AdListCard from "../components/AdListCard";

const Dashboard = () => {
  const { user, token, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const tabFromUrl = queryParams.get("tab");

  const [activeTab, setActiveTab] = useState(tabFromUrl || "edit-profile");
  const [profile, setProfile] = useState(null);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setActiveTab(tabFromUrl || "edit-profile");
  }, [tabFromUrl]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        if (activeTab === "edit-profile" || activeTab === "myaccount") {
          const profileData = await fetchUserProfile(token);
          setProfile(profileData);
        }
        if (activeTab === "ads" || activeTab === "myaccount") {
          const adsData = await fetchAds();
          setAds(adsData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [activeTab, token]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/dashboard?tab=${tab}`);
  };

  const handleProfileUpdate = async (profileData) => {
    try {
      const updatedProfile = await updateUserProfile(profileData, token);
      setProfile(updatedProfile);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAdSubmit = async (adData) => {
    try {
      await createAd(adData, token);
      handleTabChange("ads");
    } catch (err) {
      setError(err.message);
    }
  };

  const getBreadcrumb = () => {
    switch (activeTab) {
      case "edit-profile":
        return "Edit Profile";
      case "ads":
        return "My Ads";
      case "create":
        return "Post Ad";
      case "myaccount":
        return "My Account";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="p-4">
      {/* Breadcrumb */}
      <div className="text-gray-600 font-bold mb-4">
        Home &gt; {getBreadcrumb()}
      </div>

      {/* Main Layout */}
      <div className="flex gap-6">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onLogout={logout}
        />

        {/* Right Section */}
        <div className="w-4/5">
          {error && <div className="text-red-500 mb-4">{error}</div>}

          {activeTab === "edit-profile" &&
            (loading ? (
              <div>Loading profile...</div>
            ) : (
              <ProfileForm
                user={profile || user}
                onSubmit={handleProfileUpdate}
              />
            ))}

          {activeTab === "ads" && (
            <div className="space-y-4">
              {loading ? (
                <div>Loading ads...</div>
              ) : ads.length > 0 ? (
                ads.map((ad) => (
                  <AdListCard key={ad.id} ad={ad} showEditButton={false} />
                ))
              ) : (
                <p className="text-gray-500">No ads found</p>
              )}
            </div>
          )}

          {activeTab === "myaccount" && (
            <MyAccount
              user={user}
              profile={profile}
              ads={ads}
              loading={loading}
            />
          )}

          {activeTab === "create" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6">
                Create New Advertisement
              </h2>
              <AdForm onSubmit={handleAdSubmit} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
