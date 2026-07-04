/*
 * Small JavaScript file to enhance the user experience of the portfolio.
 *
 * Responsibilities:
 * 1. Toggle the mobile navigation menu when the hamburger icon is clicked.
 * 2. Populate the current year in the footer automatically.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Insert current year into the footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});