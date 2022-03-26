export interface IPayload {
    id: string
}

export interface ITokenManager {
    sign (info: IPayload, expireIn?: string): Promise<string>
    verify (token: string): Promise<Error | IPayload>
}
