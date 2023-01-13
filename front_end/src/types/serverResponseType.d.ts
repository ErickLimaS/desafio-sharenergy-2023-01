interface serverResponseTypes {
    success: boolean,
    user?: {
        username: string,
        token: string
    },
    message?: string
}