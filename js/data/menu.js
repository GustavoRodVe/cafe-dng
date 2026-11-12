window.DNG = window.DNG || {};
DNG.data = DNG.data || {};

DNG.data.categories = [
  { slug: 'cafes', name: 'Cafés' },
  { slug: 'desayunos', name: 'Desayunos' },
  { slug: 'pasteleria', name: 'Pastelería' },
  { slug: 'bebidas-frias', name: 'Bebidas frías' },
];

DNG.data.menu = [
  { id: 1, category: 'cafes', name: 'Espresso doble', description: 'Blend de la casa, notas a cacao y avellana.', price: 2.5, featured: false },
  { id: 2, category: 'cafes', name: 'Flat white', description: 'Doble ristretto con leche texturizada.', price: 3.8, featured: true },
  { id: 3, category: 'cafes', name: 'Café de olla', description: 'Con canela, piloncillo y un toque de clavo.', price: 3.2, featured: false },
  { id: 4, category: 'cafes', name: 'V60 de origen', description: 'Filtrado a mano, grano de temporada.', price: 4.5, featured: true },
  { id: 5, category: 'desayunos', name: 'Tostada de palta', description: 'Pan de masa madre, palta, huevo pochado y semillas.', price: 7.9, featured: true },
  { id: 6, category: 'desayunos', name: 'Bowl de yogur', description: 'Yogur griego, granola casera y frutos rojos.', price: 6.5, featured: false },
  { id: 7, category: 'desayunos', name: 'Huevos rancheros', description: 'Tortilla, frijoles, salsa roja y queso fresco.', price: 8.4, featured: false },
  { id: 8, category: 'pasteleria', name: 'Croissant de mantequilla', description: 'Laminado artesanal, horneado cada mañana.', price: 2.9, featured: false },
  { id: 9, category: 'pasteleria', name: 'Torta de zanahoria', description: 'Con frosting de queso crema y nueces.', price: 4.2, featured: true },
  { id: 10, category: 'pasteleria', name: 'Alfajor de maicena', description: 'Relleno de dulce de leche y coco rallado.', price: 1.9, featured: false },
  { id: 11, category: 'bebidas-frias', name: 'Cold brew', description: 'Infusión en frío por 18 horas.', price: 4.0, featured: false },
  { id: 12, category: 'bebidas-frias', name: 'Limonada de menta', description: 'Limón, menta fresca y jengibre.', price: 3.5, featured: false },
  { id: 13, category: 'bebidas-frias', name: 'Iced matcha latte', description: 'Matcha ceremonial con leche de avena.', price: 4.8, featured: true },
];
