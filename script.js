// Basic interactivity: mobile nav toggle, lightbox, form handling, year update
document.addEventListener('DOMContentLoaded', function () {
  // mobile nav toggles (supports multiple buttons)
  document.querySelectorAll('.nav-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const nav = btn.nextElementSibling || document.getElementById('siteNav');
      if (nav) nav.style.display = nav.style.display === 'flex' || nav.style.display === 'block' ? 'none' : 'flex';
    });
  });

  // auto-update copyright year
  const years = [ 'year', 'year2', 'year3', 'year4' ];
  years.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = new Date().getFullYear();
  });

  // lightbox for gallery links
  function openLightbox(imgSrc, alt) {
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lbImg') || document.getElementById('lbImgG');
    if (!lb || !lbImg) return;
    lbImg.src = imgSrc;
    lbImg.alt = alt || '';
    lb.style.display = 'flex';
    lb.setAttribute('aria-hidden','false');
  }
  function closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (!lb) return;
    lb.style.display = 'none';
    lb.setAttribute('aria-hidden','true');
    const lbImg = document.getElementById('lbImg') || document.getElementById('lbImgG');
    if (lbImg) lbImg.src = '';
  }

  document.querySelectorAll('.gallery-item').forEach(a => {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      openLightbox(a.href, a.querySelector('img')?.alt || '');
    });
  });
  document.querySelectorAll('.lb-close').forEach(btn => btn.addEventListener('click', closeLightbox));
  document.addEventListener('keyup', (e) => { if (e.key === 'Escape') closeLightbox(); });

  // contact form: show simple message on success/failure (works with Formspree)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      const msgEl = document.getElementById('formMsg');
      msgEl.textContent = 'Sending…';
      // If using Formspree or other external provider, let the browser handle submit.
      // For nicer UX, you could do AJAX here. We'll let native submit happen.
      // Delay to show the "Sending…" message if the action is external.
      await new Promise(r => setTimeout(r, 600));
      // Leave actual form submission to browser normally.
    });
  }
});