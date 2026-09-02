// Reveals .reveal / .reveal-scale elements as they scroll into view.
// Plain scroll listener — predictable everywhere, no library.
function initReveal() {
  let items = Array.from(document.querySelectorAll(".reveal, .reveal-scale"));
  if (items.length === 0) return;

  let ticking = false;

  function check() {
    ticking = false;
    const trigger = window.innerHeight * 0.9;
    items = items.filter((el) => {
      if (el.getBoundingClientRect().top < trigger) {
        el.classList.add("is-visible");
        return false;
      }
      return true;
    });
    if (items.length === 0) {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    }
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(check);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  check();

  // Safety net: never leave content hidden if scroll events misbehave.
  setTimeout(() => items.forEach((el) => el.classList.add("is-visible")), 4000);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initReveal);
} else {
  initReveal();
}
