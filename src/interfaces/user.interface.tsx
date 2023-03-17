export namespace Users {
    export interface IUser {
        token: string,
        email?: string,
    }
    
    export interface IGoogleUser {
        email: string,
        access_token: string,
    }
}