window.DNG = window.DNG || {};

DNG.config = Object.freeze({
  RESTAURANT_NAME: 'Café DNG',
  CLOSED_WEEKDAY: 1, // 0 = domingo, 1 = lunes
  TIME_SLOTS: ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00'],
  MAX_CAPACITY_PER_SLOT: 20,
  MAX_PEOPLE_PER_RESERVATION: 10,
  DEPOSIT_PER_PERSON: 5,
  STORAGE_KEYS: Object.freeze({
    reservations: 'dng_reservations',
    reviews: 'dng_reviews',
    likes: 'dng_likes',
  }),
});
