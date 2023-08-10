import dayjs from 'dayjs'

export const randomString = (minLen: number, maxLen: number) => {
  const length = randomNum(minLen, maxLen)
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}

export const randomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min)
}

export const randomDate = () => {
  const start = dayjs().subtract(1, 'month')
  const end = dayjs().add(1, 'week')
  const diff = end.diff(start, 'day')
  const randomDiff = randomNum(0, diff)
  return start.add(randomDiff, 'day').toDate()
}
