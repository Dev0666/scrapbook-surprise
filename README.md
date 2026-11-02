# 💌 A Little Book of Our Memories
### A Beautiful Scrapbook Surprise Gift Website

A dreamy, Pinterest-inspired, handmade scrapbook website built with React + Vite. 
Seven fully interactive pages filled with Polaroids, love notes, open-when letters, a timeline, and a final surprise.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher

### Install & Run

```bash
# Navigate to the project folder
cd "path/to/Node.js"

# Install dependencies (only needed once)
npm install

# Start the development server
npm run dev
```

The site will open automatically at **http://localhost:3000**

---

## 📄 The Seven Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Cover | Scrapbook cover with animated envelope |
| `/memories` | Memories | Interactive Polaroid photo gallery |
| `/reasons` | Reasons | Flippable love note cards |
| `/timeline` | Timeline | Scroll-animated memory timeline |
| `/letters` | Letters | Open When envelope collection |
| `/album` | Album | Photo collage with lightbox |
| `/surprise` | Surprise | Final gift reveal with confetti 🎉 |

---

## 🖼️ How to Add Your Own Photos

### Step 1 — Copy your photos to the `public/images/` folder

```
public/
  images/
    memory-01.jpg   ← Memories page, photo 1
    memory-02.jpg   ← Memories page, photo 2
    memory-03.jpg   ← Memories page, photo 3
    memory-04.jpg   ← Memories page, photo 4
    memory-05.jpg   ← Memories page, photo 5
    memory-06.jpg   ← Memories page, photo 6
    album-01.jpg    ← Album page, photo 1
    album-02.jpg    ← Album page, photo 2
    album-03.jpg    ← Album page, photo 3
    album-04.jpg    ← Album page, photo 4
    album-05.jpg    ← Album page, photo 5
    album-06.jpg    ← Album page, photo 6
    album-07.jpg    ← Album page, photo 7
    album-08.jpg    ← Album page, photo 8
```

> **Tip:** Any standard image format works (`.jpg`, `.jpeg`, `.png`, `.webp`). If you use a different filename, update the path in `src/data/scrapbookData.js`.

### Step 2 — Update captions and dates

Open `src/data/scrapbookData.js` and edit the `memories` and `albumPhotos` arrays.

---

## ✏️ How to Personalise Everything

All content is stored in one central file: **`src/data/scrapbookData.js`**

### Change the recipient's name

```js
export const scrapbookConfig = {
  recipientName: "Emily",    // ← Change this
  senderName: "Always Yours ♡",   // ← And this
  subtitle: "A tiny world made just for you ♡",
};
```

### Edit memory captions and dates

In the `memories` array:
```js
{
  id: 1,
  image: "/images/memory-01.jpg",
  caption: "Our first adventure 🌟",   // ← Caption under the Polaroid
  date: "June 2023",                   // ← Date label
  note: "This was the best day.",      // ← Note shown in the modal
  tape: "pink",        // Options: "pink", "yellow", "lavender", "sage"
  rotation: -3,        // Tilt in degrees (-10 to 10 looks natural)
}
```

### Edit love notes (Page 3)

In the `loveReasons` array — change the `message` field for each note card.

### Edit the timeline (Page 4)

In the `timelineEvents` array — edit `date`, `title`, `description`, and `image`.

### Edit Open When letters (Page 5)

In the `openWhenLetters` array — edit the `label`, `subject`, and `content` (the full letter text).

### Edit the final surprise message (Page 7)

```js
export const finalSurprise = {
  heading: "One Last Little Surprise…",
  buttonLabel: "Open Your Final Gift 💌",
  message: `Your heartfelt message here...`,
  signature: "Forever and always yours ♡",
  closingLine: "No matter how many pages I fill...",
};
```

---

## 🎨 Customising Colors & Fonts

Open `src/styles/global.css` and edit the CSS variables at the top:

```css
:root {
  --cream: #FFF8EE;
  --blush: #F6DDE5;
  --dusty-rose: #D99AA8;
  --butter: #F7E7A9;
  --lavender: #E8DFF5;
  --sage: #DCE8D5;
  --ink: #634B46;
}
```

Fonts are loaded from Google Fonts in `index.html`. The four fonts used are:
- **Caveat** — main handwritten font
- **Patrick Hand** — friendly secondary handwriting
- **Playfair Display** — elegant serif headings
- **Poppins** — clean body text

---

## 📦 Project Structure

```
src/
  components/
    Navbar.jsx         Navigation bar with scrapbook tabs
    PageNav.jsx        Bottom prev/next/home navigation
    Polaroid.jsx       Polaroid photo frame component
    LetterModal.jsx    Open When letter modal
    PhotoLightbox.jsx  Full-screen photo lightbox
    FloatingHearts.jsx Ambient floating hearts animation
    Confetti.jsx       Confetti explosion animation
  pages/
    Welcome.jsx        Cover page (/)
    Memories.jsx       Photo gallery (/memories)
    Reasons.jsx        Love notes (/reasons)
    Timeline.jsx       Memory timeline (/timeline)
    Letters.jsx        Open When letters (/letters)
    Album.jsx          Photo album (/album)
    Surprise.jsx       Final surprise (/surprise)
  data/
    scrapbookData.js   ← ALL content lives here
  styles/
    global.css         Design system, tokens, animations
    scrapbook.css      Component-specific styles
  App.jsx              Router setup
  main.jsx             React entry point
public/
  images/              ← Put your photos here
  favicon.svg
index.html
package.json
vite.config.js
```

---

## 🛠️ Build for Sharing (Optional)

```bash
npm run build
npm run preview
```

This creates an optimised `dist/` folder that can be deployed to any static host (Netlify, Vercel, GitHub Pages).

---

## 💡 Tips

- **Missing photos** will automatically show a beautiful placeholder with a camera icon — no broken images ever.
- **Keyboard shortcuts** work in the lightbox: `←` / `→` to navigate, `Escape` to close.
- **Reduced motion** is supported — animations will be disabled for users who prefer it.
- The site works **offline** after the first load (no API calls needed).

---

Made with 💖 and a lot of ✨
