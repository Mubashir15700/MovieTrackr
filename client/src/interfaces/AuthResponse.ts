export interface AuthResponse {
    status: string;
    data: {
        user: {
            _id: string;
            email: string;
            name: string;
        };
        token: string;
    };
}
