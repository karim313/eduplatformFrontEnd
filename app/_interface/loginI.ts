export interface LoginSuccess {
    success: true;
    _id: string;
    name: string;
    email: string;
    role: "student" | "instructor"; // specific types based on example
    token: string;
}

export interface LoginFail {
    success: false;
    message: string;
}

export type LoginResponse = LoginSuccess | LoginFail;
