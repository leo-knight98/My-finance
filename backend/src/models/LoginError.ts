class LoginError extends Error {
    statusCode: number
    constructor(message: string) {
        super(message)
        this.statusCode = 400
    }
}

export default LoginError