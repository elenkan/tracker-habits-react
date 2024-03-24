import { cloneDeep } from 'lodash'
import type { ColorItem } from 'shared/types'

export const getUpdatedColorsList = (difficultyList: ColorItem[], list: ColorItem[]) => {
  const colorsList = cloneDeep(difficultyList)
  list.forEach(item => {
    const colorItem = colorsList.find(el => el.color === item.color)
    if (colorItem) {
      colorItem.value += 1
    }
  })
  return colorsList
}
