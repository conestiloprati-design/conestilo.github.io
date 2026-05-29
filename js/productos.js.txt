import { supabase } from './supabase.js'

// Cargar productos
export async function cargarProductos() {
  const { data, error } = await supabase.from('productos').select('*')
  if (error) { console.error(error); return [] }
  return data
}

// Agregar producto
export async function agregarProducto(prod) {
  const { error } = await supabase.from('productos').insert([prod])
  if (error) console.error(error)
}

// Eliminar producto
export async function eliminarProducto(id) {
  const { error } = await supabase.from('productos').delete().eq('id', id)
  if (error) console.error(error)
}

// Marcar como agotado/disponible
export async function actualizarEstado(id, disponible) {
  const { error } = await supabase.from('productos').update({ precio: disponible ? 100 : 0 }).eq('id', id)
  if (error) console.error(error)
}
