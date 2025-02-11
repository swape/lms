export function saveStorage(name: string, data: any) {
  const storeDate = new Date().getTime()
  const newData = {data, storeDate}

  return localStorage.setItem(name, JSON.stringify(newData))
}

/**
 *
 * @param name getStorage
 * @param validateTime Validate time in minutes
 * @returns
 */
export function getStorage(name: string, validateTime = 60) {
  const timeNow = new Date().getTime()
  const storedData = JSON.parse(localStorage.getItem(name) ?? '{}')

  if (!storedData || storedData.storeDate + validateTime * 60000 < timeNow) {
    return null
  }

  return storedData.data
}

export function resetAllStorage() {
  return localStorage.clear()
}
