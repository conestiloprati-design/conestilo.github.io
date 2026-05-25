async function cargarCategorias() {
  const { data } = await supabase.from("categorias").select("*");

  const cont = document.getElementById("categorias");
  cont.innerHTML = "";

  data.forEach(c => {
    cont.innerHTML += `
      <a href="categoria.html?id=${c.id}">
        <div class="card">${c.nombre}</div>
      </a>
    `;
  });
}

async function cargarDescuentos() {
  const { data } = await supabase
    .from("productos")
    .select("*")
    .eq("en_descuento", true);

  const cont = document.getElementById("descuentos");
  cont.innerHTML = "";

  data.forEach(p => {
    cont.innerHTML += `
      <div class="card">
        <img src="${p.imagen}">
        <h3>${p.nombre}</h3>
        <p>$${p.precio}</p>
      </div>
    `;
  });
}

cargarCategorias();
cargarDescuentos();