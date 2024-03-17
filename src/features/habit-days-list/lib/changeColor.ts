import type { ColorItem } from 'types'

export const changeColor = (item: ColorItem, list: ColorItem[], color: string) => {
  const el = list.find(el => el.id === item.id)
  if (el?.color || el?.color === '') {
    if (el.color === color) {
      el.color = ''
    } else {
      el.color = color
    }
  }
}
