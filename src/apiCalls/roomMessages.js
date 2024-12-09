import {supabase} from '../supabase.js'

export async function getRoomMessages(roomId) {
  return await supabase
    .from('room_messages')
    .select('*')
    .eq('roomId', roomId)
    .then((res) => {
      if (res?.data?.length > 0) {
        return res.data.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      }
      return []
    })
}

export async function upsertRoomMessage(message) {
  return supabase.from('room_messages').upsert(message).select()
}
