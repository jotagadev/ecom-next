export interface AuthSession {
    user: {
        name: string;
        email: string;
        image: string;
        admin: boolean;
        id: string;
    };
    expires: string; 
}