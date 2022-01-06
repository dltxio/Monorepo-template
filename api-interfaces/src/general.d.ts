declare namespace api {
    type SuccessResponse = {success: boolean};

    type PaginationQuery = {
        page?: number;
        pageSize?: number;
    };

    type SearchResults<T> = {
        totalCount: number;
        items: T[];
    };
}
