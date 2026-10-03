(function () {
  'use strict';

  var header = document.getElementById('header');
  var navToggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');
  var navLinks = nav ? nav.querySelectorAll('a') : [];
  var yearEl = document.getElementById('year');
  var form = document.getElementById('contactForm');
  var formStatus = document.getElementById('formStatus');
  var revealEls = document.querySelectorAll('.reveal');
  var counters = document.querySelectorAll('.metric-value');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  function onScrollHeader() {
    if (!header) return;
    if (window.scrollY > 12) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  function closeMenu() {
    if (!nav || !navToggle) return;
    nav.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }

  function openMenu() {
    if (!nav || !navToggle) return;
    nav.classList.add('open');
    navToggle.classList.add('active');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
  }

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      if (nav.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  document.addEventListener('click', function (e) {
    if (!nav || !navToggle) return;
    if (!nav.classList.contains('open')) return;
    if (nav.contains(e.target) || navToggle.contains(e.target)) return;
    closeMenu();
  });

  var revealObserver = null;

  if ('IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  function animateCounter(el) {
    var target = parseFloat(el.getAttribute('data-target')) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var decimals = parseInt(el.getAttribute('data-decimals'), 10) || 0;
    var duration = 1500;
    var start = null;

    if (target === 0) {
      el.textContent = '0' + suffix;
      return;
    }

    function step(timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = target * eased;
      el.textContent = current.toFixed(decimals) + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toFixed(decimals) + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  var counterObserver = null;

  if ('IntersectionObserver' in window && counters.length) {
    counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) {
      counterObserver.observe(el);
    });
  } else {
    counters.forEach(function (el) {
      var target = el.getAttribute('data-target') || '0';
      var suffix = el.getAttribute('data-suffix') || '';
      el.textContent = target + suffix;
    });
  }

  function setError(fieldName, message) {
    var errorEl = document.querySelector('[data-error-for="' + fieldName + '"]');
    var inputEl = document.getElementById(fieldName);
    if (errorEl) errorEl.textContent = message || '';
    if (inputEl) {
      if (message) {
        inputEl.classList.add('invalid');
      } else {
        inputEl.classList.remove('invalid');
      }
    }
  }

  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  }

  if (form) {
    var fields = ['name', 'email', 'message'];

    fields.forEach(function (fieldName) {
      var input = document.getElementById(fieldName);
      if (input) {
        input.addEventListener('input', function () {
          setError(fieldName, '');
          if (formStatus) formStatus.textContent = '';
        });
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      var nameVal = (document.getElementById('name').value || '').trim();
      var emailVal = (document.getElementById('email').value || '').trim();
      var messageVal = (document.getElementById('message').value || '').trim();

      if (nameVal.length < 2) {
        setError('name', 'Ingresá tu nombre.');
        valid = false;
      } else {
        setError('name', '');
      }

      if (!validEmail(emailVal)) {
        setError('email', 'Ingresá un email válido.');
        valid = false;
      } else {
        setError('email', '');
      }

      if (messageVal.length < 10) {
        setError('message', 'Contame un poco más (mínimo 10 caracteres).');
        valid = false;
      } else {
        setError('message', '');
      }

      if (!valid) {
        if (formStatus) {
          formStatus.textContent = 'Revisá los campos marcados.';
          formStatus.classList.add('error-state');
        }
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
      }

      if (formStatus) {
        formStatus.classList.remove('error-state');
        formStatus.textContent = '';
      }

      setTimeout(function () {
        if (formStatus) {
          formStatus.classList.add('success-state');
          formStatus.textContent = 'Consulta enviada. Te vamos a contactar a la brevedad.';
        }
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Enviar consulta';
        }
      }, 900);
    });
  }

  var internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;
      var targetEl = document.querySelector(targetId);
      if (!targetEl) return;
      e.preventDefault();
      var headerOffset = header ? header.offsetHeight : 0;
      var top = targetEl.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();
