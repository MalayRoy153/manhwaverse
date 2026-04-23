document.addEventListener('DOMContentLoaded', () => {
  const { m: manhwaId, c: chapterId } = getUrlParams();

  if (!manhwaId || !chapterId) {
    window.location.href = 'index.html';
    return;
  }

  const manhwa = getManhwa(manhwaId);
  const chapter = getChapter(manhwaId, chapterId);

  if (!manhwa || !chapter) {
    document.body.innerHTML = `
      <div style="padding:120px 2rem; text-align:center;">
        <h1 style="margin-bottom:1rem;">Chapter not found</h1>
        <a href="index.html" class="btn-primary">← Home</a>
      </div>`;
    return;
  }

  // Header info
  document.title = `${manhwa.title} Ch.${chapter.number} - ManhwaVerse`;
  document.getElementById('reader-manhwa').textContent = manhwa.title;
  document.getElementById('reader-chapter').textContent = `Ch. ${chapter.number}: ${chapter.title}`;
  document.getElementById('back-btn').href = `manhwa.html?id=${manhwaId}`;

  // Render panels
  const container = document.getElementById('reader-container');
  if (chapter.panels.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 5rem 2rem; color: var(--text-secondary);">
        <h2>No panels uploaded for this chapter yet.</h2>
      </div>`;
  } else {
    chapter.panels.forEach((src, idx) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = `Page ${idx + 1}`;
      img.loading = idx < 3 ? 'eager' : 'lazy';
      img.onerror = function() {
        this.style.minHeight = '400px';
        this.style.background = 'repeating-linear-gradient(45deg, var(--surface), var(--surface) 10px, var(--surface-hover) 10px, var(--surface-hover) 20px)';
      };
      container.appendChild(img);
    });
  }

  // Navigation
  const prevBtn = document.getElementById('prev-ch');
  const nextBtn = document.getElementById('next-ch');
  const prev = getAdjacentChapter(manhwaId, chapterId, 'prev');
  const next = getAdjacentChapter(manhwaId, chapterId, 'next');

  if (prev) {
    prevBtn.onclick = () => window.location.href = `chapter.html?m=${manhwaId}&c=${prev.id}`;
  } else {
    prevBtn.disabled = true;
  }

  if (next) {
    nextBtn.onclick = () => window.location.href = `chapter.html?m=${manhwaId}&c=${next.id}`;
  } else {
    nextBtn.disabled = true;
  }

  // Keyboard nav
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && next) window.location.href = `chapter.html?m=${manhwaId}&c=${next.id}`;
    if (e.key === 'ArrowLeft' && prev) window.location.href = `chapter.html?m=${manhwaId}&c=${prev.id}`;
  });

  // Progress bar & UI auto-hide
  const progressBar = document.getElementById('progress-bar');
  const header = document.getElementById('reader-header');
  const footer = document.getElementById('reader-footer');
  let uiVisible = true;
  let scrollTimeout;

  function updateProgress() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    progressBar.style.width = `${pct}%`;
  }

  window.addEventListener('scroll', () => {
    updateProgress();
    clearTimeout(scrollTimeout);
    if (uiVisible) {
      scrollTimeout = setTimeout(() => {
        header.classList.add('hidden');
        footer.classList.add('hidden');
        uiVisible = false;
      }, 2500);
    }
  });

  // Tap to toggle UI
  document.addEventListener('click', (e) => {
    if (e.target.closest('.reader-header') || e.target.closest('.reader-footer') || e.target.closest('.btn')) return;
    uiVisible = !uiVisible;
    header.classList.toggle('hidden', !uiVisible);
    footer.classList.toggle('hidden', !uiVisible);
  });

  updateProgress();
});