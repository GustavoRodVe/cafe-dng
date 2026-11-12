window.DNG = window.DNG || {};

DNG.likeService = (function () {
  const storage = DNG.storage;
  const KEY = DNG.config.STORAGE_KEYS.likes;

  function getAll() {
    return storage.read(KEY, {});
  }

  function count(itemId) {
    return getAll()[itemId] || 0;
  }

  function like(itemId) {
    const likes = getAll();
    likes[itemId] = (likes[itemId] || 0) + 1;
    storage.write(KEY, likes);
    return likes[itemId];
  }

  return { count, like };
})();
