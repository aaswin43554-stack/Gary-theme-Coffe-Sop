import { supabase } from '../supabaseClient'

export const fetchProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
  
  if (error) console.error('Error fetching products:', error)
  return data || []
}

export const fetchProductById = async (id) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) console.error('Error fetching product:', error)
  return data
}

export const updateProductStock = async (id, newQuantity) => {
  const { data, error } = await supabase
    .from('products')
    .update({ stock_quantity: newQuantity })
    .eq('id', id)
  
  if (error) console.error('Error updating stock:', error)
  return data
}

export const createProduct = async (product) => {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
  
  if (error) console.error('Error creating product:', error)
  return data
}

export const deleteProduct = async (id) => {
  const { data, error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)
  
  if (error) console.error('Error deleting product:', error)
  return data
}
