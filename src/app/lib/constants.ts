// lib/constants.ts
export const SKILLS = [
  "Video Editing",
  "Motion Graphic",
];

// data untuk portfolio grid
export type Work = {
  title: string;
  tag: string;
  cover: string;
  href?: string;
};

export const WORKS: Work[] = [
  {
    title: "Brand Reel 2025",
    tag: "Video",
    cover:
      "https://images.unsplash.com/photo-1489805549589-3c5ae55fe9a8?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Motion Poster – ICE",
    tag: "Motion",
    cover:
      "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Album Artwork",
    tag: "Design",
    cover:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Cinematic Short",
    tag: "Video",
    cover:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Campaign Visuals",
    tag: "Design",
    cover:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Lookbook Photo",
    tag: "Photo",
    cover:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1600&auto=format&fit=crop",
  },
];
