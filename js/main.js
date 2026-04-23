/* ===== THEME TOGGLE ===== */
(function() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  toggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
})();

/* ===== URL PARAMS ===== */
function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    id: params.get('id'),
    m: params.get('m'),
    c: params.get('c')
  };
}