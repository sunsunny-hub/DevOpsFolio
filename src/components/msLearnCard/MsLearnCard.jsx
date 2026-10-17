import React, { useState } from "react";
import "./MsLearnCard.scss";

export default function MsLearnCard({ msData, isDark }) {
  const [showAllPaths, setShowAllPaths] = useState(false);

  if (!msData) return null;

  const {
    displayName,
    profileUrl,
    avatarUrl,
    level = 13,
    totalXp = 351400,
    currentLevelLow = 332000,
    currentLevelHigh = 483199,
    badgesCount = 251,
    trophiesCount = 37,
    reputationPoints = 21,
    learningPaths = []
  } = msData;

  const xpProgress =
    currentLevelHigh > currentLevelLow
      ? Math.min(
          100,
          Math.max(
            5,
            Math.round(
              ((totalXp - currentLevelLow) / (currentLevelHigh - currentLevelLow)) *
                100
            )
          )
        )
      : 75;

  const displayedPaths = showAllPaths ? learningPaths : learningPaths.slice(0, 4);

  return (
    <div className={`ms-learn-container ${isDark ? "dark-mode" : ""}`}>
      {/* Top Profile & Stats Banner */}
      <div className="ms-learn-card">
        <div className="ms-learn-header">
          <div className="ms-brand">
            <svg
              className="ms-logo-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 23 23"
              width="28"
              height="28"
            >
              <rect x="1" y="1" width="10" height="10" fill="#f25022" />
              <rect x="12" y="1" width="10" height="10" fill="#7fba00" />
              <rect x="1" y="12" width="10" height="10" fill="#00a4ef" />
              <rect x="12" y="12" width="10" height="10" fill="#ffb900" />
            </svg>
            <div>
              <h3 className="ms-title">Microsoft Learn Profile</h3>
              <p className="ms-subtitle">Official Continuous Learning & Skills</p>
            </div>
          </div>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ms-profile-link-btn"
          >
            Verify Profile ↗
          </a>
        </div>

        <div className="ms-profile-info-row">
          <div className="ms-user-profile">
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt={displayName}
                className="ms-user-avatar"
              />
            )}
            <div>
              <h4 className="ms-user-name">{displayName}</h4>
              <span className="ms-level-badge">Level {level}</span>
            </div>
          </div>

          <div className="ms-stats-grid">
            <div className="ms-stat-pill">
              <span className="ms-stat-number">{badgesCount}</span>
              <span className="ms-stat-label">Badges Earned</span>
            </div>
            <div className="ms-stat-pill">
              <span className="ms-stat-number">{trophiesCount}</span>
              <span className="ms-stat-label">Trophies</span>
            </div>
            <div className="ms-stat-pill">
              <span className="ms-stat-number">{reputationPoints}</span>
              <span className="ms-stat-label">Reputation</span>
            </div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="ms-xp-container">
          <div className="ms-xp-labels">
            <span>
              <strong>{totalXp.toLocaleString()} XP</strong> Earned
            </span>
            <span>Level {level + 1} Goal: {currentLevelHigh.toLocaleString()} XP</span>
          </div>
          <div className="ms-progress-bar-bg">
            <div
              className="ms-progress-bar-fill"
              style={{ width: `${xpProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Completed Learning Paths & Trophies */}
      {learningPaths.length > 0 && (
        <div className="ms-paths-section">
          <div className="ms-paths-header">
            <h4 className="ms-paths-title">
              Completed Learning Paths ({trophiesCount})
            </h4>
            <span className="ms-paths-caption">
              Live automated feed from Microsoft Learn
            </span>
          </div>

          <div className="ms-paths-grid">
            {displayedPaths.map(path => (
              <a
                key={path.id}
                href={path.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ms-path-card"
              >
                <div className="ms-path-img-wrapper">
                  <img
                    src={path.imageUrl}
                    alt="Trophy"
                    className="ms-path-trophy-img"
                    onError={e => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
                <div className="ms-path-content">
                  <span className="ms-path-tag">TROPHY</span>
                  <h5 className="ms-path-card-title">{path.title}</h5>
                  {path.grantedOn && (
                    <span className="ms-path-date">
                      Completed: {path.grantedOn}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>

          {learningPaths.length > 4 && (
            <div className="ms-view-more-container">
              <button
                className="ms-view-more-btn"
                onClick={() => setShowAllPaths(!showAllPaths)}
              >
                {showAllPaths
                  ? "Show Fewer Learning Paths"
                  : `Show All Recent Learning Paths (${learningPaths.length})`}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
