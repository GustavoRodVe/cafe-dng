window.DNG = window.DNG || {};

/**
 * Persistencia local sobre localStorage.
 */
DNG.storage = (function () {
  function read(key, fallback) {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  }

  function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  return { read, write };
})();
