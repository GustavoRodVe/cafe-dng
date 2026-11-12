# Café DNG ☕

Landing page para una cafetería de especialidad: menú con filtros, favoritos (♥), reserva de mesa con abono y cupones de descuento, y reseñas de clientes.

Sitio 100% estático: HTML, CSS y JavaScript vanilla, sin dependencias, sin servidor y sin base de datos. Lo que ingresa el usuario (reservas, reseñas, favoritos) se guarda en el `localStorage` del navegador.

## Cómo ejecutarlo

Abre `index.html` en el navegador (doble clic), o usa la extensión **Live Server** de VS Code.

### Cupones de prueba

`BIENVENIDA10`, `DNG20`

### Links de campaña

Los links de redes sociales precargan un cupón: `index.html?promo=BIENVENIDA10`

## Estructura

```
index.html
css/styles.css
js/
├── config.js                # Parámetros del negocio
├── data/                    # Menú y cupones
├── core/                    # EventBus y persistencia (localStorage)
├── services/                # Reglas de negocio
├── views/                   # Renderizado y eventos del DOM
└── app.js                   # Arranque de la aplicación
```

Los scripts se cargan en orden desde `index.html`; cada módulo se registra en el namespace global `DNG`.
