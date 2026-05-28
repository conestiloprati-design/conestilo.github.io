import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// 🔴 PON TUS DATOS AQUÍ
const supabase = createClient(
  'https://fypjfxwcruzmbrvoijwg.supabase.co',
  'sb_publishable_n_uQGLyDg5sgMgBRBvYdng_IqpQeX1L'
)

// 📦 CARGAR PRODUCTOS
async function cargarProductos() {
  const { data } = await supabase.from('productos').select('*')

  const contenedor = document.getElementById('productos')
  contenedor.innerHTML = ''

  data.forEach(p => {
    contenedor.innerHTML += `
      <div class="producto">
        <img src="${p.imagen}">
        <h3>${p.nombre}</h3>
        <p class="${p.precio == 0 ? 'agotado' : ''}">
          ${p.precio == 0 ? 'Agotado' : '$' + p.precio}
        </p>
        <small>${p.categoria}</small>
      </div>
    `
  })
}

// ➕ AGREGAR PRODUCTO
window.agregarProducto = async function() {
  const nombre = document.getElementById('nombre').value
  const precio = parseFloat(document.getElementById('precio').value)
  const imagen = document.getElementById('imagen').value
  const categoria = document.getElementById('categoria').value

  await supabase.from('productos').insert([
    { nombre, precio, imagen, categoria }
  ])

  cargarProductos()
  cargarCategorias()
}

// 🏷️ CARGAR CATEGORÍAS
async function cargarCategorias() {
  const { data } = await supabase.from('productos').select('categoria')

  const categoriasUnicas = [...new Set(data.map(p => p.categoria))]

  const contenedor = document.getElementById('categorias')
  contenedor.innerHTML = ''

  categoriasUnicas.forEach(cat => {
    contenedor.innerHTML += `<button onclick="filtrar('${cat}')">${cat}</button>`
  })
}

// 🔍 FILTRAR
window.filtrar = async function(cat) {
  const { data } = await supabase
    .from('productos')
    .select('*')
    .eq('categoria', cat)

  const contenedor = document.getElementById('productos')
  contenedor.innerHTML = ''

  data.forEach(p => {
    contenedor.innerHTML += `
      <div class="producto">
        <img src="${p.imagen}">
        <h3>${p.nombre}</h3>
        <p>${p.precio == 0 ? 'Agotado' : '$' + p.precio}</p>
      </div>
    `
  })
}

// 🚀 INICIO
cargarProductos()
cargarCategorias()
