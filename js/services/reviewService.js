window.DNG = window.DNG || {};

DNG.reviewService = (function () {
  const storage = DNG.storage;
  const KEY = DNG.config.STORAGE_KEYS.reviews;

  const DEFAULT_REVIEWS = [
    { id: 3, name: 'Lucía P.', rating: 5, comment: 'La torta de zanahoria es increíble y la atención muy cálida.', createdAt: '2026-10-28T15:20:00.000Z' },
    { id: 2, name: 'Andrés M.', rating: 4, comment: 'Muy buen ambiente para trabajar, aunque a mediodía se llena.', createdAt: '2026-10-14T13:05:00.000Z' },
    { id: 1, name: 'Camila R.', rating: 5, comment: 'El flat white es el mejor que he probado en la ciudad. Volveré.', createdAt: '2026-09-30T11:45:00.000Z' },
  ];

  function list() {
    return storage.read(KEY, DEFAULT_REVIEWS);
  }

  function create({ name, rating, comment }) {
    const stars = Number(rating);

    if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 60) {
      throw new Error('Ingresa un nombre válido (2 a 60 caracteres).');
    }
    if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
      throw new Error('La calificación debe ser de 1 a 5 estrellas.');
    }
    if (typeof comment !== 'string' || comment.trim().length < 5 || comment.trim().length > 400) {
      throw new Error('El comentario debe tener entre 5 y 400 caracteres.');
    }

    const review = {
      id: Date.now(),
      name: name.trim(),
      rating: stars,
      comment: comment.trim(),
      createdAt: new Date().toISOString(),
    };

    storage.write(KEY, [review, ...list()].slice(0, 12));
    DNG.EventBus.getInstance().emit('review:created', review);
    return review;
  }

  return { list, create };
})();
