// The page remains fully readable without JavaScript.
(() => {
  const target = document.querySelector('[data-typing]');
  if (!target) return;

  const words = ['wireless systems', 'surfing', 'signal processing', 'chess', 'integrated sensing and communications', 'coded computation'];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let wordIndex = 0;
  let characterIndex = words[0].length;
  let deleting = true;
  let timer;

  function schedule(delay) {
    window.clearTimeout(timer);
    if (!reducedMotion.matches && !document.hidden) timer = window.setTimeout(step, delay);
  }

  function step() {
    const word = words[wordIndex];
    characterIndex += deleting ? -1 : 1;
    target.textContent = word.slice(0, characterIndex);

    if (deleting && characterIndex === 0) {
      wordIndex = (wordIndex + 1) % words.length;
      deleting = false;
      schedule(280);
    } else if (!deleting && characterIndex === word.length) {
      deleting = true;
      schedule(2200);
    } else {
      schedule(deleting ? 35 : 75);
    }
  }

  function reset() {
    window.clearTimeout(timer);
    wordIndex = 0;
    characterIndex = words[0].length;
    deleting = true;
    target.textContent = words[0];
    schedule(2400);
  }

  reducedMotion.addEventListener('change', reset);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) window.clearTimeout(timer);
    else schedule(800);
  });
  reset();
})();
