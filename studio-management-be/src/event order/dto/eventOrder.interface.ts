export interface EventItems {
  item: string;
  price: number;
  count: number;
}
export type PaymentType = 'Completed' | 'None' | 'Advance';
export type OrderType = 'Completed' | 'None' | 'In-progress';
