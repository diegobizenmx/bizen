# Billy Onboarding Tour Implementation

A complete guided onboarding tour system for BIZEN using Billy (our mascot) with coach marks that highlight specific UI elements.

## 📋 Features

- ✅ **First-time automatic tour** - Shows automatically when a logged-in user visits `/courses` for the first time
- ✅ **Coach marks** - Highlights specific UI elements with a pulsing border
- ✅ **Billy's speech bubbles** - Friendly explanations for each step
- ✅ **Smart positioning** - Auto-detects best placement for speech bubbles
- ✅ **Mobile responsive** - Works on all screen sizes
- ✅ **LocalStorage tracking** - Remembers if user has seen the tour
- ✅ **Manual restart** - Can be triggered again from any page
- ✅ **Blocks interaction** - Prevents clicks on the app during the tour
- ✅ **Smooth animations** - Pulsing highlights and smooth transitions

## 🗂️ File Structure

```
src/components/billy-tour/
├── billyTourConfig.ts          # Tour steps configuration
├── BillyTourContext.tsx        # React context for tour state
├── BillyTourOverlay.tsx        # Main overlay UI component
├── BillyTourProvider.tsx       # Provider with auto-start logic
├── RestartTourButton.example.tsx  # Example restart button
└── README.md                   # This file
```

## 🚀 Integration Points

### 1. Main Layout (`src/app/layout.tsx`)

The `BillyTourProvider` wraps the entire app:

```tsx
<AuthProvider>
  <BillyTourProvider>
    <AppLayout>
      <ClientLayoutWrapper>
        {children}
      </ClientLayoutWrapper>
    </AppLayout>
  </BillyTourProvider>
</AuthProvider>
```

### 2. Data Attributes Added

The following elements have `data-bizen-tour` attributes for coach marks:

| Element | Attribute | Location | Description |
|---------|-----------|----------|-------------|
| GlobalLogo | `data-bizen-tour="header"` | `src/components/GlobalLogo.tsx` | BIZEN logo in top-left |
| Courses Main | `data-bizen-tour="courses"` | `src/app/courses/page.tsx` | Main learning content area |
| Progress Widget | `data-bizen-tour="progress"` | `src/app/courses/page.tsx` | Left panel progress card |
| FixedSidebar | `data-bizen-tour="navigation"` | `src/components/FixedSidebar.tsx` | Right navigation panel (desktop) |
| MobileFooterNav | `data-bizen-tour="navigation"` | `src/components/MobileFooterNav.tsx` | Bottom navigation (mobile) |

## ⚙️ Configuration

### Tour Steps (`billyTourConfig.ts`)

Edit `BILLY_TOUR_STEPS` array to modify tour content:

```typescript
export const BILLY_TOUR_STEPS: BillyTourStep[] = [
  {
    id: "header",
    selector: '[data-bizen-tour="header"]',
    title: "¡Bienvenido a BIZEN!",
    body: "¡Hola! Soy Billy 👋 ...",
    placement: "bottom"  // "top" | "bottom" | "left" | "right" | "auto"
  },
  // ... more steps
];
```

### LocalStorage Key

The tour uses the key `bizen_onboarding_v2_seen` to track completion:

```typescript
export const BILLY_TOUR_LOCAL_STORAGE_KEY = "bizen_onboarding_v2_seen";
```

## 🎮 Usage

### Automatic Start

The tour automatically starts when:
1. User is authenticated (`user` exists)
2. User is on `/courses` page
3. LocalStorage key `bizen_onboarding_v2_seen` is not set

### Manual Restart

Use the `useBillyTour()` hook anywhere in your app:

```tsx
"use client";

import { useBillyTour } from "@/components/billy-tour/BillyTourContext";

export default function HelpMenu() {
  const { startTour, isActive } = useBillyTour();

  return (
    <button 
      onClick={startTour}
      disabled={isActive}
    >
      🐻 Ver tour de inicio
    </button>
  );
}
```

