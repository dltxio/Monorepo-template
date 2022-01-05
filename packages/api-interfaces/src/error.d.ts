declare namespace api {
    type GeneralApiErrorResponseReasonType = 'unauthorized' | 'forbidden';

    type BadRequestCode = 'EMAIL_IN_USE' | 'WEAK_PASSWORD';

    type ApiErrorBase = {
        statusCode: number;
        message: string;
    };

    type GeneralApiErrorResponse = {
        reason: GeneralApiErrorResponseReasonType;
    } & ApiErrorBase;

    type BadRequestGeneralResponse = {
        reason: 'bad_request';
        type: 'general';
        code: BadRequestCode;
    } & ApiErrorBase;

    type BadRequestValidationResponse = {
        reason: 'bad_request';
        type: 'validation';
        validationErrors: ValidationError[];
    } & ApiErrorBase;

    type NotFoundResponse = {
        reason: 'not_found';
        resource: string;
    } & ApiErrorBase;

    type ValidationError = {
        property: string;
        message: string;
    };

    type ErrorResponse =
        | GeneralApiErrorResponse
        | BadRequestGeneralResponse
        | BadRequestValidationResponse
        | NotFoundResponse;
}
