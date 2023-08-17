export const getEventId = (v: string | string[]) => {
  if (Array.isArray(v)) {
    v = v[0]
  }
  return v
}
