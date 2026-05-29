import { supabase } from './supabase.js'

// Cargar productos en descuento
export async function cargarDescuentos() {
  const { data, error } = await supabase.from('productos').select('*').eq('descuento', true)
  if (error) { console.error(error); return [] }
  return data
}

// Marcar producto en descuento
export async function agregarDescuento(id) {
  const { error } = await supabase.from('productos').update({ descuento: true }).eq('id', id)
  if (error) console.error(error)
}

// Quitar descuento
export async function quitarDescuento(id) {
  const { error } = await supabase.from('productos').update({ descuento: false }).eq('id', id)
  if (error) console.error(error)
}
