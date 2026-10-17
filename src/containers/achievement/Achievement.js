import React, {useState, useEffect, useContext} from "react";
import "./Achievement.scss";
import AchievementCard from "../../components/achievementCard/AchievementCard";
import MsLearnCard from "../../components/msLearnCard/MsLearnCard";
import {achievementSection} from "../../portfolio";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

function normalizeTitle(str) {
  return (str || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function titlesMatch(t1, t2) {
  const n1 = normalizeTitle(t1);
  const n2 = normalizeTitle(t2);
  if (n1 === n2) return true;
  if (
    n1.includes("solutionsarchitect") &&
    n2.includes("solutionsarchitect")
  ) {
    return true;
  }
  if (n1.includes("cloudengineer") && n2.includes("cloudengineer")) {
    return true;
  }
  if (
    n1.includes("azureadministrator") &&
    n2.includes("azureadministrator")
  ) {
    return true;
  }
  return false;
}

export default function Achievement() {
  const {isDark} = useContext(StyleContext);
  const [cards, setCards] = useState(achievementSection.achievementsCards || []);
  const [msData, setMsData] = useState(null);

  useEffect(() => {
    // 1. Fetch Credly Badges
    if (achievementSection.autoFetchCredly) {
      fetch("./credly_badges.json")
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          throw new Error("Unable to fetch credly_badges.json");
        })
        .then(fetchedBadges => {
          if (Array.isArray(fetchedBadges) && fetchedBadges.length > 0) {
            const manualCards = [...(achievementSection.achievementsCards || [])];
            const merged = [...manualCards];

            fetchedBadges.forEach(badge => {
              const matchIdx = merged.findIndex(m =>
                titlesMatch(m.title, badge.title)
              );

              if (matchIdx !== -1) {
                // If a manual card already exists (e.g. AWS or Azure), enrich with official Credly image & link
                merged[matchIdx] = {
                  ...merged[matchIdx],
                  image: badge.image || merged[matchIdx].image,
                  footerLink: badge.footerLink || merged[matchIdx].footerLink,
                  issuedAt: badge.issuedAt,
                  expiresAt: badge.expiresAt
                };
              } else {
                // New badge from Credly (e.g. Snowflake workshops, Azure Fundamentals)
                merged.push({
                  title: badge.title,
                  subtitle: badge.subtitle,
                  image: badge.image,
                  imageAlt: badge.imageAlt,
                  footerLink: badge.footerLink,
                  issuedAt: badge.issuedAt,
                  expiresAt: badge.expiresAt
                });
              }
            });

            setCards(merged);
          }
        })
        .catch(() => {
          // Fall back gracefully to manual cards from portfolio.js
          setCards(achievementSection.achievementsCards || []);
        });
    }

    // 2. Fetch Microsoft Learn Live Data
    if (achievementSection.autoFetchMsLearn) {
      fetch("./mslearn_data.json")
        .then(res => {
          if (res.ok) return res.json();
          throw new Error("Unable to fetch mslearn_data.json");
        })
        .then(data => {
          if (data) setMsData(data);
        })
        .catch(() => {
          // Fall back gracefully if not found
        });
    }
  }, []);

  if (!achievementSection.display) {
    return null;
  }

  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="achievements">
        <div className="achievement-main-div">
          <div className="achievement-header">
            <h1
              className={
                isDark
                  ? "dark-mode heading achievement-heading"
                  : "heading achievement-heading"
              }
            >
              {achievementSection.title}
            </h1>
            <p
              className={
                isDark
                  ? "dark-mode subTitle achievement-subtitle"
                  : "subTitle achievement-subtitle"
              }
            >
              {achievementSection.subtitle}
            </p>
          </div>
          <div className="achievement-cards-div">
            {cards.map((card, i) => {
              return (
                <AchievementCard
                  key={i}
                  isDark={isDark}
                  cardInfo={{
                    title: card.title,
                    description: card.subtitle,
                    image: card.image,
                    imageAlt: card.imageAlt,
                    footer: card.footerLink
                  }}
                />
              );
            })}
          </div>

          {/* Microsoft Learn Showcase & Stats Widget */}
          {msData && (
            <Fade bottom duration={1000} distance="20px">
              <MsLearnCard msData={msData} isDark={isDark} />
            </Fade>
          )}
        </div>
      </div>
    </Fade>
  );
}
