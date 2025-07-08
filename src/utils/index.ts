import dayjs from 'dayjs'

export function formatDate(date: Date | string | number) {
  return dayjs(date).format('YYYY-MM-DD')
}

export function formatTime(date: Date | string | number) {
  return dayjs(date).format('HH:mm:ss')
}

export function formatDateTime(date: Date | string | number) {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}
