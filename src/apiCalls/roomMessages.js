import {supabase} from '../supabase.js'
import {getStorage, saveStorage} from '../utils/localStorage.ts'

export async function getRoomMessages(roomId, force = false) {
  const roomMessageName = `room-messages-${roomId}`
  const roomMessages = getStorage(roomMessageName, 60)

  if (roomMessages?.length && !force) {
    return roomMessages
  }

  return await supabase
    .from('room_messages')
    .select('*')
    .eq('roomId', roomId)
    .then((res) => {
      // @ts-ignore
      if (res.data?.length > 0) {
        // @ts-ignore
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

export async function getRoomMessagesFromRoomArray(list, force = false) {
  const roomMessageName = `room-messages-from-array-${list.join('-')}`
  const roomMessages = getStorage(roomMessageName, 2)

  if (roomMessages?.length && !force) {
    return roomMessages
  }

  return await supabase
    .from('room_messages')
    .select('*')
    .in('roomId', list)
    .then((res) => {
      // @ts-ignore
      if (res.data?.length > 0) {
        saveStorage(roomMessageName, res.data)
        return res.data
      }
      return []
    })
}
