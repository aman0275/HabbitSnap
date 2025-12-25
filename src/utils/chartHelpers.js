/**
 * Chart Helper Functions
 * Utility functions for chart data formatting and calculations
 */

/**
 * Format data for Victory line/bar charts
 * @param {Array} data - Array of data items
 * @returns {Array} Formatted chart data
 */
export const formatChartData = (data) => {
  return data.map((item, index) => ({
    x: index + 1,
    y: item.count || item.value || 0,
    label: item.day || item.label || "",
  }));
};

/**
 * Format data for bar charts with categorical x-axis
 * @param {Array} data - Array of data items
 * @returns {Array} Formatted bar chart data
 */
export const formatBarChartData = (data) => {
  return data.map((item, index) => ({
    x: item.day || item.label || index + 1,
    y: item.count || item.value || 0,
  }));
};

/**
 * Format data for pie charts
 * @param {Array} data - Array of data items with count/value and name
 * @returns {Array} Formatted pie chart data
 */
export const formatPieChartData = (data) => {
  return data
    .filter((item) => (item.count || item.value || 0) > 0)
    .map((item, index) => ({
      x: item.name || `Item ${index + 1}`,
      y: item.count || item.value || 0,
      color: item.color || null,
    }));
};

/**
 * Calculate percentage for pie chart labels
 * @param {number} value - Segment value
 * @param {number} total - Total value
 * @param {number} minPercentage - Minimum percentage to show label
 * @returns {string} Percentage label or empty string
 */
export const getPercentageLabel = (value, total, minPercentage = 5) => {
  if (total === 0) return "";
  const percentage = Math.round((value / total) * 100);
  return percentage > minPercentage ? `${percentage}%` : "";
};

