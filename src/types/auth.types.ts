export type RegisterData = {
    name: string
    companyId: number
    telephone: string
    roleId: number
    jobTitle: string
    email: string
    password: string
}

export type LoginData = Pick<RegisterData, 'email' | 'password'>