export interface BaseResponseType {
    code: number;
    msg: string;
}

export interface SuccessResponseType extends BaseResponseType {
    data: any
}