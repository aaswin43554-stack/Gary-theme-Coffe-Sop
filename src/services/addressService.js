import { supabase } from '../supabaseClient'

export const saveAddress = async (address) => {
  try {
    const { data, error } = await supabase
      .from('customer_addresses')
      .insert([address])
      .select()
    
    if (error) {
      console.error('Supabase Error saving address:', error)
      throw new Error(error.message)
    }
    
    console.log('Address saved successfully:', data)
    return data
  } catch (err) {
    console.error('Error in saveAddress:', err)
    throw err
  }
}

export const getAddresses = async (userId) => {
  const { data, error } = await supabase
    .from('customer_addresses')
    .select('*')
    .eq('user_id', userId)
  
  if (error) console.error('Error fetching addresses:', error)
  return data || []
}

export const updateAddress = async (id, updates) => {
  const { data, error } = await supabase
    .from('customer_addresses')
    .update(updates)
    .eq('id', id)
  
  if (error) console.error('Error updating address:', error)
  return data
}

export const deleteAddress = async (id) => {
  const { data, error } = await supabase
    .from('customer_addresses')
    .delete()
    .eq('id', id)
  
  if (error) console.error('Error deleting address:', error)
  return data
}

export const getDefaultAddress = async (userId) => {
  const { data, error } = await supabase
    .from('customer_addresses')
    .select('*')
    .eq('user_id', userId)
    .eq('is_default', true)
    .single()
  
  if (error) console.error('Error fetching default address:', error)
  return data
}
