window.DNG = window.DNG || {};

DNG.reservationService = (function () {
  const config = DNG.config;
  const storage = DNG.storage;
  const couponService = DNG.couponService;
  const KEY = config.STORAGE_KEYS.reservations;

  const DATE_FORMAT = /^\d{4}-\d{2}-\d{2}$/;
  const EMAIL_FORMAT = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateContact({ name, email, phone }) {
    if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 80) {
      throw new Error('Ingresa un nombre válido (2 a 80 caracteres).');
    }
    if (typeof email !== 'string' || !EMAIL_FORMAT.test(email.trim())) {
      throw new Error('Ingresa un correo válido.');
    }
    if (phone && !/^[+\d\s-]{7,20}$/.test(phone)) {
      throw new Error('El teléfono no tiene un formato válido.');
    }
  }

  function validateDate(date) {
    if (typeof date !== 'string' || !DATE_FORMAT.test(date)) {
      throw new Error('Selecciona una fecha válida.');
    }

    const reservationDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (reservationDate < today) {
      throw new Error('No puedes reservar en una fecha pasada.');
    }
    if (reservationDate.getDay() === config.CLOSED_WEEKDAY) {
      throw new Error('Los lunes estamos cerrados. Elige otro día.');
    }
  }

  function validateSlot(time) {
    if (!config.TIME_SLOTS.includes(time)) {
      throw new Error('El horario seleccionado no está disponible.');
    }
  }

  function parsePeople(value) {
    const people = Number(value);
    if (!Number.isInteger(people) || people < 1 || people > config.MAX_PEOPLE_PER_RESERVATION) {
      throw new Error(`La cantidad de personas debe estar entre 1 y ${config.MAX_PEOPLE_PER_RESERVATION}.`);
    }
    return people;
  }

  function getAll() {
    return storage.read(KEY, []);
  }

  function ensureCapacity(date, time, people) {
    const booked = getAll().filter((r) => r.date === date && r.time === time).length;
    if (booked + people > config.MAX_CAPACITY_PER_SLOT) {
      throw new Error('No quedan cupos suficientes para ese horario.');
    }
  }

  function calculateDeposit(people, coupon) {
    const base = people * 6;
    return couponService.applyDiscount(base, coupon);
  }

  function create(data) {
    validateContact(data);
    validateDate(data.date);
    validateSlot(data.time);
    const people = parsePeople(data.people);

    let coupon = null;
    if (data.coupon) {
      coupon = couponService.findValidCoupon(data.coupon);
      if (!coupon) {
        throw new Error('El cupón no es válido o ya expiró.');
      }
    }

    ensureCapacity(data.date, data.time, people);

    const reservation = {
      id: Date.now(),
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone ? data.phone.trim() : null,
      date: data.date,
      time: data.time,
      people,
      coupon: coupon ? coupon.code : null,
      deposit: calculateDeposit(people, coupon),
      createdAt: new Date().toISOString(),
    };

    storage.write(KEY, [...getAll(), reservation]);
    return reservation;
  }

  return { create, getAll };
})();
