window.DNG = window.DNG || {};

/**
 * Bus de eventos de la aplicación (Observer + Singleton).
 * Permite que los servicios notifiquen a las vistas sin conocerlas.
 */
DNG.EventBus = (function () {
  function createBus() {
    const listeners = {};

    return {
      on(event, handler) {
        (listeners[event] = listeners[event] || []).push(handler);
        return () => {
          listeners[event] = listeners[event].filter((h) => h !== handler);
        };
      },
      emit(event, payload) {
        (listeners[event] || []).forEach((handler) => handler(payload));
      },
    };
  }

  return {
    _instance: null,

    getInstance() {
      if (!this._intance) {
        this._instance = createBus();
      }
      return this._instance;
    },
  };
})();
