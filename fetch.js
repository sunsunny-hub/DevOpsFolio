import fs from "fs";
import process from "process";

// Simple zero-dependency .env loader
if (fs.existsSync(".env")) {
  try {
    const envContent = fs.readFileSync(".env", "utf-8");
    envContent.split("\n").forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#")) {
        const idx = trimmed.indexOf("=");
        if (idx !== -1) {
          const key = trimmed.substring(0, idx).trim();
          let val = trimmed.substring(idx + 1).trim();
          if (
            (val.startsWith('"') && val.endsWith('"')) ||
            (val.startsWith("'") && val.endsWith("'"))
          ) {
            val = val.slice(1, -1);
          }
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    });
  } catch (e) {
    console.warn("Could not read .env file:", e.message);
  }
}

if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public", { recursive: true });
}

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const USE_GITHUB_DATA = process.env.USE_GITHUB_DATA;
const MEDIUM_USERNAME = process.env.MEDIUM_USERNAME || "surajsingh5233";
const CREDLY_USERNAME =
  process.env.CREDLY_USERNAME || "suraj-singh-thakur.ffce67ef";
const MS_LEARN_USERNAME =
  process.env.MS_LEARN_USERNAME || "surajsingh-5992";

async function fetchCredly() {
  if (!CREDLY_USERNAME) return;
  console.log(`Fetching Credly badges for ${CREDLY_USERNAME}...`);
  try {
    const res = await fetch(
      `https://www.credly.com/users/${CREDLY_USERNAME}/badges.json`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          Accept: "application/json"
        },
        signal: AbortSignal.timeout(8000)
      }
    );
    if (!res.ok) {
      console.warn(`Credly API returned status ${res.status}. Skipping Credly sync.`);
      return;
    }
    const json = await res.json();
    const badges = (json.data || []).map(badge => {
      const tmpl = badge.badge_template || {};
      return {
        id: badge.id,
        title: tmpl.name || "",
        subtitle: tmpl.description || "",
        image:
          badge.image_url ||
          tmpl.image_url ||
          (tmpl.image && tmpl.image.url) ||
          "",
        imageAlt: tmpl.name || "Badge",
        issuedAt: badge.issued_at_date || badge.issued_at || "",
        expiresAt: badge.expires_at_date || badge.expires_at || null,
        footerLink: [
          {
            name: "Certification",
            url: `https://www.credly.com/badges/${badge.id}/public_url`
          }
        ]
      };
    });
    fs.writeFileSync(
      "./public/credly_badges.json",
      JSON.stringify(badges, null, 2)
    );
    console.log(`Saved ${badges.length} Credly badge(s) to public/credly_badges.json`);
  } catch (err) {
    console.warn("Could not fetch Credly badges:", err.message);
  }
}

