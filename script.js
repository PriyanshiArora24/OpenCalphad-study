/* ============================================================
   OpenCalphad Study — Main Script
   IIT (BHU) Varanasi | Metallurgical Engineering
   ============================================================ */

(function () {

  const navbar    = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  // ── Scroll shadow ──
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  });

  // ── Hamburger toggle ──
  navToggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('open');
  });

  // ── Smooth scroll to any section by ID ──
  function scrollToId(id) {
    var target = document.getElementById(id);
    if (!target) return;
    // Reveal ALL .reveal elements on the page first so no hidden
    // elements distort the layout before we measure scroll position.
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
    // Use rAF so the browser commits style changes before we measure.
    requestAnimationFrame(function () {
      var navHeight = navbar.offsetHeight + 16;
      var top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  }

  // ── Close all open dropdowns ──
  function closeAllDropdowns() {
    document.querySelectorAll('.nav-links > li.open').forEach(function (li) {
      li.classList.remove('open');
      var btn = li.querySelector('.nav-parent');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }

  // ── Parent tab buttons (Fundamentals / Installation / Examples) ──
  document.querySelectorAll('.nav-parent').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var li = btn.closest('li');
      var wasOpen = li.classList.contains('open');
      closeAllDropdowns();
      if (!wasOpen) {
        li.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        var sectionId = btn.getAttribute('data-section');
        if (sectionId) scrollToId(sectionId);
      }
      // wasOpen → just closed (toggle off), no scroll
    });
  });

  // ── Subtab links inside dropdowns ──
  document.querySelectorAll('.nav-dropdown a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var href = link.getAttribute('href');
      if (href && href.charAt(0) === '#') {
        scrollToId(href.slice(1));
      }
      // Mobile: close menu after picking a subtab
      if (window.innerWidth <= 768) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        closeAllDropdowns();
      }
      // Desktop: keep dropdown open
    });
  });

  // ── Top-level plain links (Home, Conclusion) ──
  // Only direct <a> children of top-level <li> that are NOT inside a dropdown
  document.querySelectorAll('.nav-links > li > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      closeAllDropdowns();
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      var href = link.getAttribute('href');
      if (href && href.charAt(0) === '#') {
        scrollToId(href.slice(1));
      }
    });
  });

  // ── Hero "Explore Project" button ──
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    // Skip nav links (already handled) and pdf cta links
    if (link.closest('.navbar') || link.classList.contains('btn-primary') === false) return;
    if (link.closest('.navbar')) return;
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (href && href.charAt(0) === '#' && href.length > 1) {
        e.preventDefault();
        scrollToId(href.slice(1));
      }
    });
  });

  // ── Close dropdowns on outside click ──
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.navbar')) {
      closeAllDropdowns();
    }
  });

  // ── Reveal on scroll (IntersectionObserver) ──
  var revealEls = document.querySelectorAll('.reveal');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(function (el) { observer.observe(el); });

})();