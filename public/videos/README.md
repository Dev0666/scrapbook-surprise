# Video Memories Folder

Drop your `.mp4` or `.webm` video clips in this folder!

For example:
- `memory-video-01.mp4`
- `timeline-first-adventure.mp4`
- `album-clip-01.mp4`

Then reference them in `src/data/scrapbookData.js`:
```js
{
  id: 1,
  image: "/images/memory-01.jpeg", // Poster image fallback
  video: "/videos/memory-video-01.mp4", // Your video path here!
  caption: "That beautiful day ☀️",
  note: "The day everything felt perfect.",
  tape: "pink",
  rotation: -3,
}
```

The scrapbook components automatically detect when a video is configured, display a cinematic video indicator, provide play/pause controls, fullscreen, mute/unmute, and cleanly fallback to the photograph if no video is present!

