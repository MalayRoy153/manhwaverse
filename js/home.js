document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('manhwa-grid');
  const heroContent = document.getElementById('hero-content');
  const hero = document.getElementById('hero');

  // Render Featured Hero
  const featured = MANHWA_DB.find(m => m.featured) || MANHWA_DB[0];
  if (featured && heroContent) {
    heroContent.innerHTML = `
      <span class="hero-label">Featured</span>
      <h1>${featured.title}</h1>
      <p>${featured.summary.substring(0, 140)}${featured.summary.length > 140 ? '...' : ''}</p>
      <a href="manhwa.html?id=${featured.id}" class="btn-primary">Read Now</a>
    `;
    if (hero) {
      hero.style.backgroundImage = `linear-gradient(135deg, rgba(var(--primary-rgb),0.2), rgba(var(--bg-rgb),0.9)), url('${featured.banner}')`;
      hero.style.backgroundSize = 'cover';
      hero.style.backgroundPosition = 'center';
    }
  }

  // Render Grid
  if (!grid) return;

  MANHWA_DB.forEach(manhwa => {
    const card = document.createElement('div');
    card.className = 'card';
    card.onclick = () => window.location.href = `manhwa.html?id=${manhwa.id}`;

    const latestCh = manhwa.chapters[manhwa.chapters.length - 1];

    card.innerHTML = `
      <div class="card-image">
        <img src="${manhwa.cover}" alt="${manhwa.title}" loading="lazy" 
          onerror="this.style.display='none'; this.parentElement.style.background='linear-gradient(135deg, var(--surface-hover), var(--border))';">
        <span class="card-badge">${manhwa.status}</span>
      </div>
      <div class="card-content">
        <div class="card-title">${manhwa.title}</div>
        <div class="card-meta">Ch. ${latestCh?.number || 0} • ${manhwa.genres[0]}</div>
      </div>
    `;

    grid.appendChild(card);
  });
});