/*
 * Small JavaScript file to enhance the portfolio.
 *
 * Responsibilities:
 * 1. Fill in the current year in the sidebar copyright.
 * 2. Highlight the sidebar navigation link for the section
 *    currently in view (a simple "scroll spy").
 * 3. Wire up the collapsible entries (Research, Experience,
 *    Projects, Education, ...) so clicking a row expands or
 *    collapses its details.
 * 4. Toggle between day and night modes and remember the choice.
 */

/*
 * Reusable setup for collapsible entries.
 *
 * Expected HTML structure for each entry (see index.html):
 *
 *   <article class="entry">                        <- add "is-open" to start expanded
 *     <button class="entry-toggle"
 *             aria-expanded="false"
 *             aria-controls="my-details-id">...</button>
 *     <div class="entry-details" id="my-details-id">...</div>
 *   </article>
 *
 * The function finds every .entry-toggle button on the page and makes
 * it toggle its parent entry. Because it is a real <button>, keyboard
 * support (Enter / Space) and focusability come for free.
 */
function setupCollapsibleEntries() {
  const toggleButtons = document.querySelectorAll('.entry-toggle');

  toggleButtons.forEach((button) => {
    const entry = button.closest('.entry');
    if (!entry) return;

    button.addEventListener('click', () => {
      // Flip the open state...
      const isNowOpen = entry.classList.toggle('is-open');

      // ...and keep the accessibility attribute in sync so screen
      // readers announce the row as expanded or collapsed.
      button.setAttribute('aria-expanded', String(isNowOpen));
    });
  });
}

function setupThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  const icon = toggle.querySelector('.theme-toggle-icon');

  function updateToggle(theme) {
    const isDark = theme === 'dark';
    document.documentElement.dataset.theme = theme;
    toggle.setAttribute('aria-label', `Switch to ${isDark ? 'day' : 'night'} mode`);
    if (icon) icon.textContent = isDark ? '☀' : '☾';
  }

  updateToggle(document.documentElement.dataset.theme || 'light');

  toggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    updateToggle(nextTheme);

    try {
      localStorage.setItem('portfolio-theme', nextTheme);
    } catch (error) {
      // The toggle still works when storage is unavailable.
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // --- Day/night mode ---
  setupThemeToggle();

  // --- Collapsible entries across all sections ---
  setupCollapsibleEntries();

  // --- 1. Current year in the copyright line ---
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // --- 2. Scroll spy: highlight the nav link for the visible section ---
  const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
  const sections = document.querySelectorAll('.section-card');

  function setActiveNavLink(sectionId) {
    navLinks.forEach((link) => {
      const linksToSection = link.getAttribute('href') === `#${sectionId}`;
      link.classList.toggle('active', linksToSection);
    });
  }

  function updateActiveNavLink() {
    // Use a point 30% down the viewport to decide which section is current.
    const activationPoint = window.scrollY + window.innerHeight * 0.3;
    let activeSection = sections[0];

    sections.forEach((section) => {
      if (section.offsetTop <= activationPoint) {
        activeSection = section;
      }
    });

    // At the very bottom, always select the final section (Contact).
    const isAtPageBottom =
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;

    if (isAtPageBottom) {
      activeSection = sections[sections.length - 1];
    }

    if (activeSection) {
      setActiveNavLink(activeSection.id);
    }
  }

  let clickedSectionId = null;
  let scrollEndTimer;

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      clickedSectionId = link.getAttribute('href').slice(1);
      setActiveNavLink(clickedSectionId);

      // Preserve the clicked item while the browser performs smooth scrolling.
      clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(() => {
        setActiveNavLink(clickedSectionId);
        clickedSectionId = null;
      }, 500);
    });
  });

  window.addEventListener(
    'scroll',
    () => {
      clearTimeout(scrollEndTimer);

      if (!clickedSectionId) {
        updateActiveNavLink();
        return;
      }

      // Smooth scrolling has ended when no new scroll event arrives briefly.
      scrollEndTimer = setTimeout(() => {
        setActiveNavLink(clickedSectionId);
        clickedSectionId = null;
      }, 150);
    },
    { passive: true }
  );

  updateActiveNavLink();
});
