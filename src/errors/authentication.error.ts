export class AuthenticationError extends Error {

    constructor(private options: {message?: string, status?: number} = {}) {
        super(options.message);
    }

    get statusCode() {
        return this.options.status || 401;
    }

    get name() {
        return "authentication_error";
    }

    get json() {
        return {
            message: this.message,
            code: this.name,
        }
    }

}