/* Sites de démonstration : les formulaires n'envoient rien, ils l'expliquent. */
(() => {
  const toast = document.createElement('div');
  toast.className = 'kc-toast'; toast.setAttribute('role', 'status');
  document.body.appendChild(toast);
  let t;
  window.kcToast = msg => { toast.textContent = msg; toast.classList.add('show'); clearTimeout(t); t = setTimeout(() => toast.classList.remove('show'), 3800); };
  document.querySelectorAll('form[data-demo]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    kcToast(f.dataset.demo || 'Site de démonstration : dans votre vrai site, cette demande vous serait envoyée.');
  }));
  /* apparition douce au défilement */
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-reveal');
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }
})();
/* aperçu pour la page d'accueil KajiCom : sans le bandeau */
if (location.hash === '#apercu') document.querySelector('.kc-demo')?.remove();
