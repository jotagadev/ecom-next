export interface AuthSession {
    user: {
        name: string;
        email: string;
        image: string;
    };
    expires: string; 
}