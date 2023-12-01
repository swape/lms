export function set(name: string, data: any) {
  return localStorage.setItem(name, JSON.stringify(data))
}

export function get(name: string) {
  return JSON.parse(localStorage.getItem(name) ?? '{}')
}
