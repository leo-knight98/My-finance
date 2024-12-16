class LoginError extends Error {
    statusCode
    constructor(message: string) {
        super(message)
        this.statusCode = 400
    }
}

export default LoginError