async function fetchMicrosoftLearn() {
  if (!MS_LEARN_USERNAME) return;
  console.log(`Fetching Microsoft Learn data for ${MS_LEARN_USERNAME}...`);
  try {
    const profileRes = await fetch(
      `https://learn.microsoft.com/api/profiles/${MS_LEARN_USERNAME}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          Accept: "application/json"
        },
        signal: AbortSignal.timeout(8000)
      }
    );
    if (!profileRes.ok) {
      console.warn(`MS Learn profile request returned status ${profileRes.status}.`);
      return;
    }
    const profile = await profileRes.json();
    const userId = profile.userId;
    if (!userId) {
      console.warn("Could not find userId for MS Learn profile.");
      return;
    }

    const [xpRes, achRes] = await Promise.all([
      fetch(`https://learn.microsoft.com/api/achievements/xp/${userId}`, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          Accept: "application/json"
        },
        signal: AbortSignal.timeout(8000)
      }),
      fetch(
        `https://learn.microsoft.com/api/achievements/user/${userId}?locale=en-us`,
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
            Accept: "application/json"
          },
          signal: AbortSignal.timeout(8000)
        }
      )
    ]);

    const xpData = xpRes.ok ? await xpRes.json() : {};
    const achData = achRes.ok ? await achRes.json() : {};

    const learningPaths = (achData.achievements || [])
      .filter(a => (a.category || "").toLowerCase() === "learningpaths")
      .sort((a, b) => new Date(b.grantedOn) - new Date(a.grantedOn))
      .slice(0, 12)
      .map(lp => ({
        id: lp.id,
        title: lp.title,
        grantedOn: lp.grantedOn ? lp.grantedOn.split("T")[0] : "",
        url: "https://learn.microsoft.com/en-us" + (lp.url || ""),
        imageUrl: (lp.imageUrl || "").startsWith("http")
          ? lp.imageUrl
          : `https://learn.microsoft.com${lp.imageUrl || "/training/achievements/generic-trophy.svg"}`
      }));

    const msLearnPayload = {
      username: MS_LEARN_USERNAME,
      profileUrl: `https://learn.microsoft.com/en-us/users/${MS_LEARN_USERNAME}/`,
      displayName: profile.displayName || "Suraj Singh Thakur",
      avatarUrl: profile.avatarUrl || "",
      reputationPoints: profile.reputationPoints || 0,
      level: xpData.currentLevel || 13,
      totalXp: xpData.totalXp || 351400,
      currentLevelLow: xpData.currentLevelLow || 0,
      currentLevelHigh: xpData.currentLevelHigh || 0,
      badgesCount:
        ((xpData.achievementCategories && xpData.achievementCategories.Modules) || 0) +
        ((xpData.achievementCategories && xpData.achievementCategories.Courses) || 0) || 251,
      trophiesCount:
        (xpData.achievementCategories && xpData.achievementCategories.LearningPaths) || 37,
      learningPaths: learningPaths
    };

    fs.writeFileSync(
      "./public/mslearn_data.json",
      JSON.stringify(msLearnPayload, null, 2)
    );
    console.log(
      `Saved Microsoft Learn data (Level ${msLearnPayload.level}, ${msLearnPayload.badgesCount} badges, ${msLearnPayload.trophiesCount} trophies) to public/mslearn_data.json`
    );
  } catch (err) {
    console.warn("Could not fetch Microsoft Learn data:", err.message);
  }
}

async function fetchGitHub() {
  if (USE_GITHUB_DATA !== "true" || !GITHUB_USERNAME || !GITHUB_TOKEN) return;
  console.log(`Fetching profile data for GitHub user: ${GITHUB_USERNAME}...`);
  try {
    const query = JSON.stringify({
      query: `
{
  user(login:"${GITHUB_USERNAME}") { 
    name
    bio
    avatarUrl
    location
    pinnedItems(first: 6, types: [REPOSITORY]) {
      totalCount
      edges {
          node {
            ... on Repository {
              name
              description
              forkCount
              stargazers {
                totalCount
              }
              url
              id
              diskUsage
              primaryLanguage {
                name
                color
              }
            }
          }
        }
      }
    }
}
`
    });
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "User-Agent": "Node",
        "Content-Type": "application/json"
      },
      body: query,
      signal: AbortSignal.timeout(8000)
    });
    if (!res.ok) {
      console.warn(`GitHub GraphQL returned status ${res.status}.`);
      return;
    }
    const text = await res.text();
    fs.writeFileSync("./public/profile.json", text);
    console.log("Saved GitHub profile data to public/profile.json");
  } catch (err) {
    console.warn("GitHub request failed:", err.message);
  }
}

async function fetchMedium() {
  if (!MEDIUM_USERNAME) return;
  console.log(`Fetching Medium blogs data for ${MEDIUM_USERNAME}...`);
  try {
    const res = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`,
      {
        signal: AbortSignal.timeout(8000)
      }
    );
    if (!res.ok) {
      console.warn(`Medium RSS request returned status ${res.status}.`);
      return;
    }
    const text = await res.text();
    fs.writeFileSync("./public/blogs.json", text);
    console.log("Saved Medium blogs to public/blogs.json");
  } catch (err) {
    console.warn("Medium request failed:", err.message);
  }
}

async function main() {
  await Promise.allSettled([
    fetchCredly(),
    fetchMicrosoftLearn(),
    fetchGitHub(),
    fetchMedium()
  ]);
  console.log("Fetch operations finished.");
}

main();
