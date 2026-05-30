import { supabase } from './supabase.js'

// Cargar categorías únicas
export async function cargarCategorias() {
  const { data, error } = await supabase.from('Productos').select('categoria')
  if (error) { console.error(error); return [] }
 return [...new Set(data.map(p => p.categoria))]
}

// Agregar categoría
export async function agregarCategoria(cat) {
  const { error } = await supabase.from('categorias').insert([{ nombre: cat }])
  if (error) console.error(error)
}

// Eliminar categoría
export async function eliminarCategoria(id) {
  const { error } = await supabase.from('categorias').delete().eq('id', id)
  if (error) console.error(error)
}
