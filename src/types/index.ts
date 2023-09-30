export interface ColorItem {
  color: string,
  difficulty?: string,
  value: number,
  id: number
}

export interface Habit {
  id: number,
  name: string,
  description: string,
  period: number,
  colorsValue: number[],
  completedDays: number,
  value: number,
  checkedDays: ColorItem[]
}

export interface AuthData {
  email: string,
  password: string,
  name?: string
}

export interface Field {
  [key: string]: {
    placeholder: string,
    rules?: {
      required?: {
        value: boolean,
        message: string
      },
      minLength?: {
        value: number,
        message: string
      },
      pattern?: {
        value: string | RegExp,
        message: string
      }
    },
    error?: string,
    patternError?: string,
  }
}

export interface FormData {
  userName?: string,
  email: string,
  password: string,
  habitName?: string,
  habitDescription?: string,
  period?: number
}

export interface ErrorsText {
  [key: string] :string
}





