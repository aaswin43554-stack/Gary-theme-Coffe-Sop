import { supabase } from '../supabaseClient'

export const createOrder = async (orderData) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([orderData])
    .select()
  
  if (error) console.error('Error creating order:', error)
  return data ? data[0] : null
}

export const addOrderItem = async (itemData) => {
  const { data, error } = await supabase
    .from('order_items')
    .insert([itemData])
  
  if (error) console.error('Error adding order item:', error)
  return data
}

export const getOrders = async (userId) => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        products (*)
      ),
      customer_addresses (*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  if (error) console.error('Error fetching orders:', error)
  return data || []
}

export const updateOrderStatus = async (orderId, status) => {
  const { data, error } = await supabase
    .from('orders')
    .update({ order_status: status })
    .eq('id', orderId)
  
  if (error) console.error('Error updating order status:', error)
  return data
}
