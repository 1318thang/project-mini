export interface RegisterRequestType {
    name: string;
    email: string;
    password: string;
    role?: string; // có thể optional nếu backend cho phép
}