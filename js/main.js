/**
 * Santosh Rao - portfolio behaviour.
 * No dependencies. Everything here degrades to working plain HTML if it fails.
 */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/* -- Theme ---------------------------------------------------------------
 * The stylesheet reads every colour through light-dark(), so switching
 * themes only means changing `color-scheme` via the data-theme attribute.
 * The initial value is applied by an inline script in <head> to avoid a
 * flash of the wrong theme.
 */
function initTheme() {
  const toggle = document.querySelector('[data-theme-toggle]');
  if (!toggle) return;

  const system = window.matchMedia('(prefers-color-scheme: dark)');

  const current = () =>
    document.documentElement.dataset.theme || (system.matches ? 'dark' : 'light');

  const sync = () => {
    const isDark = current() === 'dark';
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  };

  toggle.addEventListener('click', () => {
    const next = current() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* Private mode or blocked storage - the theme just won't persist. */
    }
    sync();
  });

  // Follow the OS while the visitor has not made an explicit choice.
  system.addEventListener('change', () => {
    if (!document.documentElement.dataset.theme) sync();
  });

  sync();
}

/* -- Mobile navigation ---------------------------------------------------- */
function initNav() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const list = document.querySelector('[data-nav-list]');
  if (!toggle || !list) return;

  const setOpen = (open) => {
    list.dataset.open = String(open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  toggle.addEventListener('click', () => setOpen(list.dataset.open !== 'true'));

  list.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && list.dataset.open === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });

  // Clicking outside the open menu closes it.
  document.addEventListener('click', (event) => {
    if (list.dataset.open !== 'true') return;
    if (event.target.closest('[data-nav-list]') || event.target.closest('[data-nav-toggle]')) return;
    setOpen(false);
  });

  setOpen(false);
}

/* -- Header state on scroll ----------------------------------------------- */
function initHeader() {
  const header = document.querySelector('[data-header]');
  if (!header) return;

  // A zero-height sentinel above the header is cheaper than a scroll listener.
  const sentinel = document.createElement('div');
  sentinel.setAttribute('aria-hidden', 'true');
  sentinel.style.cssText = 'position:absolute;top:0;height:1px;width:1px;';
  document.body.prepend(sentinel);

  new IntersectionObserver(
    ([entry]) => {
      header.dataset.scrolled = String(!entry.isIntersecting);
    },
    { threshold: 0 }
  ).observe(sentinel);
}

/* -- Reveal on scroll ----------------------------------------------------- */
function initReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-in'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.1 }
  );

  targets.forEach((el) => observer.observe(el));
}

/* -- Card pointer highlight ----------------------------------------------- */
function initCardGlow() {
  if (reduceMotion.matches || !window.matchMedia('(hover: hover)').matches) return;

  document.addEventListener('pointermove', (event) => {
    const card = event.target.closest('.card');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    card.style.setProperty('--my', `${event.clientY - rect.top}px`);
  });
}

/* -- Copy to clipboard ---------------------------------------------------- */
function initCopy() {
  document.querySelectorAll('[data-copy]').forEach((button) => {
    button.addEventListener('click', async (event) => {
      // The button sits inside a link-covered row; don't follow the link.
      event.preventDefault();
      event.stopPropagation();

      const value = button.dataset.copy;
      const label = button.querySelector('[data-copy-label]');
      const original = label?.textContent;

      try {
        await navigator.clipboard.writeText(value);
        button.dataset.copied = 'true';
        if (label) label.textContent = 'Copied';
      } catch {
        // Clipboard blocked (insecure context, permission denied) - fall back
        // to selecting the text so the visitor can copy it by hand.
        const source = document.getElementById(button.dataset.copySource || '');
        if (source) getSelection()?.selectAllChildren(source);
        if (label) label.textContent = 'Press ⌘C';
      }

      setTimeout(() => {
        delete button.dataset.copied;
        if (label && original) label.textContent = original;
      }, 2000);
    });
  });
}

/* -- Marquee ------------------------------------------------------------- */
function initMarquee() {
  // The CSS animation translates one track by -100%; a duplicate keeps the
  // strip seamless. Cloning here rather than in the HTML keeps the markup
  // free of content that only exists for the animation.
  document.querySelectorAll('[data-marquee]').forEach((marquee) => {
    const track = marquee.querySelector('.marquee__track');
    if (!track) return;
    const clone = track.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    marquee.append(clone);
  });
}

/* -- Footer year ---------------------------------------------------------- */
function initYear() {
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
}

/* -- Service worker ------------------------------------------------------- */
function initServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  if (location.protocol !== 'https:' && location.hostname !== 'localhost') return;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(() => {
      /* Offline support is a bonus; never let it break the page. */
    });
  });
}

/* -- Boot ----------------------------------------------------------------- */
// Tells the inline failsafe in <head> that the module ran, so it leaves the
// `js` class (and therefore the reveal animations) in place.
window.__booted = true;

initTheme();
initNav();
initHeader();
initReveal();
initCardGlow();
initCopy();
initMarquee();
initYear();
initServiceWorker();

console.log(
  '%c Hey 👋 - thanks for opening devtools. Source: github.com/imskrao/imskrao.github.io ',
  'font: 500 13px/1.8 ui-monospace,monospace; background:#111; color:#b8ff4f; padding:8px 12px; border-radius:6px;'
);
