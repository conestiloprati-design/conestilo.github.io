async function cargarCategorias() {
  const { data } = await supabase.from("categorias").select("*");

  const select = document.getElementById("categoria");
  select.innerHTML = "";

  data.forEach(c => {
    select.innerHTML += `<option value="${c.id}">${c.nombre}</option>`;
  });
}

async function agregarCategoria() {
  const nombre = document.getElementById("nuevaCategoria").value;

  await supabase.from("categorias").insert([{ nombre }]);

  cargarCategorias();
}

async function agregarProducto() {
  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;
  const imagen = document.getElementById("imagen").value;
  const categoria_id = document.getElementById("categoria").value;
  const en_descuento = document.getElementById("descuento").checked;

  await supabase.from("productos").insert([{
    nombre,
    precio,
    imagen,
    categoria_id,
    en_descuento
  }]);

  cargarProductos();
}

async function cargarProductos() {
  const { data } = await supabase.from("productos").select("*");

  const cont = document.getElementById("listaProductos");
  cont.innerHTML = "";

  data.forEach(p => {
    cont.innerHTML += `
      <div>
        <h3>${p.nombre}</h3>
        <button onclick="eliminarProducto('${p.id}')">Eliminar</button>
      </div>
    `;
  });
}

async function eliminarProducto(id) {
  await supabase.from("productos").delete().eq("id", id);
  cargarProductos();
}

cargarCategorias();
cargarProductos();

