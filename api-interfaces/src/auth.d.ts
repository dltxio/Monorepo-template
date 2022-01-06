declare namespace api {
    type LoginRequestBody = {
        email: string;
        password: string;
    };

    type DecodedAuthToken = {
        userId: string;
        email: string;
        exp: number;
    };

    type SignupRequestBody = {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        address1?: string;
        address2?: string;
        state?: string;
        postCode?: string;
    };

    type EmailVerificationBody = {
        email: string;
        token: string;
    };

    type SetAliasRequestBody = {
        alias: string;
    };
}
