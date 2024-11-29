class LoginError extends Error {
    statusCode: 400
    message: string
    constructor(message) {
        super(message)
    }
}

export default LoginError