import { errors } from "../helpers/http";
export declare class UnexpectedResponseError extends Error {
    error: errors.ResponseStatusCodeError;
    constructor(error: errors.ResponseStatusCodeError);
}
