/**
 * Utility functions for geographic coordinate validation and sanitization.
 * Prevents Leaflet Map rendering issues caused by invalid lat/lng values.
 */

/**
 * Validates whether a given latitude and longitude represent a mathematically valid coordinate on Earth.
 * @param {number|string} lat - Latitude
 * @param {number|string} lng - Longitude
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidCoordinate = (lat, lng) => {
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lng);
  
  return (
    !isNaN(latitude) &&
    !isNaN(longitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
};

/**
 * Sanitizes a coordinate array, returning a [lat, lng] array of floats or null if invalid.
 * @param {Array|null} coordinates - An array expected to contain [lat, lng]
 * @returns {Array|null} - Sanitized [lat, lng] or null
 */
export const sanitizeCoordinates = (coordinates) => {
  if (!coordinates || !Array.isArray(coordinates) || coordinates.length < 2) {
    return null;
  }
  
  const [lat, lng] = coordinates;
  return isValidCoordinate(lat, lng) ? [parseFloat(lat), parseFloat(lng)] : null;
};
