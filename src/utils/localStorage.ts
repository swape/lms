export function saveStorage(name: string, data: any) {
  return localStorage.setItem(name, JSON.stringify(data))
}

export function getStorage(name: string) {
  return JSON.parse(localStorage.getItem(name) ?? '{}')
}

export function resetAllStorage() {
  return localStorage.clear()
}
