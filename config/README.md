# Brand Configuration Guide

This directory contains centralized brand configuration for the ABNVerify application.

## Quick Start

To change the brand colors, typography, or styling across the entire application:

1. Open `config/branding.ts`
2. Modify the values in the configuration objects
3. Save the file - changes will apply everywhere

## Using the Branding System

### Import the branding config

```typescript
import { SBS_COLORS, headingStyle, bodyStyle, yellowButtonStyle, logoStyle } from './config/branding';
```

### Use helper functions for common styles

**Before (hardcoded):**
```typescript
<h1 style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>
  Welcome
</h1>
```

**After (using branding config):**
```typescript
<h1 style={headingStyle()}>
  Welcome
</h1>
```

### Use color constants

**Before (hardcoded):**
```typescript
<span style={{ color: '#fdb717' }}>Yellow Text</span>
```

**After (using branding config):**
```typescript
<span style={{ color: SBS_COLORS.standardYellow }}>Yellow Text</span>
```

### Use button styles

**Before (hardcoded):**
```typescript
<button style={{
  background: 'linear-gradient(135deg, #fdb717 0%, #fee045 100%)',
  color: '#2e2e2e'
}}>
  Click Me
</button>
```

**After (using branding config):**
```typescript
<button style={yellowButtonStyle}>
  Click Me
</button>
```

## Available Exports

### Colors
- `SBS_COLORS.popYellow` - #fee045
- `SBS_COLORS.standardYellow` - #fdb717
- `SBS_COLORS.lightCharcoal` - #828282
- `SBS_COLORS.midCharcoal` - #4b4b4b
- `SBS_COLORS.darkBase` - #2e2e2e
- Plus neutral grays, success/error/warning colors

### Gradients
- `SBS_GRADIENTS.yellowGradient` - Primary yellow gradient
- `SBS_GRADIENTS.yellowGradientSubtle` - Light background gradient

### Typography
- `SBS_TYPOGRAPHY.heading` - 'Ubuntu', sans-serif
- `SBS_TYPOGRAPHY.body` - 'Raleway', sans-serif
- Font weights: light, regular, medium, semibold, bold, extrabold

### Helper Functions
- `headingStyle(color?)` - Returns heading font + color
- `bodyStyle(color?)` - Returns body font + color
- `yellowButtonStyle` - Returns yellow gradient button styles
- `logoStyle` - Returns logo gradient background

### Chart Colors
- `CHART_COLORS.yellow` - Array of yellow shades for data visualization

## Migration Guide

To migrate a component from hardcoded styles to the branding system:

1. **Import the branding config** at the top of your component file
2. **Replace inline color hex codes** with `SBS_COLORS.*` constants
3. **Replace font-family styles** with helper functions like `headingStyle()` and `bodyStyle()`
4. **Replace gradient strings** with `yellowButtonStyle` or `logoStyle`

## Example: Full Component Migration

**Before:**
```typescript
const MyComponent = () => (
  <div>
    <h1 style={{ fontFamily: 'Ubuntu, sans-serif', color: '#2e2e2e' }}>
      Title
    </h1>
    <p style={{ fontFamily: 'Raleway, sans-serif', color: '#4b4b4b' }}>
      Description text
    </p>
    <button style={{
      background: 'linear-gradient(135deg, #fdb717 0%, #fee045 100%)',
      color: '#2e2e2e'
    }}>
      Click
    </button>
  </div>
);
```

**After:**
```typescript
import { headingStyle, bodyStyle, yellowButtonStyle, SBS_COLORS } from '../config/branding';

const MyComponent = () => (
  <div>
    <h1 style={headingStyle()}>
      Title
    </h1>
    <p style={bodyStyle()}>
      Description text
    </p>
    <button style={yellowButtonStyle}>
      Click
    </button>
  </div>
);
```

## Benefits

✅ **Single source of truth** - Change colors in one place
✅ **Consistency** - All components use the same values
✅ **Easier maintenance** - No hunting for hardcoded colors
✅ **Better readability** - `SBS_COLORS.standardYellow` is clearer than `#fdb717`
✅ **Quick rebranding** - Switch to a different brand in minutes

## Next Steps

Components that still need migration:
- Dashboard.tsx
- FileUploadModal.tsx
- EntityDetailsModal.tsx
- PricingModal.tsx
- SettingsModal.tsx
- VerificationHistory.tsx
- LandingPage.tsx
- All other page components

To migrate these, follow the pattern established in App.tsx.
