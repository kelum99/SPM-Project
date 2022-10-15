export interface Payment {
    amount: number;
    date: Date;
}

export type PaymentType = 'Completed' | 'None' | 'Advance';

