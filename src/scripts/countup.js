// Count-up: animates every [data-count] inside `root` from 0 to its target
// with an ease-out curve (fast, then slowing to a stop) once `root` scrolls
// into view. Set data-target / data-decimals / data-prefix / data-suffix on
// each element (see Stats.astro / Footprint.astro).
export function initCountUp(rootSelector, { duration = 1600, threshold = 0.4 } = {}) {
  const root = document.querySelector(rootSelector);
  if (!root) return;
  const els = Array.from(root.querySelectorAll("[data-count]"));
  if (els.length === 0) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fmt = (el, n) =>
    (el.textContent = el.dataset.prefix + n.toFixed(+el.dataset.decimals) + el.dataset.suffix);

  function run() {
    els.forEach((el) => {
      const target = parseFloat(el.dataset.target);
      const start = performance.now();
      fmt(el, 0);
      function tick(now) {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 4); // easeOutQuart
        fmt(el, target * eased);
        if (t < 1) requestAnimationFrame(tick);
        else fmt(el, target);
      }
      requestAnimationFrame(tick);
    });
  }

  if (reduce || !("IntersectionObserver" in window)) {
    els.forEach((el) => fmt(el, parseFloat(el.dataset.target)));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        run();
      }
    },
    { threshold }
  );
  io.observe(root);
}

// Parse "2.5M+" -> { prefix:"", num:2.5, decimals:1, suffix:"M+" }
export function parseValue(v) {
  const m = String(v).match(/^([^\d.-]*)(-?\d*\.?\d+)(.*)$/);
  if (!m) return { prefix: "", num: 0, decimals: 0, suffix: String(v) };
  const decimals = m[2].includes(".") ? m[2].split(".")[1].length : 0;
  return { prefix: m[1], num: parseFloat(m[2]), decimals, suffix: m[3] };
}
