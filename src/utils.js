export const formatFileSizeDisplay = value => {
  if (value < 1024) {
    return `${value} KB`;
  }
  return `${parseFloat((value / 1024).toFixed(1))} MB`;
};

export const resolveAssetUrl = path => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  const base = import.meta.env.BASE_URL || "./";
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  return `${normalizedBase}${cleanPath}`;
};
