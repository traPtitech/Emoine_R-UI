<script lang="ts">
import dayjs from 'dayjs'

export function dayFormat(date: Date): string {
  const date1 = dayjs(date)
  if (dayjs().diff(date1, 'year')) return `${dayjs().diff(date1, 'year')}年前`
  if (dayjs().diff(date1, 'month'))
    return `${dayjs().diff(date1, 'month')}ヶ月前`
  if (dayjs().diff(date1, 'day')) return `${dayjs().diff(date1, 'day')}日前`
  return `${dayjs().diff(date1, 'hour')}時間前`
}
</script>
