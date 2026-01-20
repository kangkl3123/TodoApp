import {
  format,
  isToday,
  isTomorrow,
  isThisWeek,
  isAfter,
  isBefore,
  startOfWeek,
  endOfWeek,
  parseISO,
  addDays,
} from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * Format date for display
 */
export function formatDate(dateString, formatStr = 'M월 d일 (EEE)') {
  if (!dateString) return '';
  const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
  return format(date, formatStr, { locale: ko });
}

/**
 * Format time for display
 */
export function formatTime(timeString) {
  if (!timeString) return '';
  return timeString;
}

/**
 * Get friendly date label
 */
export function getDateLabel(dateString) {
  if (!dateString) return '날짜 없음';
  
  const date = parseISO(dateString);
  
  if (isToday(date)) return '오늘';
  if (isTomorrow(date)) return '내일';
  
  return formatDate(dateString);
}

/**
 * Filter todos by category
 */
export function filterTodosByCategory(todos, category) {
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });

  switch (category) {
    case 'today':
      return todos.filter((todo) => {
        if (!todo.dueDate) return false;
        return isToday(parseISO(todo.dueDate));
      });

    case 'week':
      return todos.filter((todo) => {
        if (!todo.dueDate) return false;
        const dueDate = parseISO(todo.dueDate);
        return isThisWeek(dueDate, { weekStartsOn: 1 }) && !isToday(dueDate);
      });

    case 'later':
      return todos.filter((todo) => {
        if (!todo.dueDate) return true; // No date = later
        const dueDate = parseISO(todo.dueDate);
        return isAfter(dueDate, weekEnd);
      });

    case 'all':
    default:
      return todos;
  }
}

/**
 * Get today's date formatted
 */
export function getTodayFormatted() {
  return format(new Date(), 'yyyy-MM-dd');
}

/**
 * Get date input min value (today)
 */
export function getMinDate() {
  return getTodayFormatted();
}

/**
 * Check if date is overdue
 */
export function isOverdue(dateString, timeString) {
  if (!dateString) return false;
  
  const now = new Date();
  const dueDate = parseISO(dateString);
  
  if (timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    dueDate.setHours(hours, minutes, 0, 0);
  } else {
    dueDate.setHours(23, 59, 59, 999);
  }
  
  return isBefore(dueDate, now);
}

/**
 * Get greeting based on time of day
 */
export function getGreeting() {
  const hour = new Date().getHours();
  
  if (hour < 6) return '좋은 새벽이에요';
  if (hour < 12) return '좋은 아침이에요';
  if (hour < 18) return '좋은 오후예요';
  return '좋은 저녁이에요';
}

/**
 * Get formatted today's date for dashboard
 */
export function getDashboardDate() {
  return format(new Date(), 'yyyy년 M월 d일 EEEE', { locale: ko });
}
