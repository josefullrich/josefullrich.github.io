/*
 * Small JavaScript file to enhance the portfolio.
 *
 * Responsibilities:
 * 1. Fill in the current year in the sidebar copyright.
 * 2. Highlight the sidebar navigation link for the section
 *    currently in view (a simple "scroll spy").
 */

document.addEventListener('DOMContentLoaded', () => {
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
