# Add the supplied hero artwork

## What will change

- Add the uploaded image unchanged as the home page hero beneath the existing header.
- Preserve the image’s exact 1034:485 proportions at every screen size without cropping or distortion.
- Place one accessible, transparent link over the pictured “تسوق الآن” brush-stroke area, using percentage positioning so it remains aligned on desktop, tablet, and mobile.
- Link the call-to-action to a dedicated `/shop` page and add that destination with Hijab Soul metadata.
- Keep the existing RTL header, vintage desktop sidebar, mobile drawer, and cream page styling unchanged.

## Technical details

- Store the uploaded artwork through the project asset service and import its generated pointer.
- Use an aspect-ratio wrapper with a responsive `<img>` and an absolutely positioned TanStack Router link.
- Verify the alignment and navigation in desktop and mobile viewport sizes.
