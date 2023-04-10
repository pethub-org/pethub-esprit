class ErrorResponse extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }

    static notFound(message = 'Not Found') {
        return new ErrorResponse(404, message);
    }
    static badRequest(message = 'Bad Request') {
        return new ErrorResponse(400, message);
    }
    static unauthorized(message = 'Unauthorized') {
        return new ErrorResponse(401, message);
    }
    static forbidden(message = 'Forbidden') {
        return new ErrorResponse(403, message);
    }
    static internalError() {
        return new ErrorResponse(500, 'Internal Server Error');
    }
}

module.exports = ErrorResponse;