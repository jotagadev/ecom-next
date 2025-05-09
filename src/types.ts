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

export interface UserProfile {
    
        id: string;
        email: string;
        name: string;
        image: string;
    
}