// modules
import * as R from 'ramda'
import moment from 'jalali-moment'

const persianNums = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

const weekDayMap = {
  Sat: 'شنبه',
  Sun: 'یکشنبه',
  Mon: 'دوشنبه',
  Tue: 'سه شنبه',
  Wed: 'چهارشنبه',
  Thu: 'پنج شنبه',
  Fri: 'جمعه'
}

const months = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند'
]

export const toPersianNumber = num =>
  R.reduce(
    R.concat,
    '',
    R.map(i => persianNums[i], String(num))
  )

export const toPersian = (string = '') =>
  typeof string === 'string'
    ? string.replace(/[0-9]/g, num => parseInt(num, 10).toLocaleString('fa-IR'))
    : string.toLocaleString('fa-IR')

export const convertToPersianDate = date => {
  const dateArray = R.map(
    Number,
    R.split('/')(
      moment(date)
        .locale('fa')
        .format('YYYY/MM/DD')
    )
  )
  const weekDay = R.split(' ', date.toDateString())[0]

  return `${weekDayMap[weekDay]} ${toPersianNumber(dateArray[2])} ${
    months[dateArray[1] - 1]
  }`
}

export const convertToPersianTime = date => {
  const hour = new Date(date).getHours()
  const minutes = new Date(date).getMinutes()

  return `${toPersianNumber(hour)}:${toPersianNumber(minutes)}`
}

export const formatTimeRange = (start, end) => {
  const date = convertToPersianDate(start)
  const startTime = convertToPersianTime(start)
  const endTime = convertToPersianTime(end)

  return `${date} | ${endTime} - ${startTime}`
}

export const formatDate = date => moment(date).format('YYYY-MM-DDTHH:mm:ss')

export const formattedPersianDate = date =>
  toPersian(
    moment(date)
      .locale('fa')
      .format('YYYY/MM/DD')
  )

export const combineDateAndTime = (date, time) => {
  const timeString = time.getHours() + ':' + time.getMinutes() + ':00'

  const year = date.getFullYear()
  const month = date.getMonth() + 1 // Jan is 0, dec is 11
  const day = date.getDate()
  const dateString = '' + year + '-' + month + '-' + day
  const combined = new Date(dateString + ' ' + timeString)

  return combined
}

export const formattedCommentDate = date => {
  const dateArray = R.map(
    Number,
    R.split('/')(
      moment(date)
        .locale('fa')
        .format('YYYY/MM/DD')
    )
  )
  const weekDay = R.split(' ', date.toDateString())[0]
  const hour = new Date(date).getHours()
  const minutes = new Date(date).getMinutes()

  return `${weekDayMap[weekDay]} ${toPersianNumber(dateArray[2])} ${
    months[dateArray[1] - 1]
  } - ${toPersianNumber(hour)}:${toPersianNumber(minutes)}`
}
