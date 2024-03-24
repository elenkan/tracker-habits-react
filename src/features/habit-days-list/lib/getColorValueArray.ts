import type { ColorItem } from 'shared/types'

export const getColorValueArray = (array: ColorItem[]) => {
  const checkedColorAmount = array.reduce((acc, curr) => acc + curr.value, 0)

  return array.map(item => {
    Object.assign({}, item)
    if (item.value && item.value !== 0) {
      item.value = Math.round((item.value / checkedColorAmount) * 100)
    }
    return item.value
  })
}
