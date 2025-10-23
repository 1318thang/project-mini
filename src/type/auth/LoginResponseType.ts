import type { UserType } from "../UserType";

export type LoginResponseType = {
    accessToken: string;
    refreshToken: string;
    role: string;
    id: number;
    user: UserType;
};