/**
 * SBS On Demand Brand Configuration
 *
 * This file contains all brand colors, typography, and styling constants.
 * Change values here to update the entire application.
 */

export const SBS_COLORS = {
  // Primary Brand Colors
  popYellow: '#fee045',
  standardYellow: '#fdb717',

  // Charcoal Palette
  lightCharcoal: '#828282',
  midCharcoal: '#4b4b4b',
  darkBase: '#2e2e2e',

  // Light backgrounds
  lightYellow: '#fff9e6',

  // Accent Colors (for status indicators)
  success: '#10b981', // green
  error: '#ef4444',   // red
  warning: '#f59e0b', // amber

  // Neutral Colors
  white: '#ffffff',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray500: '#6b7280',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
} as const;

export const SBS_GRADIENTS = {
  // Primary yellow gradient for buttons and highlights
  yellowGradient: 'linear-gradient(135deg, #fdb717 0%, #fee045 100%)',

  // Subtle yellow gradient for backgrounds
  yellowGradientSubtle: 'linear-gradient(135deg, #fff9e6 0%, #fffbf0 100%)',
} as const;

export const SBS_TYPOGRAPHY = {
  // Font families
  heading: "'Ubuntu', sans-serif",
  body: "'Raleway', sans-serif",
  mono: "'Monaco', 'Courier New', monospace",

  // Font weights
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const;

export const SBS_BACKGROUNDS = {
  // Light yellow backgrounds for info boxes, cards, etc.
  lightYellow: '#fff9e6',
  offWhite: '#fffbf0',
} as const;

export const SBS_STYLES = {
  // Common border radius values
  borderRadius: {
    sm: '0.5rem',    // 8px - rounded-lg
    md: '0.75rem',   // 12px - rounded-xl
    lg: '1rem',      // 16px - rounded-2xl
    xl: '1.5rem',    // 24px - rounded-3xl
    full: '9999px',  // rounded-full
  },

  // Common shadows
  shadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },
} as const;

/**
 * Helper function to create inline styles for headings
 */
export const headingStyle = (color: string = SBS_COLORS.darkBase) => ({
  fontFamily: SBS_TYPOGRAPHY.heading,
  color,
});

/**
 * Helper function to create inline styles for body text
 */
export const bodyStyle = (color: string = SBS_COLORS.midCharcoal) => ({
  fontFamily: SBS_TYPOGRAPHY.body,
  color,
});

/**
 * Helper function to create yellow gradient button styles
 */
export const yellowButtonStyle = {
  background: SBS_GRADIENTS.yellowGradient,
  color: SBS_COLORS.darkBase,
  fontFamily: SBS_TYPOGRAPHY.body,
};

/**
 * Helper function to create logo styles
 */
export const logoStyle = {
  background: SBS_GRADIENTS.yellowGradient,
};

/**
 * Helper function to create icon color styles
 */
export const yellowIconStyle = {
  color: SBS_COLORS.standardYellow,
};

/**
 * Chart color palettes for data visualization
 */
export const CHART_COLORS = {
  yellow: [
    SBS_COLORS.standardYellow,  // #fdb717
    SBS_COLORS.popYellow,        // #fee045
    '#ffcc00',
    '#ffe680',
    '#fff9e6',
    SBS_COLORS.standardYellow,   // repeat for more data points
  ],
};
