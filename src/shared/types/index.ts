export interface ColorItem {
  color: string
  difficulty?: string
  value: number
  checked?: boolean
  id: number
}

export interface Habit {
  id: number | string
  name: string
  description: string
  period: number
  colorsValue: number[]
  completedDays: number
  completionPercent: number
  checkedDays: ColorItem[]
}

export interface AuthData {
  email: string
  password: string
  name?: string
}

export type Field = Record<
  string,
  {
    placeholder: string
    rules?: {
      required?: {
        value: boolean
        message: string
      }
      minLength?: {
        value: number
        message: string
      }
      pattern?: {
        value: string | RegExp
        message: string
      }
    }
    error?: string
    patternError?: string
  }
>

export interface FormData {
  userName?: string
  email: string
  password: string
  habitName?: string
  habitDescription?: string
  period?: number
}

export type ErrorsText = Record<string, string>
