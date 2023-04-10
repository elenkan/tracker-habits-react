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




