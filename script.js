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

document.addEventListener('DOMContentLoaded', () => {
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

  // Watch each section; when one crosses the top part of the viewport,
  // mark its matching nav link as active.
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          const matches = link.getAttribute('href') === `#${id}`;
          link.classList.toggle('active', matches);
        });
      });
    },
    {
      // Treat a section as "current" when it is in the top 40% of the screen
      rootMargin: '0px 0px -60% 0px',
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));
});
