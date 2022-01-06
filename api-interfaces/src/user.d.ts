declare namespace api {
    type User = {
        userId: string;
        email: string;
        firstName: string;
        lastName: string;
        phoneNumber: string | null;
        phoneNumberVerified: boolean;
        admin: boolean;
        emailVerified: boolean;
        idVerified: boolean;
        spendableBalance: number;
        customerUniqueReference: string | undefined;
    };
}
