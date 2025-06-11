export class DuplicationError extends Error {

    constructor(private options: { message: string, status?: number }) {
        super(options.message);
    }

    get statusCode() {
        return this.options.status || 400;
    }

    get name() {
        return "duplication_error";
    }

    get json() {
        return {
            message: this.message,
            code: this.name,
        }
    }

}