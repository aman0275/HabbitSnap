import { format, isSameDay, parseISO, startOfDay } from "date-fns";

export const formatDate = (date) => {
  if (typeof date === "string") {
    date = parseISO(date);
  }
  return format(date, "yyyy-MM-dd");
};

export const formatDisplayDate = (date) => {
  if (typeof date === "string") {
    date = parseISO(date);
  }
  return format(date, "MMM dd, yyyy");
};

export const formatTime = (date) => {
  if (typeof date === "string") {
    date = parseISO(date);
  }
  return format(date, "h:mm a");
};

export const formatDateTime = (date) => {
  if (typeof date === "string") {
    date = parseISO(date);
  }
  const isToday = isSameDay(date, new Date());
  if (isToday) {
    return format(date, "h:mm a");
  }
  return format(date, "MMM dd, h:mm a");
};

export const isToday = (date) => {
  if (typeof date === "string") {
    date = parseISO(date);
  }
  return isSameDay(date, new Date());
};

export const getTodayString = () => {
  return formatDate(new Date());
};

export const calculateStreak = (entries) => {
  if (!entries || entries.length === 0) return 0;

  // Get unique dates (to handle multiple entries per day)
  const uniqueDates = new Set();
  entries.forEach((entry) => {
    const dateStr =
      typeof entry.date === "string" ? entry.date : formatDate(entry.date);
    uniqueDates.add(dateStr);
  });

  // Convert to sorted array of dates (descending)
  const sortedDates = Array.from(uniqueDates)
    .map((dateStr) => startOfDay(parseISO(dateStr)))
    .sort((a, b) => b - a);

  const today = startOfDay(new Date());
  let streak = 0;
  let currentDate = startOfDay(today);

  for (const entryDate of sortedDates) {
    const daysDiff = Math.floor(
      (currentDate - entryDate) / (1000 * 60 * 60 * 24)
    );

    if (daysDiff === 0 || daysDiff === 1) {
      streak++;
      currentDate = entryDate;
    } else {
      break;
    }
  }

  return streak;
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
