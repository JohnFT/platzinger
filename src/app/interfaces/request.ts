export type statusRequest = 'accepted' | 'pending' | 'rejected';

export interface Request {
    reciver_email: string;
    sender: string;
    status: statusRequest;
    timestamp: number;
}
