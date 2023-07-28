import dayjs, { Dayjs } from 'dayjs'

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

export const formatDate = (date: Dayjs): string => {
  return date.format('YYYY/MM/DD')
}

export const formatDateTime = (date: Dayjs): string => {
  return date.format('YYYY/MM/DD HH:mm')
}