See `RestartTourButton.example.tsx` for a complete styled example.

### API Reference

The `useBillyTour()` hook provides:

```typescript
interface BillyTourContextValue {
  isActive: boolean;          // Is tour currently running?
  currentStepIndex: number;   // Current step (0-based)
  totalSteps: number;         // Total number of steps
  startTour: () => void;      // Start/restart tour
  nextStep: () => void;       // Go to next step
  prevStep: () => void;       // Go to previous step
  endTour: () => void;        // End tour immediately
}
```

## 🎨 Customization

### Colors

Main colors are defined inline but can be extracted to constants:

- **Primary Blue**: `#0B71FE` - Used for highlights and buttons
- **Gradient**: `linear-gradient(135deg, #0B71FE 0%, #4A9EFF 100%)`
- **Overlay**: `rgba(0, 0, 0, 0.60)` - Semi-transparent dark background

### Positioning

The overlay automatically calculates positions using `getBoundingClientRect()` and handles edge cases:

- **Auto-placement**: Detects available space and positions bubble accordingly
- **Collision detection**: Ensures bubble stays within viewport
- **Scroll-into-view**: Scrolls target element into view if needed

### Mobile Responsiveness

- Speech bubble width: `280px` on mobile, `360px` on desktop
- Font sizes scale appropriately
- Touch-friendly button sizes

## 🖼️ Billy Avatar

The tour expects a Billy avatar image at:

```
/billy.png (48x48 or higher)
```

If the image is not found, it falls back to a bear emoji: 🐻

## 🧪 Testing

### Test First-Time Experience

1. Clear localStorage: `localStorage.removeItem('bizen_onboarding_v2_seen')`
2. Log in to BIZEN
3. Navigate to `/courses`
4. Tour should start automatically after 1 second

### Test Manual Restart

1. Add a button with `useBillyTour().startTour()`
2. Click button - tour should start from step 1
3. Tour can be restarted even if `seen=true` in localStorage

### Test Navigation

- **Next**: Advances to next step
- **Back**: Goes to previous step (hidden on first step)
- **Skip**: Ends tour immediately
- **Click overlay**: Advances to next step (same as Next button)
- **Last step**: Button says "¡Empezar! 🚀" and ends tour

## 🐛 Troubleshooting

### Tour doesn't start automatically

1. Check if user is authenticated
2. Verify you're on `/courses` page
3. Check console for errors
4. Clear localStorage and try again

### Element not found

If you see `Element not found for selector` in console:

1. Verify the `data-bizen-tour` attribute exists on the element
2. Check if element is rendered when tour starts
3. Increase delay in `BillyTourProvider` auto-start (currently 1000ms)

### Speech bubble off-screen

The positioning algorithm should prevent this, but if it happens:

1. Check if parent elements have `overflow: hidden`
2. Verify z-index is high enough (`999999`)
3. Try different `placement` values in config

## 📝 Future Enhancements

Potential improvements:

- [ ] Add progress dots at bottom of speech bubble
- [ ] Allow keyboard navigation (Arrow keys, Escape)
- [ ] Add animation when transitioning between steps
- [ ] Support for multiple tours (beginner, advanced, feature-specific)
- [ ] Analytics tracking for tour completion rate
- [ ] A/B testing different tour content
- [ ] Video tutorials embedded in speech bubbles
- [ ] Interactive elements (click to try)

## 🔧 Technical Details

### Dependencies

- **React**: Context API and hooks
- **Next.js**: `next/image`, `next/navigation`
- **Auth Context**: `@/contexts/AuthContext` for user state

### Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Uses standard CSS and DOM APIs (no external libraries)

### Performance

- Lightweight: ~5KB gzipped
- No external dependencies
- Efficient positioning calculations using `requestAnimationFrame`
- Cleanup on unmount

## 📄 License

Part of the BIZEN application. Internal use only.

