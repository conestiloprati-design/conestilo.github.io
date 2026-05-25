const params = new URLSearchParams(window.location.search);
const categoriaId = params.get("id");

async function cargarProductos() {
  const { data } = await supabase
    .from("productos")
    .select("*")
    .eq("categoria_id", categoriaId);

  const cont = document.getElementById("productos");
  cont.innerHTML = "";

  data.forEach(p => {
    cont.innerHTML += `
      <div>
        <img src="${p.imagen}">
        <h3>${p.nombre}</h3>
        <p>$${p.precio}</p>
      </div>
    `;
  });
}

cargarProductos();