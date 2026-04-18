# Digital Scrapbook Architecture

## Overview
A lightweight, visually stunning, and easy-to-maintain digital scrapbook designed to be hosted on GitHub Pages. The focus is on high emotional impact with minimal technical complexity, allowing for rapid updates.

## Architecture: Data-Driven Static Site
The project uses a decoupled architecture where content is stored in a JSON file, and the UI is dynamically generated via JavaScript. This separates the "story" from the "engine."

## File Structure
```text
/
├── index.html          # Entry point & DOM container
├── data.json           # Content "database" (images, captions, metadata)
├── css/
│   └── style.css       # Layout, typography, and scrapbook aesthetics
├── js/
│   └── main.js         # Content fetching and DOM injection logic
└── assets/             # Media assets
    └── images/         # Photos and illustrations
```

## Key Components

### 1. Content Engine (`data.json`)
All memories are defined here. Each object represents a "memory" and includes:
- `type`: (e.g., 'image', 'video', 'text')
- `url`: Path to the asset.
- `caption`: A heartfelt caption or story.
- `timestamp`: The date/time of the memory.
- `animation`: The `AOS` animation class to apply (e.g., 'fade-up', 'zoom-in').

### 2. The Visual Layer (`css/style.css` & `js/main.js`)
- **Aesthetics:** Uses CSS Grid/Flexbox and Masonry.js to create a non-linear, organic scrapbook layout.
- **Animations:** Utilizes **AOS (Animate On Scroll)** to trigger animations as the user scrolls through the timeline of life.
- **Dynamic Rendering:** `main.js` fetches `data.json` using the Fetch API and builds the HTML structure on the fly.

## Recommended Libraries (Quick-Win)
- **[AOS (Animate On Scroll)](https://michalsnik.github.io/aos/):** For smooth, scroll-triggered entrance animations.
- **[Masonry.js](https://masonry.desandro.com/):** To handle the complex, overlapping layout of images with varying aspect ratios.
- **[Google Fonts](https://fonts.google.com/):** To provide elegant, personalized typography.

## Deployment
- **Platform:** GitHub Pages.
- **Method:** Simple `git push` to the main branch. The static nature of the site makes it perfect for high-availability, zero-cost hosting.

## Development Workflow
1. **Add Media:** Drop new images into `assets/images/`.
2. **Update Data:** Add a new object to `string`.
3. **Deploy:** `git add . && git commit -m "Add new memory" && git push`.
