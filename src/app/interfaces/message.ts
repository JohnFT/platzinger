
export type typeMessage = 'text' | 'zumbido';
export interface Message {
    uid: string;
    timestamp: string;
    text: string;
    sender: string;
    reciver: string;
    seen: boolean;
    type: typeMessage;
}
