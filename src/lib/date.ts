import { Timestamp } from '@bufbuild/protobuf'
import dayjs, { Dayjs } from 'dayjs'

export const toDayjs = (date: Timestamp | undefined): Dayjs => {
  return dayjs(date?.toDate())
}

export function getDateDiffText(pastDate: Dayjs): string {
  const nowDate = dayjs()
  if (nowDate.diff(pastDate, 'year'))
    return `${nowDate.diff(pastDate, 'year')}年前`
  if (nowDate.diff(pastDate, 'month'))
    return `${nowDate.diff(pastDate, 'month')}ヶ月前`
  if (nowDate.diff(pastDate, 'day'))
    return `${nowDate.diff(pastDate, 'day')}日前`
  return `${nowDate.diff(pastDate, 'hour')}時間前`
}

export const formatDate = (timeStamp: Timestamp | undefined): string => {
  const date = toDayjs(timeStamp)
  return date.format('YYYY/MM/DD')
}

export const formatDateTime = (timeStamp: Timestamp | undefined): string => {
  const date = toDayjs(timeStamp)
  return date.format('YYYY/MM/DD HH:mm')
}
