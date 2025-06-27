# Case Study Images Fix - Production Deployment Issue

## Problem Description

The case study images were displaying correctly on localhost but not showing up when deployed to production (Vercel). This is a common issue with static asset serving in Vite-based applications.

## Root Cause Analysis

The issue was caused by incorrect directory structure for static assets:

1. **Incorrect Structure**: The `public/` directory was located at the project root
2. **Vite Configuration**: Vite was configured with `root: path.resolve(import.meta.dirname, "client")` in `vite.config.ts`
3. **Asset Serving**: Vite expects the `public/` directory to be at the same level as the configured root directory

## Directory Structure Before Fix

```
KR-Property-Investments/
├── client/
│   ├── src/
│   └── index.html
├── public/          ← WRONG LOCATION
│   └── assets/
│       ├── case-study-before-richard/
│       ├── case-study-after-richard/
│       ├── case-studies/
│       └── ...
└── vite.config.ts
```

## Directory Structure After Fix

```
KR-Property-Investments/
├── client/
│   ├── src/
│   ├── public/      ← CORRECT LOCATION
│   │   └── assets/
│   │       ├── case-study-before-richard/
│   │       ├── case-study-after-richard/
│   │       ├── case-studies/
│   │       └── ...
│   └── index.html
└── vite.config.ts
```

## Solution Implemented

### Step 1: Move Public Directory

```bash
# PowerShell command used
move public client\public
```

### Step 2: Verify Build Process

```bash
npm run build
```

The build output confirmed that all case study images are now being properly included:

- `case-study-before-richard/` directory with all 9 images
- `case-study-after-richard/` directory with all 9 images
- `case-studies/newhaven/before/` and `case-studies/newhaven/after/` directories
- All other static assets

## Image Paths in Case Study Components

The case study components use the following image path patterns:

### 2-Bed Social Housing (2-bed-social-housing-nelincs.tsx)

```javascript
const beforeImages = [
  {
    src: "/assets/case-study-before-richard/1.jpg",
    alt: "Before - Property View 1",
  },
  // ... 9 images total
];

const afterImages = [
  {
    src: "/assets/case-study-after-richard/1.jpg",
    alt: "After - Property View 1",
  },
  // ... 9 images total
];
```

### 3-Bed to 4-Bed Newhaven (3-bed-to-4-bed-newhaven-nelincs.tsx)

```javascript
const beforeImages = [
  {
    src: "/assets/case-studies/newhaven/before/1.jpg",
    alt: "Before - Property View 1",
  },
  // ... 9 images total
];

const afterImages = [
  {
    src: "/assets/case-studies/newhaven/after/1.jpg",
    alt: "After - Property View 1",
  },
  // ... 9 images total
];
```

### 4-Bed Family Social Housing (4-bed-family-social-housing-nelincs.tsx)

```javascript
const beforeImages = [
  { src: "/assets/case-study-before/1.jpg", alt: "Before - Property View 1" },
  // ... 7 images total
];

const afterImages = [
  { src: "/assets/case-study-after/1.jpg", alt: "After - Property View 1" },
  // ... 7 images total
];
```

## Vercel Configuration

The `vercel.json` file includes the correct route configuration for serving assets:

```json
{
  "routes": [
    {
      "src": "/assets/(.*)",
      "dest": "/assets/$1"
    }
  ]
}
```

## Testing Steps

1. **Local Development**: ✅ Confirmed working with `npm run dev`
2. **Build Process**: ✅ Confirmed all assets included with `npm run build`
3. **Production Deployment**: Ready for `npx vercel --prod`

## Expected Result

After deploying to Vercel, all case study images should now display correctly in production because:

1. ✅ Assets are in the correct directory structure for Vite
2. ✅ Build process properly copies all case study images
3. ✅ Vercel routing is configured to serve `/assets/*` paths
4. ✅ Image paths in components match the deployed asset structure

## Deployment Command

To deploy the fix to production:

```bash
npx vercel --prod
```

## Verification

After deployment, visit the case study pages to verify images are loading:

- `/case-studies/2-bed-social-housing-nelincs`
- `/case-studies/3-bed-to-4-bed-newhaven-nelincs`
- `/case-studies/4-bed-family-social-housing-nelincs`

All before/after image carousels should now display properly in production.
