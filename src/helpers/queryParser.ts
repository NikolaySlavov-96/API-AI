import { IQueryParser } from "../types";

const DEFAULT_PAGE = '1';
const DEFAULT_LIMIT = '10';

export const _pageParser = (query?: IQueryParser) => {
    const page = parseInt(query?.page ?? DEFAULT_PAGE);
    const limit = parseInt(query?.limit ?? DEFAULT_LIMIT);
    const ordering = query?.ordering ?? 'DESC';

    const maxLimit = Math.min(limit, 40);
    const skipSource = (page - 1) * maxLimit;

    return {
        limit: maxLimit,
        offset: skipSource,
        ordering,
    };
};