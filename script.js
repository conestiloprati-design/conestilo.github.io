import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// 🔴 PON TUS DATOS AQUÍ
const supabase = createClient(
  'https://fypjfxwcruzmbrvoijwg.supabase.co',
  'sb_publishable_n_uQGLyDg5sgMgBRBvYdng_IqpQeX1L' // Usa tu anon key aquí
)

// 📦 CARGAR PRODUCTOS
async function cargarProductos() {
  const { data, error } = await supabase.from('productos').select('*')

  if (error) {
    console.error('Error cargando productos:', error.message)
    return
  }

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
  const precio = parseFloat(document.getElementById('precio').value) || 0
  const imagen = document.getElementById('imagen').value
  const categoria = document.getElementById('categoria').value

  const { error } = await supabase.from('productos').insert([
    { nombre, precio, imagen, categoria }
  ])

  if (error) {
    console.error('Error insertando producto:', error.message)
    return
  }

  cargarProductos()
  cargarCategorias()
}

// 🏷️ CARGAR CATEGORÍAS
async function cargarCategorias() {
  const { data, error } = await supabase.from('productos').select('categoria')

  if (error) {
    console.error('Error cargando categorías:', error.message)
    return
  }

  const categoriasUnicas = [...new Set(data.map(p => p.categoria))]

  const contenedor = document.getElementById('categorias')
  contenedor.innerHTML = ''

  categoriasUnicas.forEach(cat => {
    contenedor.innerHTML += `<button onclick="filtrar('${cat}')">${cat}</button>`
  })
}

// 🔍 FILTRAR
window.filtrar = async function(cat) {
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .eq('categoria', cat)

  if (error) {
    console.error('Error filtrando productos:', error.message)
    return
  }

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
