const MANHWA_DB = [
  {
    id: "Unscientific-Beast-Taming",
    title: "Unscientific Beast Taming",
    featured: true,
    cover: "./assets/covers/unscientific-beast-taming-cover.png",
    banner: "./assets/covers/unscientific-beast-taming-banner.png",
    author: "You",
    artist: "You",
    status: "Ongoing",
    year: 2026,
    rating: 4.9,
    genres: ["Isekai", "Fantasy", "Supernatural", "Action"],
    summary: "A young man transmigrates into the body of a high school student named Shi Yu in Blue Star's Ice Plain City—a world where beast tamers form contracts with mystical creatures and grow stronger together. With no contracted beast, no resources, and working as a temporary intern at a Beast Breeding Base, he seems to start from zero. However, when a mysterious book reacts to his touch, he discovers his 'telepathy' might be something far more extraordinary than anyone imagines.",
    chapters: [
      {
        id: "ch1",
        number: 1,
        title: "Transmigration",
        date: "2026-04-23",
        panels: Array.from({length: 19}, (_, i) => 
          `./assets/manhwa/unscientific-beast-taming/chapter-1/BOARD${i+1}.png`
        )
      }
    ]
  },
  {
    id: "shadow-monarch",
    title: "Shadow Monarch",
    cover: "./assets/covers/placeholder1.jpg",
    banner: "./assets/covers/placeholder1.jpg",
    author: "Demo Author",
    status: "Completed",
    year: 2024,
    rating: 4.8,
    genres: ["Action", "Fantasy"],
    summary: "A placeholder entry to demonstrate the homepage grid layout.",
    chapters: [
      { id: "ch1", number: 1, title: "Awakening", date: "2024-01-10", panels: [] }
    ]
  },
  {
    id: "crimson-wizard",
    title: "Crimson Wizard",
    cover: "./assets/covers/placeholder2.jpg",
    banner: "./assets/covers/placeholder2.jpg",
    author: "Demo Author",
    status: "Hiatus",
    year: 2025,
    rating: 4.5,
    genres: ["Magic", "Drama"],
    summary: "Another placeholder to show scalability of the homepage.",
    chapters: [
      { id: "ch1", number: 1, title: "The Tower", date: "2025-03-15", panels: [] },
      { id: "ch2", number: 2, title: "First Spell", date: "2025-03-22", panels: [] }
    ]
  }
];

/* ===== HELPERS ===== */
function getManhwa(id) {
  return MANHWA_DB.find(m => m.id === id);
}

function getChapter(manhwaId, chapterId) {
  const manhwa = getManhwa(manhwaId);
  if (!manhwa) return null;
  return manhwa.chapters.find(c => c.id === chapterId);
}

function getAdjacentChapter(manhwaId, currentChapterId, direction) {
  const manhwa = getManhwa(manhwaId);
  if (!manhwa) return null;
  const idx = manhwa.chapters.findIndex(c => c.id === currentChapterId);
  if (idx === -1) return null;
  const newIdx = direction === 'next' ? idx + 1 : idx - 1;
  return manhwa.chapters[newIdx] || null;
}
