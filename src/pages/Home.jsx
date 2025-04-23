import { useEffect, useState } from "react";
import AdCard from "../components/AdCard";
import { fetchAds } from "../utils/api";
import HeroSection from "../components/HeroSection";

const Home = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("grid");

  useEffect(() => {
    const loadAds = async () => {
      try {
        const data = await fetchAds();
        setAds(data.slice(0, 32)); // Limit to 32 items
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadAds();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <>
      <HeroSection />
      <div className="px-4 py-10">
        <div className="text-center mb-6">
          <p className="text-sm text-rose-500 font-medium uppercase tracking-wide mb-1">
            WHAT'S NEW
          </p>
          <h1 className="text-4xl font-bold">Fresh Recommendations</h1>
        </div>

        <div className="flex items-center w-full justify-between pb-4">
          <div className="flex gap-2">
            <p className="text-rose-500 font-bold">{ads.length}</p>
            <p className="font-bold">items</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setView("grid")}
              className={`w-7 h-7 flex items-center justify-center rounded-full p-1 ${
                view === "grid" ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              {/* Inline Grid SVG */}
              <svg
                className="w-6 h-6 m-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {/* Outer border of the grid */}
                <rect x="1" y="1" width="22" height="22" rx="2" ry="2" />

                {/* Horizontal inner borders */}
                <line
                  x1="1"
                  y1="8"
                  x2="23"
                  y2="8"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="1"
                  y1="15"
                  x2="23"
                  y2="15"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                {/* Vertical inner borders */}
                <line
                  x1="8"
                  y1="1"
                  x2="8"
                  y2="23"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="15"
                  y1="1"
                  x2="15"
                  y2="23"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
            <button
              onClick={() => setView("list")}
              className={`w-7 h-7 flex items-center justify-center rounded-full p-1 ${
                view === "list" ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              {/* List Icon - Lines with Dots */}
              <svg
                className="w-5 h-5 m-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="4" cy="6" r="1.25" />
                <line x1="8" y1="6" x2="20" y2="6" />
                <circle cx="4" cy="12" r="1.25" />
                <line x1="8" y1="12" x2="20" y2="12" />
                <circle cx="4" cy="18" r="1.25" />
                <line x1="8" y1="18" x2="20" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`${
            view === "grid"
              ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
              : "flex flex-col gap-4"
          }`}
        >
          {ads.map((ad) => (
            <AdCard key={ad.id} ad={ad} view={view} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
