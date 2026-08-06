(() => {
  'use strict';

  /* Single source of truth for the /ai-info "last updated" date — update
   * this value only; the page reads it at render time rather than having
   * the date hand-typed anywhere in the HTML. */
  const AI_INFO_LAST_UPDATED = { iso: '2026-08-06', label: 'August 6, 2026' };

  /* ------------------------------------------------------------------
   * AI-info page date stamp — no-ops on every other page.
   * ------------------------------------------------------------------ */
  function initAiInfoDate() {
    const el = document.getElementById('ai-info-updated');
    if (!el) return;
    el.setAttribute('datetime', AI_INFO_LAST_UPDATED.iso);
    el.textContent = AI_INFO_LAST_UPDATED.label;
  }

  /* ------------------------------------------------------------------
   * Mobile navigation toggle — semantic button + aria-expanded state.
   * ------------------------------------------------------------------ */
  function initNavToggle() {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    if (!toggle || !menu) return;

    const closeMenu = () => {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
      document.body.classList.remove('nav-scroll-lock');
    };
    const openMenu = () => {
      toggle.setAttribute('aria-expanded', 'true');
      menu.classList.add('is-open');
      document.body.classList.add('nav-scroll-lock');
    };

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMenu() : openMenu();
    });

    menu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') closeMenu();
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('#nav-menu') && !e.target.closest('#nav-toggle')) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        toggle.focus();
      }
    });
  }

  /* ------------------------------------------------------------------
   * Scroll reveal — progressive enhancement only.
   * Content is fully visible in the DOM by default (no CSS class applied
   * server-side / at parse time), so it never depends on JS to be seen.
   * We only add the reveal classes when both IntersectionObserver is
   * available and the user has not requested reduced motion.
   * ------------------------------------------------------------------ */
  function initScrollReveal() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !('IntersectionObserver' in window)) return;

    const targets = document.querySelectorAll('[data-reveal]');
    if (!targets.length) return;

    targets.forEach((el) => el.classList.add('reveal-ready'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach((el) => observer.observe(el));
  }

  /* ------------------------------------------------------------------
   * Mega menu — disclosure pattern shared by desktop dropdowns and the
   * mobile accordion (same markup, same open/close state; CSS alone
   * decides whether a panel renders as an absolute dropdown or an
   * in-flow accordion section, see styles.css).
   * ------------------------------------------------------------------ */
  function initMegaMenu() {
    const items = Array.from(document.querySelectorAll('.nav-item.has-mega'));
    if (!items.length) return;

    const desktopQuery = window.matchMedia('(min-width: 901px)');
    let hoverTimer = null;

    const isOpen = (item) => item.classList.contains('is-open');

    function closeItem(item) {
      const trigger = item.querySelector('.nav-trigger');
      const panel = item.querySelector('.mega-panel');
      item.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
      panel.setAttribute('aria-hidden', 'true');
      panel.style.maxHeight = '0px';
    }

    function openItem(item) {
      items.forEach((other) => { if (other !== item) closeItem(other); });
      const trigger = item.querySelector('.nav-trigger');
      const panel = item.querySelector('.mega-panel');
      item.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      panel.setAttribute('aria-hidden', 'false');
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }

    items.forEach((item) => {
      const trigger = item.querySelector('.nav-trigger');
      const panel = item.querySelector('.mega-panel');
      if (!trigger || !panel) return;

      // On desktop, hover already opens/closes the panel, so a click just
      // ensures it's open (never toggles it shut from under a hovering
      // mouse). On mobile/tablet there's no hover, so click is the only
      // way in — there it behaves as a normal accordion toggle.
      trigger.addEventListener('click', () => {
        if (desktopQuery.matches) {
          openItem(item);
        } else {
          isOpen(item) ? closeItem(item) : openItem(item);
        }
      });

      // Intentional hover, desktop only — a short delay avoids opening on
      // a passing cursor and avoids closing on a brief mouseout blip.
      item.addEventListener('mouseenter', () => {
        if (!desktopQuery.matches) return;
        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(() => openItem(item), 80);
      });
      item.addEventListener('mouseleave', () => {
        if (!desktopQuery.matches) return;
        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(() => closeItem(item), 150);
      });
    });

    document.addEventListener('click', (e) => {
      items.forEach((item) => {
        if (isOpen(item) && !item.contains(e.target)) closeItem(item);
      });
    });

    document.addEventListener('focusin', (e) => {
      items.forEach((item) => {
        if (isOpen(item) && !item.contains(e.target)) closeItem(item);
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      const openedItem = items.find(isOpen);
      if (!openedItem) return;
      closeItem(openedItem);
      openedItem.querySelector('.nav-trigger').focus();
    });
  }

  /* ------------------------------------------------------------------
   * Sticky header shadow on scroll — purely cosmetic, CSS-driven state.
   * ------------------------------------------------------------------ */
  function initHeaderShadow() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 4);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ------------------------------------------------------------------
   * Form mailto-bridge — composes form fields into a mailto: link on
   * submit. Zero backend, zero credentials, nothing stored client-side.
   * A real CRM endpoint can replace this later without touching markup.
   * ------------------------------------------------------------------ */
  function initFormMailtoBridge() {
    const DEMO_EMAIL = 'hello@tessavra.com';

    function handleSubmit(formEl, emailTo, subjectPrefix) {
      formEl.addEventListener('submit', function (e) {
        e.preventDefault();

        // Native HTML5 validation runs first (required, type=email, minlength).
        if (!formEl.checkValidity()) {
          formEl.reportValidity();
          return;
        }

        var fields = [];
        var formData = new FormData(formEl);
        formData.forEach(function (value, key) {
          if (value && value.trim()) {
            // Format: "Field Name: value"
            var label = key.replace(/-/g, ' ').replace(/\b\w/g, function (c) {
              return c.toUpperCase();
            });
            fields.push(label + ': ' + value.trim());
          }
        });

        var body = fields.join('\n');
        var subject = subjectPrefix;
        var mailto = 'mailto:' + emailTo
          + '?subject=' + encodeURIComponent(subject)
          + '&body=' + encodeURIComponent(body);

        // Show inline success before navigating away
        var btn = formEl.querySelector('button[type="submit"]');
        var originalText = btn ? btn.textContent : '';
        if (btn) {
          btn.textContent = 'Opening email client…';
          btn.disabled = true;
        }

        // Navigate to the composed mailto
        window.location.href = mailto;

        // Re-enable after a short delay in case the browser stays on-page
        setTimeout(function () {
          if (btn) {
            btn.textContent = originalText;
            btn.disabled = false;
          }
        }, 3000);
      });
    }

    // Demo request form
    var demoForm = document.getElementById('demo-request-form');
    if (demoForm) {
      handleSubmit(demoForm, DEMO_EMAIL, 'Tessavra Demo Request');
    }

    // Contact form
    var contactForm = document.getElementById('contact-form-el');
    if (contactForm) {
      handleSubmit(contactForm, DEMO_EMAIL, 'Tessavra Contact');
    }
  }

  function init() {
    initNavToggle();
    initScrollReveal();
    initMegaMenu();
    initHeaderShadow();
    initAiInfoDate();
    initFormMailtoBridge();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
