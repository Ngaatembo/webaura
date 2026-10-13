/* WebAura homepage behaviour: header ink by chapter, entrance reveals, mobile menu.
   No dependencies. Everything degrades to a fully visible static page. */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var header = document.querySelector('.site-header');
  var chapters = Array.prototype.slice.call(document.querySelectorAll('.chapter[data-ink]'));

  /* Header takes the ink of the chapter beneath it (300ms colour transition lives in CSS). */
  var ticking = false;
  function setInk() {
    ticking = false;
    if (!header) return;
    var y = header.offsetHeight / 2, ink = 'dark';
    for (var i = 0; i < chapters.length; i++) {
      var r = chapters[i].getBoundingClientRect();
      if (r.top <= y && r.bottom > y) { ink = chapters[i].getAttribute('data-ink'); break; }
    }
    if (header.getAttribute('data-ink') !== ink) header.setAttribute('data-ink', ink);
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(setInk); } }
  setInk();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  /* Entrance: heading, then text, then picture, staggered via --i. Runs once per element. */
  var items = document.querySelectorAll('.rise');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  /* Mobile menu */
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');
  if (btn && nav && header) {
    function close() {
      header.classList.remove('menu-open');
      btn.setAttribute('aria-expanded', 'false');
      btn.textContent = 'Menu';
    }
    btn.addEventListener('click', function () {
      var open = header.classList.toggle('menu-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? 'Close' : 'Menu';
    });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }
})();
