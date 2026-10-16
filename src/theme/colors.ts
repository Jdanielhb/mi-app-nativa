export const COLORS = {
  primary: '#4F46E5',
  primaryDark: '#3730A3',
  secondary: '#10B981',
  accent: '#F59E0B',
  danger: '#EF4444',
  background: '#F9FAFB',
  card: '#FFFFFF',
  text: '#111827',
  textLight: '#6B7280',
  border: '#E5E7EB',
  white: '#FFFFFF',
} as const;

export type ColorKeys = keyof typeof COLORS;
