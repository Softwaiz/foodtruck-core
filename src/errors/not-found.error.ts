export class NotFoundError extends Error {

    constructor(private options: { message: string, status?: number }) {
        super(options.message);
    }

    get statusCode() {
        return this.options.status || 404;
    }

    get name() {
        return "not_found_error";
    }

    get json() {
        return {
            message: this.message,
            code: this.name,
        }
    }

}