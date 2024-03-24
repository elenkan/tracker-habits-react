import type { ColorItem } from 'shared/types'

export const createDaysList = (period: number): ColorItem[] => {
  const list = new Array(period).fill({ color: '' })
  const daysArray = list.map(item => Object.assign({}, item))
  daysArray.forEach(item => {
    item.id = Math.random() * list.length
    item.value = 0
  })
  return daysArray
}
