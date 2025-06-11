export class ValidationError<InputType = any> extends Error {

    constructor(private options: {message: string, input?: any, status?: number}) {
        super(options.message);
    }

    get statusCode() {
        return this.options.status || 400;
    }

    get name() {
        return "validation_error";
    }

    get json() {
        return {
            message: this.message,
            code: this.name,
            input: this.options.input
        }
    }

}