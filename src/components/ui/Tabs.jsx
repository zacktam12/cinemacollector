import PropTypes from "prop-types";

/**
 * Tabs component for switching between different views
 */
export default function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="tabs">
      <button
        className={`tab-button ${activeTab === "watched" ? "active" : ""}`}
        onClick={() => setActiveTab("watched")}
      >
        📺 Watched
      </button>
      <button
        className={`tab-button ${activeTab === "toWatch" ? "active" : ""}`}
        onClick={() => setActiveTab("toWatch")}
      >
        📌 To Watch
      </button>
      <button
        className={`tab-button ${activeTab === "favorites" ? "active" : ""}`}
        onClick={() => setActiveTab("favorites")}
      >
        ❤️ Favorites
      </button>
      <button
        className={`tab-button ${activeTab === "analytics" ? "active" : ""}`}
        onClick={() => setActiveTab("analytics")}
      >
        📊 Analytics
      </button>
      <button
        className={`tab-button ${activeTab === "recommendations" ? "active" : ""}`}
        onClick={() => setActiveTab("recommendations")}
      >
        🎯 Recommendations
      </button>
    </div>
  );
}

Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

