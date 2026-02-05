export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'student' | 'instructor' | 'admin';
    createdAt: string;
    updatedAt: string;
}

export interface UserResponse {
    success: boolean;
    data: User;
}
