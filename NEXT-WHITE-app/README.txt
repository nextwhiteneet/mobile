NEXT WHITE - installable app (PWA) pack
=======================================
Upload ALL of these into the SAME folder of your GitHub repo (replace the old indexpcpro.html):
  indexpcpro.html
  manifest-pcpro.webmanifest
  sw-pcpro.js
  icons/ (folder with 3 png logos)

Then open  https://<your-site>/indexpcpro.html  (must be https, e.g. GitHub Pages).
 - Android / Chrome / Edge / desktop: tap the "Install App" button (or browser menu > Install app).
 - iPhone / iPad: open in Safari > Share > Add to Home Screen.
After the first visit the app also opens offline (the pages and fonts are cached).
To push an update later, change VERSION in sw-pcpro.js (e.g. pcpro-v2).
