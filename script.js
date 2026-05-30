import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient(
  'https://fypjfxwcruzmbrvoijwg.supabase.co',
  'sb_publishable_n_uQGLyDg5sgMgBRBvYdng_IqpQeX1L'
)


// ================= CATEGORÍAS =================
async function cargarCategorias() {

  const { data, error } = await supabase.from('categorias').select('*')

  if (error) {
    console.error(error)
    return
  }

  const cont = document.getElementById('categoriaGrid')
  cont.innerHTML = ''

  data.forEach(c => {

    cont.innerHTML += `
      <div class="categoria-card">
        <a href="categoria.html?id=${c.id}">
          <img src="${c.imagen}">
          <h3>${c.nombre}</h3>
        </a>
      </div>
    `
  })
}


// ================= DESCUENTOS =================
async function cargarDescuentos() {

  const { data, error } = await supabase
    .from('productos')
    .select(`
      *,
      descuentos (precio_desc)
    `)

  if (error) {
    console.error(error)
    return
  }

  const cont = document.getElementById('descuentosGrid')
  cont.innerHTML = ''

  data.forEach(p => {

    const tieneDesc = p.descuentos && p.descuentos.length > 0

    if (!tieneDesc) return

    const precioFinal = p.descuentos[0].precio_desc

    cont.innerHTML += `
      <div class="producto-card">
        <img src="${p.imagen}">
        <h3>${p.nombre}</h3>

        <p>
          <span class="precio-viejo">$${p.precio}</span>
          <span class="precio-nuevo">$${precioFinal}</span>
        </p>

        <button onclick="comprar('${p.nombre}','${precioFinal}')">
          Comprar
        </button>
      </div>
    `
  })
}


// ================= COMPRA =================
window.comprar = function(nombre, precio) {

  // 🔥 TU NÚMERO DE WHATSAPP (CAMBIA ESTO)
  const telefono = "5354555815"

  const mensaje = `Hola, quiero comprar este producto:%0A
Producto: ${nombre}%0A
Precio: $${precio}`

  const url = `https://wa.me/${telefono}?text=${mensaje}`

  window.open(url, "_blank")
}
}


// ================= INIT =================
cargarCategorias()
cargarDescuentos()
