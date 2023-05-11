export type Habit = {
  id: number | null,
  name: string,
  description: string,
  period: number
}

export type ProgressItem = {
  id: number,
  colorsValue: number[],
  completedDays: number,
  name: string,
  period: number,
  value: number
}

export type ColorItem = {
  color: string,
  mood: string,
  value: number,
  id: number
}

export type AuthData = {
  email: string,
  password: string,
  name?: string
}

export type Field = {
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

export type FormData = {
  userName?: string,
  email?: string,
  password?: string,
  habitName?: string,
  habitDescription?: string
  weekPeriod?:  number
}





