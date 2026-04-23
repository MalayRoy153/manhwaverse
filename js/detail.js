document.addEventListener('DOMContentLoaded', () => {
  const { id } = getUrlParams();
  if (!id) {
    window.location.href = 'index.html';
    return;
  }

  const manhwa = getManhwa(id);
  if (!manhwa) {
    document.body.innerHTML = `
      <div class="container" style="padding-top:120px; text-align:center;">
        <h1 style="margin-bottom:1rem;">Manhwa not found</h1>
        <a href="index.html" class="btn-primary">← Back to Home</a>
      </div>`;
    return;
  }

  document.title = `${manhwa.title} - ManhwaVerse`;

  const banner = document.getElementById('detail-banner');
  if (banner) banner.style.backgroundImage = `url('${manhwa.banner}')`;

  const cover = document.getElementById('detail-cover');
  if (cover) {
    cover.src = manhwa.cover;
    cover.onerror = () => { cover.style.background = 'var(--surface-hover)'; };
  }

  const title = document.getElementById('detail-title');
  if (title) title.textContent = manhwa.title;

  const meta = document.getElementById('detail-meta');
  if (meta) {
    meta.innerHTML = `
      <span>⭐ ${manhwa.rating}</span>
      <span>📅 ${manhwa.year}</span>
      <span>✍️ ${manhwa.author}</span>
      <span style="color: var(--primary); font-weight: 700;">${manhwa.status}</span>
    `;
  }

  const genres = document.getElementById('detail-genres');
  if (genres) {
    genres.innerHTML = manhwa.genres.map(g => `<span class="genre-tag">${g}</span>`).join('');
  }

  const summary = document.getElementById('detail-summary');
  if (summary) summary.textContent = manhwa.summary;

  const chaptersList = document.getElementById('chapters-list');
  if (chaptersList) {
    const sorted = [...manhwa.chapters].sort((a, b) => b.number - a.number);

    if (sorted.length === 0) {
      chaptersList.innerHTML = '<p style="color: var(--text-secondary); padding: 2rem 0;">No chapters available yet.</p>';
    } else {
      sorted.forEach(ch => {
        const item = document.createElement('div');
        item.className = 'chapter-item';
        item.innerHTML = `
          <div class="chapter-info">
            <h3>Chapter ${ch.number}: ${ch.title}</h3>
            <span>${ch.date}</span>
          </div>
          <div class="chapter-read-btn">Read</div>
        `;
        item.onclick = () => window.location.href = `chapter.html?m=${manhwa.id}&c=${ch.id}`;
        chaptersList.appendChild(item);
      });
    }
  }
});