function comprar(producto, precio){

  const telefono = '5358231944';

  const mensaje =
  `Hola, quiero comprar ${producto} con precio ${precio}`;

  const url =
  `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

  window.open(url, '_blank');
}
