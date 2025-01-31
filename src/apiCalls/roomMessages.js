import {supabase} from '../supabase.js'
import {getStorage, saveStorage} from '../utils/localstorage.ts'

export async function getRoomMessages(roomId, force = false) {
  const roomMessageName = `room-messages-${roomId}`
  const roomMessages = getStorage(roomMessageName)

  // TODO: cache this for 1 hour

  if (roomMessages?.length && !force) {
    return roomMessages
  }

  return await supabase
    .from('room_messages')
    .select('*')
    .eq('roomId', roomId)
    .then((res) => {
      if (res?.data?.length > 0) {
        const sortedMessages = res.data.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)).reverse()
        saveStorage(roomMessageName, sortedMessages)
        return sortedMessages
      }
      return []
    })
}

export async function upsertRoomMessage(message) {
  return supabase.from('room_messages').upsert(message).select()
}
