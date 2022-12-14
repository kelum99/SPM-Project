export interface EventItems {
  item: string;
  price: number;
}
export type PaymentType = 'Completed' | 'None' | 'Advance';
export type OrderType = 'Completed' | 'None' | 'In-progress';

export interface Payment {
  amount: number;
  date: Date;
}
