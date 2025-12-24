import { format, isSameDay, parseISO, startOfDay } from 'date-fns';

export const formatDate = (date) => {
  if (typeof date === 'string') {
    date = parseISO(date);
  }
  return format(date, 'yyyy-MM-dd');
};

export const formatDisplayDate = (date) => {
  if (typeof date === 'string') {
    date = parseISO(date);
  }
  return format(date, 'MMM dd, yyyy');
};

export const isToday = (date) => {
  if (typeof date === 'string') {
    date = parseISO(date);
  }
  return isSameDay(date, new Date());
};

export const getTodayString = () => {
  return formatDate(new Date());
};

export const calculateStreak = (entries) => {
  if (!entries || entries.length === 0) return 0;
  
  // Sort entries by date descending
  const sortedEntries = [...entries]
    .map(e => ({ ...e, date: parseISO(e.date) }))
    .sort((a, b) => b.date - a.date);
  
  const today = startOfDay(new Date());
  let streak = 0;
  let currentDate = startOfDay(today);
  
  for (const entry of sortedEntries) {
    const entryDate = startOfDay(entry.date);
    const daysDiff = Math.floor((currentDate - entryDate) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === 0 || daysDiff === 1) {
      if (daysDiff === 0 || (daysDiff === 1 && entry.photo)) {
        streak++;
        currentDate = entryDate;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  
  return streak;
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

