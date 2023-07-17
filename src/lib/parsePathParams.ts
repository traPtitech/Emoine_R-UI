export const getMeetingId = (v: string | string[]) => {
  if (Array.isArray(v)) {
    v = v[0]
  }
  return v
}
